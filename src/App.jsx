import Logs from "./components/Logs";
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import {useState} from 'react'
import {WINNING_COMBINATIONS} from './winning-combinations';
import GameOver from "./components/GameOver";

function derivedCurrentPlayer(gameTurn){
  let currentplayer = "X";
  
  if(gameTurn.length > 0 && gameTurn[0].player === "X"){
    currentplayer = "O"
  }
  return currentplayer;
}

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

function App() {
  const [gameTurn, setGameTurn] = useState([])
  const [player, setPlayer] = useState({
    X: 'Player 1',
    O: 'Player 2',
  })

  const activePlayer = derivedCurrentPlayer(gameTurn);
  

  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for(const turn of gameTurn){
    const {square, player} = turn;
    const {row,col} = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS){
    const Symbol1 = gameBoard[combination[0].row][combination[0].column]
    const Symbol2 = gameBoard[combination[1].row][combination[1].column]
    const Symbol3 = gameBoard[combination[2].row][combination[2].column]

    if(Symbol1 && Symbol1 === Symbol2 && Symbol2 === Symbol3){
      winner = player[Symbol1];
    }
  }
  let hasDraw = gameTurn.length === 9 && !winner;

  function handleCurrPlayer(rowIndex, colIndex){
   
    setGameTurn((preTurns) => {
      
      const curPlayer = derivedCurrentPlayer(preTurns);

      const updatedTurns = [{square: {row:rowIndex,col:colIndex},player: curPlayer},...preTurns]
      return updatedTurns;
    })
  }

  function handleRestart(){
    setGameTurn([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayer(prevPlayer => {
      return{
        ...prevPlayer,
        [symbol]: newName
      }
    })
  }
  return (
    
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
        <Player name1={"Player-1"} symbol={"X"} isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange}/>
        <Player name1={"Player-2"} symbol={"O"} isActive={activePlayer === "O" } onChangeName={handlePlayerNameChange}/>        
        </ol>
        {(winner||hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard handleCurrPlayer={handleCurrPlayer} board={gameBoard}/>
      </div>
      <Logs turns={gameTurn}/>
    </main>
  )
}

export default App
