import React from "react";
import useApp from "./useApp";
import BingoTable from "../components/BingoTable";
import Confetti from "react-confetti";

function App() {
  const {
    gamePaused,
    userCard,
    balls,
    originalCard,
    lastBall,
    isWinner,
    endGame,
  } = useApp();

  return (
    <div className="App">
      <div className="container">
        {endGame && <Confetti />}
        <div className="row">
          <div className="col-md-12">
            <h1 className="m-5">Bienvenido al BINGO de Juan Sebastian</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            {gamePaused && (
              <div
                className="card text-white bg-dark mb-5"
                style={{ margin: "30px" }}
              >
                <h2>Esperando a que se unan más usuarios...</h2>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
            )}
            {endGame ? (
              isWinner ? (
                <h1>Felicidades por haber ganado</h1>
              ) : (
                <h2>Otro jugador ya ganó, sigue intentando</h2>
              )
            ) : null}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <BingoTable
              title={"Carta de juego"}
              userCard={userCard}
              balls={balls}
            />
          </div>
          <div className="col-md-6">
            <BingoTable
              title={"Carta original"}
              userCard={originalCard}
              balls={[]}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h2 className="mt-5">Balota nueva</h2>
            <button
              type="button"
              className="btn btn-success"
              style={{ fontSize: "70px", borderRadius: "50%" }}
            >
              {lastBall ? `${lastBall.letter} ${lastBall.number}` : `0`}
            </button>
          </div>
          <div className="col-md-6">
            <div className="card bg-light mt-5">
              <div className="card-header" style={{ fontSize: "28px" }}>
                Balotas antiguas
              </div>
              <div className="card-body d-flex flex-wrap">
                {balls.map((ball, index) => (
                  <span
                    key={index}
                    className="badge bg-success"
                    style={{ color: "#fff", margin: "10px", fontSize: "20px" }}
                  >
                    {ball.letter} {ball.number}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
