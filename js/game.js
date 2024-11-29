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
let hintCount = 0;
let gameOver = false;
let secretWord = "";
let correctCounter = 0;
let incorrectCounter = 0;
let hintCounter = 0;

const maxIncorrectGuesses = hangmanParts.length;
const maxHints = 2;

// Avslöjar bokstaven som är rätt
function revealLetter(letter, isHint = false) {
  const blanks = document.querySelectorAll(".gissa");
  for (let i = 0; i < secretWord.length; i++) {
    if (secretWord[i] === letter) {
      blanks[i].innerHTML = letter;
      if (isHint) blanks[i].classList.add("hint-reveal");
    }
  }
}

// Uppdaterar räknare
function updateCounters() {
  const correctCounterElem = document.querySelector("#correctCounter");
  const incorrectCounterElem = document.querySelector("#incorrectCounter");
  const hintCounterElem = document.querySelector("#hintCounter");

  if (correctCounterElem) correctCounterElem.textContent = `Rätt: ${correctCounter}`;
  if (incorrectCounterElem) incorrectCounterElem.textContent = `Fel: ${incorrectCounter}`;
  if (hintCounterElem) hintCounterElem.textContent = `Hints: ${hintCounter}`;
}

// Resetar räknare
function resetCounters() {
  correctGuesses = 0;
  incorrectGuesses = 0;
  hintCount = 0;
}

// Om man gissar fel kommer nästa del på gubben
function showNextPart() {
  if (incorrectGuesses < hangmanParts.length) {
    hangmanParts[incorrectGuesses].style.display = "block";
  }
}

// Resetar gubben
function hideAllParts() {
  hangmanParts.forEach((part) => {
    if (part) part.style.display = "none";
  });
}

// Startar ett nytt spel
export function startNewGame() {
  gameOver = false;
  isGameActive = true;
  resetCounters();
  resetGameState();

  const savedPlayerData = JSON.parse(localStorage.getItem("playerData"));
  secretWord = savedPlayerData.playerWord.toUpperCase();

  hideAllParts();
  createWordBlanks(savedPlayerData.difficulty);
  setupKeyboard();

  const hintButton = document.querySelector(".hint");
  if (hintButton) hintButton.disabled = false;

  // Hantera hem-knappen
  const homeButton = document.querySelector(".home");
  if (homeButton) {
    homeButton.addEventListener("click", () => {
      startNewGame();
      window.location.href = "/home.html";
    });
  }
}

let isGameActive = false;
// Resetar spelet
function resetGameState() {
  gameOver = false;
  isGameActive = false;
  correctGuesses = 0;
  incorrectGuesses = 0;
  hintCount = 0;
  secretWord = "";
  hideAllParts();
  resetKeyboard();

  const wordContainer = document.querySelector(".word-container");
  wordContainer.innerHTML = "";
  const hintButton = document.querySelector(".hint");
  if (hintButton) hintButton.disabled = false;
}

// Skapar tomma platser för ordet
function createWordBlanks(difficulty) {
  const wordContainer = document.querySelector(".word-container");
  wordContainer.innerHTML = "";

  for (let i = 0; i < secretWord.length; i++) {
    const blank = document.createElement("div");
    blank.classList.add("gissa");
    blank.textContent = "_";
    wordContainer.appendChild(blank);
  }
}

// Hanterar fel gissning
function handleIncorrectGuess() {
  if (incorrectGuesses < maxIncorrectGuesses) {
    showNextPart();
    incorrectGuesses++;
    incorrectCounter++;
  }

  if (incorrectGuesses >= maxIncorrectGuesses) {
    gameOver = true;
    const savedPlayerData = JSON.parse(localStorage.getItem("playerData"));
    updateScoreBoard(false, savedPlayerData.playerName, incorrectGuesses, savedPlayerData.difficulty, savedPlayerData.scoreTime);

    setTimeout(() => {
      handleEndGame(false, savedPlayerData.playerName, incorrectGuesses + correctGuesses, savedPlayerData.playerWord);
    }, 500);
  }
}

// Kollar om man vinner
function checkWin() {
  const blanks = document.querySelectorAll(".gissa");
  return Array.from(blanks).every((blank, index) => blank.textContent === secretWord[index]);
}

// Resetar tangentbordet
function resetKeyboard() {
  const buttons = document.querySelectorAll(".ord");
  buttons.forEach((button) => {
    button.disabled = false;
    button.classList.remove("correct", "incorrect");
  });
}

// Sätter upp tangentbordet
function setupKeyboard() {
  if (!isGameActive) {}
  document.addEventListener("keydown",function(event) {
    const letter = event.key.toUpperCase();
  })
  document.addEventListener("keydown", function(event) {
    const letter = event.key.toUpperCase();  // Får bokstaven som trycktes
    const buttons = document.querySelectorAll('.ord');
    
    buttons.forEach(button => {
      if (button.dataset.letter === letter) {
        button.click();  //Klick på knappen som motsvarar den tryckta tangenten
      }
    });
  });

  document.querySelectorAll(".ord").forEach((button) => {
    button.addEventListener("click", (event) => {
      if (!gameOver) handleLetterClick(event.target.dataset.letter);
    });
  });
}

// Funktion som hanterar bokstavsklick
function handleLetterClick(letter) {
  const button = document.querySelector(`button[data-letter="${letter}"]`);
  if (!button || button.disabled || gameOver) return; // Inaktivera om spelet är slut

  button.disabled = true;

  if (secretWord.includes(letter)) {
    revealLetter(letter);
    button.classList.add("correct");
    correctGuesses++;
    correctCounter++;
  } else {
    handleIncorrectGuess();
    button.classList.add("incorrect");
  }

  updateCounters(); // Uppdatera räknare

  if (checkWin()) {
    gameOver = true;
    const savedPlayerData = JSON.parse(localStorage.getItem("playerData"));

    updateScoreBoard(true, savedPlayerData.playerName, incorrectGuesses, savedPlayerData.difficulty, savedPlayerData.scoreTime);

    setTimeout(() => {
      handleEndGame(true, savedPlayerData.playerName, correctGuesses + incorrectGuesses, savedPlayerData.playerWord);
    }, 100);
  }
}

// Hint funktion
function giveHint() {
  const unguessedLetters = [...secretWord].filter(
    (letter) => !Array.from(document.querySelectorAll(".gissa")).some((blank) => blank.textContent === letter)
  );

  if (hintCount >= maxHints) {
    const hintButton = document.querySelector(".hint");
    if (hintButton) hintButton.disabled = true;
    return;
  }
// Räknar hur många Hintar som gjort
  if (unguessedLetters.length > 0) {
    const hintLetter = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)];
    revealLetter(hintLetter, true);
    hintCount++;
    hintCounter++;
    updateCounters();

    if (hintCount >= maxHints) {
      const hintButton = document.querySelector(".hint");
      if (hintButton) hintButton.disabled = true;
    }
  }
}

// Funktion som hanterar event listeners för spelet
function setupEventListeners() {
  setupKeyboard();

  // Klicka på hint-knappen
  const hintButton = document.querySelector(".hint");
  if (hintButton) {
    hintButton.disabled = false;
    hintButton.addEventListener("click", giveHint);
  }

  // Klicka på hem-knappen för att starta nytt spel
  const homeButton = document.querySelector(".home");
  if (homeButton) {
    homeButton.addEventListener("click", startNewGame);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
});

const gameButton = document.querySelector(".game-button");

gameButton.addEventListener("click", () => {
  startNewGame();
});

