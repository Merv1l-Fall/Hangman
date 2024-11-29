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

function revealLetter(letter, isHint = false) {
  const blanks = document.querySelectorAll(".gissa");
  for (let i = 0; i < secretWord.length; i++) {
    if (secretWord[i] === letter) {
      blanks[i].innerHTML = letter;
      if (isHint) blanks[i].classList.add("hint-reveal");
    }
  }
}

function updateCounters() {
  const correctCounterElem = document.querySelector("#correctCounter");
  const incorrectCounterElem = document.querySelector("#incorrectCounter");
  const hintCounterElem = document.querySelector("#hintCounter");

  if (correctCounterElem) correctCounterElem.textContent = `Rätt: ${correctCounter}`;
  if (incorrectCounterElem) incorrectCounterElem.textContent = `Fel: ${incorrectCounter}`;
  if (hintCounterElem) hintCounterElem.textContent = `Hints: ${hintCounter}`;
}

function resetCounters() {
  correctGuesses = 0;
  incorrectGuesses = 0;
  hintCount = 0;
}

function showNextPart() {
  if (incorrectGuesses < hangmanParts.length) {
    hangmanParts[incorrectGuesses].style.display = "block";
  }
}

function hideAllParts() {
  hangmanParts.forEach((part) => {
    if (part) part.style.display = "none";
  });
}

export function startNewGame() {
  gameOver = false;
  isGameActive = true;
  resetCounters();
  resetGameState();

  const savedPlayerData = JSON.parse(localStorage.getItem("playerData"));
  secretWord = savedPlayerData && savedPlayerData.playerWord ? savedPlayerData.playerWord.toUpperCase() : "";  // Kontrollera att playerWord finns och konvertera till versaler

  hideAllParts();
  createWordBlanks(savedPlayerData.difficulty);
  setupKeyboard();

  const hintButton = document.querySelector(".hint");
  if (hintButton) hintButton.disabled = false;

  const homeButton = document.querySelector(".home");
  if (homeButton) {
    homeButton.addEventListener("click", () => {
      startNewGame();
      window.location.href = "/home.html";
    });
  }
}

export let isGameActive = false;


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

function checkWin() {
  const blanks = document.querySelectorAll(".gissa");
  return Array.from(blanks).every((blank, index) => blank.textContent === secretWord[index]);
}

function resetKeyboard() {
  const buttons = document.querySelectorAll(".ord");
  buttons.forEach((button) => {
    button.disabled = false;
    button.classList.remove("correct", "incorrect");
  });
}

function setupKeyboard() {
  document.addEventListener("keydown", function (event) {
    const letter = event.key.toUpperCase();
    const buttons = document.querySelectorAll('.ord');

    buttons.forEach(button => {
      if (button.dataset.letter === letter) {
        button.click();
      }
    });
  });

  document.querySelectorAll(".ord").forEach((button) => {
    button.addEventListener("click", (event) => {
      if (!gameOver) handleLetterClick(event.target.dataset.letter);
    });
  });
}

function handleLetterClick(letter) {
  const button = document.querySelector(`button[data-letter="${letter}"]`);
  if (!button || button.disabled || gameOver) return;

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

  updateCounters();

  if (checkWin()) {
    gameOver = true;
    const savedPlayerData = JSON.parse(localStorage.getItem("playerData"));

    updateScoreBoard(true, savedPlayerData.playerName, incorrectGuesses, savedPlayerData.difficulty, savedPlayerData.scoreTime);

    setTimeout(() => {
      handleEndGame(true, savedPlayerData.playerName, correctGuesses + incorrectGuesses, savedPlayerData.playerWord);
    }, 100);
  }
}

function giveHint() {
  const unguessedLetters = [...secretWord].filter(
    (letter) => !Array.from(document.querySelectorAll(".gissa")).some((blank) => blank.textContent === letter)
  );

  if (hintCount >= maxHints) {
    const hintButton = document.querySelector(".hint");
    if (hintButton) hintButton.disabled = true;
    return;
  }

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

function setupEventListeners() {
  setupKeyboard();

  const hintButton = document.querySelector(".hint");
  if (hintButton) {
    hintButton.disabled = false;
    hintButton.addEventListener("click", giveHint);
  }

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
