import { savePlayerData, showDialog, hideDialog } from "./start-page.js";
import { startNewGame, resetCounters } from "./game.js";
import { renderOutScoreboard, sortArray } from "./score.js";
import { gameState } from "./gameState.js";

// byte mellan flikarna
const homeButton = document.querySelectorAll(".home-button");
const startGameButton = document.querySelector("#start-button2");
const scoreButton = document.querySelectorAll(".score-button");
const gameButton = document.querySelector(".game-button");
const homeResetButton = document.querySelector("#reset-home-button");
const playAgain = document.querySelector(".play-again");
const difficultyBox = document.querySelector("#difficulty");

const homePage = document.querySelector("#start-page");
const gamePage = document.querySelector("#game-page");
const scorePage = document.querySelector("#score-page");
const endGame = document.querySelector("#endGame");
const homeResetDialog = document.querySelector("#reset-box");

const closeResetDialog = document.querySelector("#cross4");

function hidePages() {
  homePage.classList.add("hide-page");
  gamePage.classList.add("hide-page");
  scorePage.classList.add("hide-page");
  endGame.classList.add("hide-page");
}

homeButton.forEach((button) => {
  button.addEventListener("click", () => {
    if (gameState.isGameOver == true) {
      hidePages();
      homePage.classList.remove("hide-page");
    } else if (gameState.isGameActive == true) {
      showDialog(homeResetDialog);
    } else {
      hidePages();
      homePage.classList.remove("hide-page");
    }
  });
});

gameButton.addEventListener("click", () => {
  if (gameState.isGameOver == true) {
    return;
  } else if (gameState.isGameActive == true) {
    hidePages();
    gamePage.classList.remove("hide-page");
  }
});

startGameButton.addEventListener("click", () => {
  hidePages();
  gamePage.classList.remove("hide-page");
  savePlayerData();
  startNewGame();
  gameState.isGameOver = false;
});

scoreButton.forEach((button) => {
  button.addEventListener("click", () => {
    if (gameState.isGameOver == true) {
      gameButton.classList.add("no-game");
    }
    hidePages();
    scorePage.classList.remove("hide-page");
    sortArray("guesses");
    renderOutScoreboard();
  });
});

homeResetButton.addEventListener("click", () => {
  hidePages();
  hideDialog(homeResetDialog);
  homePage.classList.remove("hide-page");
  resetCounters();
  gameButton.classList.add("no-game");
  gameState.isGameActive = false;
});

closeResetDialog.addEventListener("click", () => {
  hideDialog(homeResetDialog);
});

playAgain.addEventListener("click", () => {
  endGame.classList.add("hide-page");
  showDialog(difficultyBox);
});
