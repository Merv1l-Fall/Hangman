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
  
  function showHangmanPart(partId) {
      const part = document.getElementById(partId);
      if (part) {
          part.style.display = "block";
      }
  }  
  
  function showNextPart() {
    if (incorrectGuesses < hangmanParts.length) {
        console.log(`Visar del ${incorrectGuesses}: ${hangmanParts[incorrectGuesses].id}`);
        hangmanParts[incorrectGuesses].style.display = "block";
    }
}

  function hideAllParts() {
    hangmanParts.forEach(part => {
        if (part) {
            part.style.display = "none"; 
        }
      });
      console.log("Alla delar är dolda.");
  }
  
  let secretWord = "";
  let guessedLetters = [];
  
  function startNewGame() {
      incorrectGuesses = 0;
  
      const savedPlayerData = JSON.parse(localStorage.getItem("playerData"));
      secretWord = savedPlayerData?.playerword?.toUpperCase() || "DEFAULT";
      console.log(`Startar nytt spel med ordet: ${secretWord}`);
      
      guessedLetters = [];
      hideAllParts();
      updateHangman();
      createWordBlanks(secretWord);
      resetKeyboard();
  }
  
  // Bilden
  function updateHangman() {
      const hangmanImage = document.querySelector(".hangman-gamepage");
      hangmanImage.src = `/assets/hangman_step${incorrectGuesses}.png`;
      hangmanImage.style.display = "block"; 
      console.log(`Uppdaterar galgen till steg: ${incorrectGuesses}`);
  }
  
  function handleIncorrectGuess() {
    if (incorrectGuesses < maxIncorrectGuesses) {
        showNextPart();
        incorrectGuesses++;
        updateHangman();
    }
    
    if (incorrectGuesses >= maxIncorrectGuesses) {
        alert(`Game over! Ordet var "${secretWord}".`);
        startNewGame();
    }
}
  
  function createWordBlanks(secretWord) {
      const wordContainer = document.querySelector(".word-container");
      wordContainer.innerHTML = "";
      for (let i = 0; i < secretWord.length; i++) {
          const blank = document.createElement("div");
          blank.classList.add("gissa");
          blank.textContent = " "; 
          wordContainer.appendChild(blank);
      }
      console.log(`Streck skapade för ordet: ${secretWord}`);
  }
  
  
  const keyboard = document.querySelector("#keyboard");
  const incorrectLetters = []; 
  const displayedWord = document.querySelector("#word-display"); 
  
  
  function revealLetter(letter) {
      const blanks = document.querySelectorAll(".gissa");
      console.log(`Revealing letter: ${letter}`);
      for (let i = 0; i < secretWord.length; i++) {
          if (secretWord[i] === letter) {
              blanks[i].textContent = letter;
              console.log(`Bokstav "${letter}" placerad på position ${i}`);
          }
      }
  }
  
  function handleLetterClick(letter) {
      console.log(`Bokstav klickad: ${letter}`);
      const button = document.querySelector(`button[data-letter="${letter}"]`);
      if (!button || button.disabled) return;
      
      button.disabled = true;
  
      if (secretWord.includes(letter)) {
          revealLetter(letter);
          button.classList.add('correct');  
      } else {
          handleIncorrectGuess();
          button.classList.add('incorrect'); 
      }
  
      if (checkWin()) {
          setTimeout(() => alert("Grattis! Du vann!"), 200);
          startNewGame();
      }
  }
  
  function checkWin() {
      const blanks = document.querySelectorAll(".gissa");
      const win = Array.from(blanks).every((blank, index) => blank.textContent === secretWord[index]);
      if (win) {
          console.log("Spelet vanns!");
      }
      return win;
  }
  
  function resetKeyboard() {
      const buttons = document.querySelectorAll(".ord");
      buttons.forEach((button) => {
          button.disabled = false;
          button.classList.remove('correct', 'incorrect');
      });
      console.log("Tangentbordet har återställts.");
  }
  
  document.querySelectorAll(".ord").forEach((button) => {
      button.addEventListener("click", (event) => {
          handleLetterClick(event.target.dataset.letter);
      });
      console.log(`Knapp initierad för bokstav: ${button.dataset.letter}`);
  });
  
//   alert
  
  
  // Håller på med Hint knapp
  // const hintButton = document.querySelector('.hint');
  // hintButton.addEventListener('click', givehint);
  
  // function giveHint() {
  //     const unguessedLetters = [...secretWord].filter(letter => !guessedLetters.includes(letter));
  //     if (unguessedLetters.length > 0) {
  
  //         const hintletter = [Math.floor(Math.random() * unguessedLetters.length)];
