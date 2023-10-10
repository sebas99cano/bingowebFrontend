import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const useApp = () => {
  const [originalCard, setOriginalCard] = useState([]);
  const [userCard, setUserCard] = useState([]);
  const [balls, setBalls] = useState([]);
  const [lastBall, setLastBall] = useState(null);
  const [isWinner, setIsWinner] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [endGame, setEndGame] = useState(false);

  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      setGamePaused(true);
      socketRef.current = io("ws://localhost:3002");
      socketRef.current.on("initialValues", (initialValues) => {
        setOriginalCard(initialValues.card);
        setBalls(initialValues.balls);
        if (initialValues.balls.length > 0) {
          const initialBallNumbers = initialValues.balls.map(
            (ball) => ball.number
          );
          const updatedCard = initialValues.card.map((row) =>
            row.map((cell) => (initialBallNumbers.includes(cell) ? "X" : cell))
          );
          setUserCard(updatedCard);
        } else {
          setUserCard(initialValues.card);
        }
      });
      socketRef.current.on("waitingForPlayers", () => {
        setGamePaused(true);
      });
    }
  }, []);

  useEffect(() => {
    const handleNewBall = (data) => {
      setBalls((prevBalls) => [...prevBalls, data]);
      setLastBall(data);
      setGamePaused(false);
      if (userCard.some((row) => row.includes(data.number))) {
        const updatedCard = userCard.map((row) =>
          row.map((cell) => (cell === data.number ? "X" : cell))
        );
        setUserCard(updatedCard);
        console.log("updatedCard", updatedCard);

        if (checkWinner(updatedCard)) {
          socketRef.current.emit("playerWins", socketRef.current.id);
          setIsWinner(true);
        }
      }
    };

    const handlePuse = () => {
      setGamePaused(true);
    };

    const handleGameOver = () => {
      setEndGame(true);
    };

    socketRef.current.on("newBall", handleNewBall);
    socketRef.current.on("waitingForPlayers", handlePuse);
    socketRef.current.on("gameOver", handleGameOver);
    return () => {
      socketRef.current.off("newBall", handleNewBall);
      socketRef.current.off("waitingForPlayers", handlePuse);
      socketRef.current.off("gameOver", handleGameOver);
    };
  }, [userCard, gamePaused, isWinner]);

  const checkWinner = (card) => {
    for (let i = 0; i < 5; i++) {
      if (card[i].every((cell) => cell === "X")) {
        return true;
      }
    }
    for (let i = 0; i < 5; i++) {
      if (card.every((row) => row[i] === "X")) {
        return true;
      }
    }
    return false;
  };

  return {
    gamePaused,
    userCard,
    balls,
    originalCard,
    lastBall,
    isWinner,
    endGame,
  };
};

export default useApp;
