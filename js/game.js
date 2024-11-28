import { updateScoreBoard } from "/js/score.js";
import { handleEndGame } from "/js/endGame.js";

const hangmanParts = [
  document.getElementById("ground"),
  document.getElementById("scaffold"),
  document.getElementById("head"),
  document.getElementById("body"),
  document.getElementById("arms"),
  document.getElementById("legs"),
];

let correctGuesses = 0;
let incorrectGuesses = 0;
const maxIncorrectGuesses = 6;
let gameOver;

// Om man gissar fel kommer nästa del på gubben
function showNextPart() {
  if (incorrectGuesses < hangmanParts.length) {
    hangmanParts[incorrectGuesses].style.display = "block";
  }
}

// resetar gubben
function hideAllParts() {
  hangmanParts.forEach((part) => {
    if (part) {
      part.style.display = "none";
    }
  });
}

// Hämtar hemligt ord och startar spelet
let secretWord;
export function startNewGame() {
  gameOver = false;
  incorrectGuesses = 0;
  resetKeyboard();

  const savedPlayerData = JSON.parse(localStorage.getItem("playerData"));
  secretWord = savedPlayerData.playerWord.toUpperCase();

  hideAllParts();
  createWordBlanks(savedPlayerData.difficulty);
}

// om man gissar fel händer detta: showNextPart() eller gameOver vy
function handleIncorrectGuess() {
  if (incorrectGuesses < maxIncorrectGuesses) {
    showNextPart();
    incorrectGuesses++; //Felräknare
  }

  if (incorrectGuesses >= maxIncorrectGuesses) {
    showNextPart();
    gameOver = true;

    const savedPlayerData = JSON.parse(localStorage.getItem("playerData"));
    updateScoreBoard(
      false,
      savedPlayerData.playerName,
      incorrectGuesses,
      savedPlayerData.difficulty,
      savedPlayerData.scoreTime
    );

    // Fördröjning för att hangmans delar ska komma med innan game over
    setTimeout(() => {
      handleEndGame(false, savedPlayerData.playerName, incorrectGuesses + correctGuesses, savedPlayerData.playerWord);
    }, 500); // Halv sekund fördrjöning
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
    button.classList.add("correct");
    correctGuesses++; // Öka räknar rätt gissning
  } else {
    handleIncorrectGuess(letter);
    button.classList.add("incorrect");
  }

  if (checkWin()) {
    gameOver = true;
    const savedPlayerData = JSON.parse(localStorage.getItem("playerData"));

    updateScoreBoard(
      true,
      savedPlayerData.playerName,
      incorrectGuesses,
      savedPlayerData.difficulty,
      savedPlayerData.scoreTime
    );

    setTimeout(
      () =>
        handleEndGame(true, savedPlayerData.playerName, correctGuesses + incorrectGuesses, savedPlayerData.playerWord),
      100
    );
    // startNewGame();
  }
}

// Kollar om man vinner
function checkWin() {
  const blanks = document.querySelectorAll(".gissa");
  const win = Array.from(blanks).every((blank, index) => blank.textContent === secretWord[index]);
  return win;
}

// Resetar skrivbordet
function resetKeyboard() {
  const buttons = document.querySelectorAll(".ord");
  buttons.forEach((button) => {
    button.disabled = false;
    button.classList.remove("correct", "incorrect");
  });
}

// Gör det möjligt att klicka på bokstäverna med muspekaren
document.querySelectorAll(".ord").forEach((button) => {
  button.addEventListener("click", (event) => {
    if (gameOver == true) {
      return;
    }

    handleLetterClick(event.target.dataset.letter);
  });
});

// Gör spelet möjligt att köra med fysisk tagentbord
document.addEventListener("keydown", (event) => {
  if (gameOver == true) {
    return;
  }

  const letter = event.key.toUpperCase();

  if (/[A-Ö]$/.test(letter)) {
    handleLetterClick(letter);
  }
});





function giveHint() {
	// Filtrera fram de bokstäver i `secretWord` som ännu inte gissats
	const unguessedLetters = [...secretWord].filter(
	  (letter) =>
		!Array.from(document.querySelectorAll(".gissa")).some(
		  (blank) => blank.textContent === letter
		)
	);
  
	if (unguessedLetters.length > 0) {
	  // Välj en slumpmässig bokstav från de oavslöjade bokstäverna
	  const hintLetter =
		unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)];
  
	  // Avslöja bokstaven i spelet
	  revealLetter(hintLetter);
  
	  // Visa ledtråden som ett meddelande
	  alert(`Ledtråd: Bokstaven "${hintLetter}" är i ordet!`);
	} else {
	  alert("Inga fler ledtrådar tillgängliga!");
	}
  }

  
  document.addEventListener("DOMContentLoaded", function () {
	// Aktivera hint-knappen när sidan laddas
	const hintButton = document.querySelector(".hint");
	if (hintButton) {
	  hintButton.disabled = false; // Ta bort disabled-attributet
	  hintButton.addEventListener("click", giveHint);
	}
  });
  

// Håller på med Hint knapp
// const hintButton = document.querySelector('.hint');
// hintButton.addEventListener('click', givehint);

 //function giveHint() {
    // const unguessedLetters = [...secretWord].filter(letter => !guessedLetters.includes(letter));
    //if (unguessedLetters.length > 0) {

      //  const hintletter = [Math.floor(Math.random() * unguessedLetters.length)];
	//}}