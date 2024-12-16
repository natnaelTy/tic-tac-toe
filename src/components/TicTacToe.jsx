import { useEffect, useState } from "react";
import './style.css';


{/* squares */}
function Square({value, OnClick}){
    return(
        <button onClick={OnClick} className="squares">
            {value}
        </button>
    )
}

function TicTacToe(){

    const [squares, setSquares] = useState(Array(9).fill(''));
    const [isXTurn, setIsXTurn] = useState(true);
    const [status, setStatus] = useState('');

    {/* show what it's clicked */}
    function handleClick(getIndex){
        let copySquare = [...squares];
        if(getWinner(copySquare) || copySquare[getIndex]) return;
        copySquare[getIndex] = isXTurn ? "X" : "O";
        setSquares(copySquare);
        setIsXTurn(!isXTurn);
    }

    {/* winning patterns (game rules) */}
    function getWinner(squares){
        const winningPatterns = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];

        for(let i = 0; i < winningPatterns.length; i++){
            const [x,y,z] = winningPatterns[i];
            if(squares[x] && squares[x] === squares[y] && squares[x] === squares[z]){
                return squares[x];
            }
        }
        return null;
    }

    {/* side code (diplay status) */}
    useEffect(() => {
       if(!getWinner(squares) && squares.every((item) => item !== "")){
        setStatus("It's a draw! (please restart the game.)");
       }
       else if(getWinner(squares)){
        setStatus(`Winner is: ${getWinner(squares)} (please restart the game.)`);
       }
       else{
        setStatus(`Next player is: ${isXTurn ? "X" : "O"}`);
       }
    },[squares, isXTurn]);

    {/* restart function */}
    function handleRestart(){
        setIsXTurn(true);
        setSquares(Array(9).fill(""));
    }

    return(
        <div className="container">
            <h2 className="title">Tic-Tac-Toe</h2>
            <div className="row">
               <Square value={squares[0]} OnClick={() => handleClick(0)}/>
               <Square value={squares[1]} OnClick={() => handleClick(1)}/>
               <Square value={squares[2]} OnClick={() => handleClick(2)}/>
            </div>
            <div className="row">
               <Square value={squares[3]} OnClick={() => handleClick(3)}/>
               <Square value={squares[4]} OnClick={() => handleClick(4)}/>
               <Square value={squares[5]} OnClick={() => handleClick(5)}/>
            </div>
            <div className="row">
               <Square value={squares[6]} OnClick={() => handleClick(6)}/>
               <Square value={squares[7]} OnClick={() => handleClick(7)}/>
               <Square value={squares[8]} OnClick={() => handleClick(8)}/>
            </div>
            <h1>{status}</h1>
            <button onClick={handleRestart} className="btnRestart">Restart</button>
        </div>
    )
}

export default TicTacToe;