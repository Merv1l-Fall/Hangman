const hangmanParts = [
    document.getElementById('ground'),
    document.getElementById('scaffold'),
    document.getElementById('head'),
    document.getElementById('body'),
    document.getElementById('arms'),
    document.getElementById('legs'),
  ];
 
  let incorrectGuesses = 0;
  const maxIncorrectGuesses = 6;
 
  // Om man gissar fel kommer nästa del på gubben
  function showHangmanPart(partId) {
      const part = document.getElementById(partId);
      if (part) {
          part.style.display = "block";
      }
  }  
  function showNextPart() {
        if (incorrectGuesses < hangmanParts.length) {
            hangmanParts[incorrectGuesses].style.display = "block";
        }
    }


    // resetar gubben
  function hideAllParts() {
    hangmanParts.forEach(part => {
        if (part) {
            part.style.display = "none";
        }
      });
  }

  // Hämtar hemligt ord och startar spelet
  let secretWord;
  export function startNewGame() {
      incorrectGuesses = 0;
      resetKeyboard();

      const savedPlayerData = JSON.parse(localStorage.getItem("playerData"));
    secretWord = savedPlayerData.playerWord.toUpperCase();

      hideAllParts();
      createWordBlanks(savedPlayerData.difficulty);

      console.log(secretWord)
      }
 
      // om man gissar fel händer detta:
  function handleIncorrectGuess() {
    if (incorrectGuesses < maxIncorrectGuesses) {
        showNextPart();
        incorrectGuesses++;
        showHangmanPart(incorrectGuesses)
    }
   
    if (incorrectGuesses >= maxIncorrectGuesses) {
        alert(`Game over! Ordet var "${secretWord}".`);
    }
}
 
// Skapar tomma platser för ordet
  function createWordBlanks(secretWord) {
      const wordContainer = document.querySelector(".word-container");
      wordContainer.innerHTML = "";

      for (let i = 0; i < secretWord; i++) {
          const blank = document.createElement("div");
          blank.classList.add("gissa");
          blank.textContent = "_";
          wordContainer.appendChild(blank);
      }
  }
 
 
  const keyboard = document.querySelector("#keyboard");
  const incorrectLetters = [];
  const displayedWord = document.querySelector("#word-display");
 
 // Avslöjar bokstaven som är rätt
  function revealLetter(letter) {
      const blanks = document.querySelectorAll(".gissa");
      for (let i = 0; i < secretWord.length; i++) {
          if (secretWord[i] === letter) {
              blanks[i].innerHTML = letter;
          }
      } 
      
  }
 
  // klick funktion på bokstäverna
  function handleLetterClick(letter) {
      const button = document.querySelector(`button[data-letter="${letter}"]`);
      if (!button || button.disabled) return;
     
      button.disabled = true;
 
      if (secretWord.includes(letter) == true) {
          revealLetter(letter);
          button.classList.add('correct');  
      } else {
          (handleIncorrectGuess(letter));
          button.classList.add('incorrect');
          showHangmanPart(incorrectGuesses)
      }
 
      if (checkWin()) {
          setTimeout(() => alert("Grattis! Du vann!"), 100);
          startNewGame();
      }
  }
 
  function checkWin() {
      const blanks = document.querySelectorAll(".gissa");
      const win = Array.from(blanks).every((blank, index) => blank.textContent === secretWord[index]);
      if (win) {
      }
      return win;
  }
 
  function resetKeyboard() {
      const buttons = document.querySelectorAll(".ord");
      buttons.forEach((button) => {
          button.disabled = false;
          button.classList.remove("correct", 'incorrect');
      });
  }
 
  document.querySelectorAll(".ord").forEach((button) => {
      button.addEventListener("click", (event) => {
          handleLetterClick(event.target.dataset.letter);
      });
  });
 
 
 
 
  // Håller på med Hint knapp
  // const hintButton = document.querySelector('.hint');
  // hintButton.addEventListener('click', givehint);
 
  // function giveHint() {
  //     const unguessedLetters = [...secretWord].filter(letter => !guessedLetters.includes(letter));
  //     if (unguessedLetters.length > 0) {
 
  //         const hintletter = [Math.floor(Math.random() * unguessedLetters.length)];


