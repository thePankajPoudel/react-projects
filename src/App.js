
import './App.css';
import React, { useState, useEffect } from 'react';
import Figure from './components/Figure';
import Header from './components/Header';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import { showNotification as show } from './helpers/helper';
import Notifications from './components/Notifications';
import PopUp from './components/PopUp';

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];



// App Component and State Management

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  // const [selectedWord, setSelectedWord] = useState(words[Math.floor(Math.random() * words.length)]);

  //useEffect Hook for Keyboard Events
  useEffect(() => {
    const handleKeydown = event => {  //It extracts the key and keyCode properties from the event object using destructuring assignment.
    const { key, keyCode } = event; // The purpose of this function is to handle the logic associated with a key press.

      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {  // Checks if the selected word contains the pressed letter.
          if (!correctLetters.includes(letter)) {  //Checks if the correctLetters state array does not already include the pressed letter.
            setCorrectLetters(currentLetters => [...currentLetters, letter]); // If both conditions are true, it updates the state by adding the pressed letter to the correctLetters array.

          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) { //Checks if the wrongLetters state array does not already include the pressed letter
            setWrongLetters(wrongLetters => [...wrongLetters, letter]); //If both conditions are true, it updates the state by adding the pressed letter to the wrongLetters array.


          } else {
            show(setShowNotification);
          }
        }
      }

    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable, /*selectedWord*/ ]);
  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  // Return JSX for Rendering
  return (
    <div>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
       
      </div>
      <Notifications showNotification={showNotification}/>
        <PopUp correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain}  />
    </div>
  );
}

//Exporting the Component
export default App;

