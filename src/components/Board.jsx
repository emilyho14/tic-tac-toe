import React, { useState } from 'react';
import Winner from './Winner';
import Dimensions from './Dimensions';

function CalculateWinner(tiles, n = 3) {
    let allSame = true;
    let curr_player;

    // ITERATION FOR --  if any matches VIA ROWS
    for (let i = 0; i < n; i++) {
        allSame = true
        curr_player = tiles[`${i}-0`];

        if (!curr_player) continue; // keep searching until found file that IS filled out

        for (let j = 0; j < n; j++) {
            // CASE: if there's not a 'match' with current pattern/direction looking at
            if (tiles[`${i}-${j}`] != curr_player) {
                allSame = false;
                break;
            }
        }
        if (allSame) return curr_player;
    }

    // ITERATION FOR -- if any matches VIA COLS
    for (let j = 0; j < n; j++) {
        allSame = true;
        curr_player = tiles[`0-${j}`]

        if (!curr_player) continue;

        for (let i = 0; i < n; i++) {
                // CASE: if there's not a 'match' with current pattern/direction looking at
            if (tiles[`${i}-${j}`] != curr_player) {
                allSame = false;
                break;
            }
        }
        if (allSame) return curr_player;
    }

    // ITERATION FOR -- Main Diagonal (top left to bottom right)
    const first_main_diag = tiles[`0-0`]
    if (first_main_diag) {
        allSame = true;
        for (let k = 0; k < n; k++) {
            if (tiles[`${k}-${k}`] != first_main_diag) {
                allSame = false;
                break;  
            }
        }
        if (allSame) return first_main_diag;
    }

    // ITERATION FOR -- Opposite Diagonal (bottom left to top right)
    const first_opposite_diag = tiles[`0-${n-1}`]
        if (first_opposite_diag) {
            allSame = true;
            for (let k = 1; k < n; k++) {
                if (tiles[`${k}-${n - 1 - k}`] != first_opposite_diag) {
                    allSame = false;
                    break;  
                }
            }
        if (allSame) return first_opposite_diag;
    }
    
    // ELSE: no winner found yet
    return null;
}

function Board() {
  const rows = [];
  const [numDim, setNumDim] = useState(0);
  const [tiles, setTiles] = useState({});
  const [xNext, setXNext] = useState(true);
  const winner = CalculateWinner(tiles, numDim);

  const clickTile = (i, j) => {
    const key = `${i}-${j}`;

    // can only fill tile out once AND if no winner has been found yet
    if (tiles[key] || winner) { return; }
    // if 

    const nextVal = xNext ? "X" : "O"

    setTiles(prev => ({
        ...prev,
        [key]: nextVal
    }));

    setXNext(prev => !prev);
  }


  for (let i = 0; i < numDim; i++) {
    const cells = [];
    for (let j = 0; j < numDim; j++) {
        const key = `${i}-${j}`
        const val = tiles[key] || "";
        
        cells.push(
            <div className="square" key={`${i}-${j}`} onClick={() => clickTile(i, j)}>
                <p className="tile-content">{val}</p>
            </div>
        );
    }
    rows.push(
      <div className="row" key={i}>
        {cells}
      </div>
    );
  }

  return (
    <div className="game-div">
        <h1 className="game-title">Play (Dynamic) Tic-Tac-Toe!</h1>
        <Dimensions onDimNumChange={setNumDim} />
        {/* <button onClick={ResetBoard(tiles)}> Reset Game </button> */}
        <div className="turn-tracker"> Now Playing: {xNext ? "X" : "O" }</div>
        {rows}
        <Winner winner={winner} />
    </div>
  );
}

export default Board;
