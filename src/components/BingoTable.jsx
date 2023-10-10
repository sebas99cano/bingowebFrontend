import React from "react";

const BingoTable = ({ title, userCard, balls }) => {
  return (
    <div>
      <h2>{title}</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">B</th>
            <th scope="col">I</th>
            <th scope="col">N</th>
            <th scope="col">G</th>
            <th scope="col">O</th>
          </tr>
        </thead>
        <tbody>
          {userCard.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={cell === "X" ? "marked" : ""}>
                  {cell === "X" ? (
                    <span className="marked-number">{cell}</span>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BingoTable;
