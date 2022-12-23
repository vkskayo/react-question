import { useState, useEffect } from "react";
import "./App.css";
import { FaChessQueen } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function App() {
  const [grid, setGrid] = useState(Array(64).fill(0));
  const [queenCurrentPos, setQueenCurrentPos] = useState(
    Math.floor(Math.random() * 64)
  );
  const [moveVision, setMoveVision] = useState(false);
  const [possibleMoves, setPossibleMoves] = useState([]);

  useEffect(() => {
    setGrid(
      grid.map((e, index) => {
        if (queenCurrentPos == index) {
          return 1;
        }
        return 0;
      })
    );
    setPossibleMoves(possibleQueenMoves(queenCurrentPos));
  }, []);

  const changeQueenPos = (event, idx) => {
    event.preventDefault();

    if (grid[idx] == 0 && possibleQueenMoves(queenCurrentPos).includes(idx)) {
      setGrid(
        grid.map((e, index) => {
          if (idx == index) {
            return 1;
          }
          return 0;
        })
      );
      setQueenCurrentPos(idx);
      setPossibleMoves(possibleQueenMoves(idx));
    }
  };

  const possibleQueenMoves = (queenCurrentPos) => {
    let arr = [];
    let current = queenCurrentPos + 1;

    while (current % 8 !== 0) {
      arr.push(current);
      current++;
    }
    current = queenCurrentPos - 1;
    while ((current + 1) % 8 !== 0) {
      arr.push(current);
      current--;
    }
    current = queenCurrentPos - 8;
    while (current >= 0) {
      arr.push(current);
      current -= 8;
    }
    current = queenCurrentPos + 8;
    while (current <= 63) {
      arr.push(current);
      current += 8;
    }
    current = queenCurrentPos - 7; // right upper diagonal
    while (current >= 0 && current % 8 !== 0) {
      arr.push(current);
      current -= 7;
    }
    current = queenCurrentPos - 9; // left upper diagonal
    while (current >= 0 && (current + 1) % 8 !== 0) {
      arr.push(current);
      current -= 9;
    }
    current = queenCurrentPos + 7; // left lower diagonal
    while ((current + 1) % 8 !== 0 && current <= 63) {
      arr.push(current);
      current += 7;
    }
    current = queenCurrentPos + 9; // right lower diagonal
    while (current <= 63 && current % 8 !== 0) {
      arr.push(current);
      current += 9;
    }

    return arr;
  };
  console.log(possibleMoves);

  return (
    <div className="App">
      <div className="d-flex flex-wrap grid mx-auto">
        {grid.map((e, idx) => {
          return (
            <div
              onClick={(event) => changeQueenPos(event, idx)}
              key={idx}
              className="square d-flex"
            >
              {possibleMoves.includes(idx) && moveVision ? (
                <div className="mx-auto my-auto bullet"></div>
              ) : null}
              {e == 1 ? (
                <FaChessQueen
                  className=" mx-auto my-auto"
                  color="white"
                  size={40}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      {moveVision ? (
        <AiFillEyeInvisible
          onClick={() => setMoveVision(false)}
          color="purple"
          className="my-4 mx-auto w-100"
          size={50}
        />
      ) : (
        <AiFillEye
          onClick={() => setMoveVision(true)}
          color="purple"
          className="my-4 mx-auto w-100"
          my-4
          size={50}
        />
      )}
    </div>
  );
}

export default App;
