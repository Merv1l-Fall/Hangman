import { savePlayerData, showDialog, hideDialog } from "/js/start-page.js";
import { startNewGame, resetCounters } from "/js/game.js";
import { renderOutScoreboard, sortArray } from "/js/score.js";
import { gameState } from "./gameState.js";

// byte mellan flikarna
const homeButton = document.querySelectorAll(".home-button");
const startGameButton = document.querySelector("#start-button2");
const scoreButton = document.querySelectorAll(".score-button");
const gameButton = document.querySelector(".game-button");
const homeResetButton = document.querySelector("#reset-home-button");

const homePage = document.querySelector("#start-page");
const gamePage = document.querySelector("#game-page");
const scorePage = document.querySelector("#score-page");
const endGame = document.querySelector("#endGame");
const homeResetDialog = document.querySelector("#reset-box");

const closeResetDialog = document.querySelector('#cross4')

function hidePages() {
  homePage.classList.add("hide-page");
  gamePage.classList.add("hide-page");
  scorePage.classList.add("hide-page");
  endGame.classList.add("hide-page");
}

homeButton.forEach((button) => {
  button.addEventListener("click", () => {
    if (gameState.isGameActive == true) {
      showDialog(homeResetDialog);
    } else {
      hidePages();
      homePage.classList.remove("hide-page");
    }
  });
});

gameButton.addEventListener("click", () => {
  if (gameState.isGameActive == true) {
    hidePages();
    gamePage.classList.remove("hide-page");
  }
});

startGameButton.addEventListener("click", () => {
  hidePages();
  gamePage.classList.remove("hide-page");
  savePlayerData();
  startNewGame();
});

scoreButton.forEach((button) => {
  button.addEventListener("click", () => {
    hidePages();
    scorePage.classList.remove("hide-page");
    sortArray("guesses");
    renderOutScoreboard();
  });
});

homeResetButton.addEventListener('click', () =>{
	hidePages();
	hideDialog(homeResetDialog);
	homePage.classList.remove("hide-page");
	resetCounters();
})

closeResetDialog.addEventListener('click', () => {
	hideDialog(homeResetDialog);
})
