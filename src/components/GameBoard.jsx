

export default function GameBoard({handleCurrPlayer,board}){






// const [gameBoard, setGameBoard] = useState(initialGameBoard);
// 
// function handleClick(rowIndex, colIndex){
//     setGameBoard((prevGameBoard)=>{
//         const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
//         updatedGameBoard[rowIndex][colIndex] = currentPlayerSymbol;
//         return updatedGameBoard
//     });
//     currentPlayerF();
// }

return(
    <ol id="game-board">
        {board.map((row,rowIndex)=> 
            <li key={rowIndex}>
                <ol>
                    {row.map((col,colIndex) =>
                        <li key={colIndex}>
                            <button onClick={() => handleCurrPlayer(rowIndex, colIndex)} disabled={board[rowIndex][colIndex] !== null}>{col}</button>
                        </li>
                    )}
                </ol>
            </li> 
        )}
    </ol>

    )
}