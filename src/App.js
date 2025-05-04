import React, { useState } from 'react';
import './App.css';

function App() {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);

  const updateIsGameStarted = (newValue) => {
    setIsGameStarted(newValue);
  }; 

  return (
    <div className="App">
      {!isGameStarted ? (
        <div className="start-screen">
          <h1>Welcome to Card Game!</h1>
          <br></br>
          <br></br>
          <div className="name-inputs">
            <input
              type="text"
              placeholder="Player 1 Name"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
            />
            <input
              type="text"
              placeholder="Player 2 Name"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
            />
          </div>
          <button
            className="start-button"
            onClick={() => setIsGameStarted(true)}
            disabled={!player1Name || !player2Name}
          >
            Start Game
          </button>
        </div>
      ) : (
        <GameScreen player1Name={player1Name} player2Name={player2Name} isGameStarted={isGameStarted} updateIsGameStarted={updateIsGameStarted} />
      )}
    </div>
  );
}

function GameScreen({ player1Name, player2Name,isGameStarted, updateIsGameStarted}) {
  const numOfCards=6;
  const allNumbers = Array.from({ length: 2 * numOfCards }, (_, index) => index + 1);
  for (let i = allNumbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allNumbers[i], allNumbers[j]] = [allNumbers[j], allNumbers[i]];
  }
  const firstList = allNumbers.slice(0, numOfCards);
  const secondList = allNumbers.slice(numOfCards);
  const [player1Deck, setPlayer1Deck] = useState(firstList);
  const [player2Deck, setPlayer2Deck] = useState(secondList);
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
  const [roundWinner, setRoundWinner] = useState('');
  const [gameWinner, setGameWinner] = useState('');
  const [player1Card, setplayer1Card] = useState('');
  const [player2Card, setplayer2Card] = useState('');
  const [index1, setindex1] =  useState(0);


  const drawCard1 = () => {
    let x=Math.floor(Math.random() * player1Deck.length);
    let valuex=player1Deck[x];
    setindex1(x);
    setplayer1Card(valuex);
    setIsPlayer1Turn(!isPlayer1Turn);
  };

  const drawCard2 = () => {
    let y=Math.floor(Math.random() * player2Deck.length);
    let valuey=player2Deck[y];
    setplayer2Card(valuey);
    win(valuey,y);
  };

  const win = (valuey,indexy) => {
    if (player1Card > valuey) {
      setRoundWinner(player1Name);
      let newDeck2 = [...player2Deck];
      newDeck2.splice(indexy, 1); 
      setPlayer2Deck(newDeck2);
      setPlayer1Deck(player1Deck => [...player1Deck, valuey]);
    } else if (valuey > player1Card) {
      setRoundWinner(player2Name);
      let newDeck1 = [...player1Deck];
      newDeck1.splice(index1, 1); 
      setPlayer1Deck(newDeck1);
      setPlayer2Deck(player2Deck => [...player2Deck, player1Card]);
    } else {
      setRoundWinner('Tie');
    }
  };
  

  const afteraround = () => {
    setRoundWinner('');
    setplayer1Card('');
    setplayer2Card('');
    setIsPlayer1Turn(true);
    if (player1Deck.length === 0 || player2Deck.length === 0) {
      determineGameWinner();
    }
  };

  const determineGameWinner = () => {
    if (player1Deck.length > player2Deck.length) {
      setGameWinner(player1Name);
    } else{
      setGameWinner(player2Name);
    }
  };

  const resetGame = () => {
    const allNumbers = Array.from({ length: 2 * numOfCards }, (_, index) => index + 1);
    console.log(allNumbers);
    for (let i = allNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allNumbers[i], allNumbers[j]] = [allNumbers[j], allNumbers[i]];
    }
    const firstList = allNumbers.slice(0, numOfCards);
    const secondList = allNumbers.slice(numOfCards);
    setPlayer1Deck(firstList);
    setPlayer2Deck(secondList);
    setIsPlayer1Turn(true);
    setRoundWinner('');
    setGameWinner('');
    setplayer1Card('');
    setplayer2Card('');
    updateIsGameStarted(false);
  };

  return (
    <div className="game-screen">
      <h1 className="title">Card Game</h1>
      <div className="players">
        <div className={`player ${isPlayer1Turn ? 'active' : ''}`}>
          <h2>{player1Name}</h2>
          <p>The number is:</p> {player1Card}
          <br></br>
          <button onClick={drawCard1} disabled={!isPlayer1Turn || roundWinner || gameWinner}>
           take a card
          </button>
          <br></br><br></br>
          Cards left: {player1Deck.length}
        </div>
        <div className={`player ${!isPlayer1Turn ? 'active' : ''}`}>
          <h2>{player2Name}</h2>
          <p>The number is:</p> {player2Card}
          <br></br>
          <button onClick={drawCard2} disabled={isPlayer1Turn || roundWinner || gameWinner}>
          take a card
          </button>
          <br></br><br></br>
          Cards left: {player2Deck.length}
        </div>
      </div>
      {roundWinner && <p className="round-winner">Round Winner: {roundWinner}</p>}
      <button className="next-around" onClick={afteraround} disabled={!player1Card || !player2Card}>
            next around
      </button>
      {gameWinner && (
        <div>
          <br></br>
          <h className="game-winner">Game Winner: {gameWinner} !!!!!</h><br></br>
          <button className="play-again-button" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
