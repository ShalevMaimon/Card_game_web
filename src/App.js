import React, { useState } from 'react';
import './App.css';

function App() {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);

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
        <GameScreen player1Name={player1Name} player2Name={player2Name} />
      )}
    </div>
  );
}

function GameScreen({ player1Name, player2Name }) {
  const [player1Deck, setPlayer1Deck] = useState(Array.from({ length: 10 }, (_, i) => i + 1));
  const [player2Deck, setPlayer2Deck] = useState(Array.from({ length: 10 }, (_, i) => i + 1));
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
  const [roundWinner, setRoundWinner] = useState('');
  const [gameWinner, setGameWinner] = useState('');
  const [player1Card, setplayer1Card] = useState('');
  const [player2Card, setplayer2Card] = useState('');
  const [index1, setindex1] =  useState(0);
  const [index2, setindex2] = useState(0);

  const drawCard1 = () => {
    let x=Math.floor(Math.random() * player1Deck.length);
    let valuex=player2Deck[x];
    setindex1(x);
    setplayer1Card(valuex);
    setIsPlayer1Turn(!isPlayer1Turn);
  };

  const drawCard2 = () => {
    if (player1Deck.length === 0 || player2Deck.length === 0) {
      determineGameWinner();
      return;
    }
    let y=Math.floor(Math.random() * player2Deck.length);
    let valuey=player2Deck[y];
    setindex2(y);
    setplayer2Card(valuey);
    win(valuey,y);

    
  };

  const win = (y,indexy) => {
    if (player1Card > y) {
      setRoundWinner(player1Name);
      const newDeck1 = [...player2Deck];
      newDeck1.splice(indexy, 1); 
      setPlayer2Deck(newDeck1);
      setPlayer1Deck(player1Deck => [...player1Deck, y]);
    } else if (y > player1Card) {
      setRoundWinner(player2Name);
      const newDeck1 = [...player1Deck];
      newDeck1.splice(index1, 1); 
      setPlayer1Deck(newDeck1);
      setPlayer2Deck(player2Deck => [...player2Deck, player1Card]);
    } else {
      setRoundWinner('Tie');
    }

    if (player1Deck.length === 0 || player2Deck.length === 0) {
      determineGameWinner();
    }

  };
  

  const afteraround = () => {
    setRoundWinner('');
    setplayer1Card('');
    setplayer2Card('');
    setIsPlayer1Turn(true);
  };

  const determineGameWinner = () => {
    if (player1Deck.length > player2Deck.length) {
      setGameWinner(player1Name);
    } else{
      setGameWinner(player2Name);
    }
  };

  const resetGame = () => {
    setPlayer1Deck(Array.from({ length: 10 }, (_, i) => i + 1));
    setPlayer2Deck(Array.from({ length: 10 }, (_, i) => i + 1));
    setIsPlayer1Turn(true);
    setRoundWinner('');
    setGameWinner('');
  };

  return (
    <div className="game-screen">
      <h1 className="title">Card Game</h1>
      <div className="players">
        <div className={`player ${isPlayer1Turn ? 'active' : ''}`}>
          <h2>{player1Name}</h2>
          <p>The number is:</p> {player1Card}
          <br></br>
          <button onClick={drawCard1} disabled={!isPlayer1Turn || roundWinner}>
           take a card
          </button>
          <br></br><br></br>
          Cards left: {player1Deck.length}
        </div>
        <div className={`player ${!isPlayer1Turn ? 'active' : ''}`}>
          <h2>{player2Name}</h2>
          <p>The number is:</p> {player2Card}
          <br></br>
          <button onClick={drawCard2} disabled={isPlayer1Turn || roundWinner}>
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
          <p className="game-winner">Game Winner: {gameWinner}</p>
          <button className="play-again-button" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
