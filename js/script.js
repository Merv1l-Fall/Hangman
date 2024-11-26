import { savePlayerData } from "/js/start-page.js";
import { startNewGame } from "/js/game.js";

// byte mellan flikarna
const homeButton = document.querySelectorAll(".home-button");
const startGameButton = document.querySelector("#start-button2");
const scoreButton = document.querySelectorAll(".score-button");
const gameButton = document.querySelector(".game-button");

const homePage = document.querySelector("#start-page");
const gamePage = document.querySelector("#game-page");
const scorePage = document.querySelector("#score-page");

function hidePages() {
  homePage.classList.add("hide-page");
  gamePage.classList.add("hide-page");
  scorePage.classList.add("hide-page");
}

homeButton.forEach((button) => {
  button.addEventListener("click", () => {
    hidePages();
    homePage.classList.remove("hide-page");
  });
});

gameButton.addEventListener("click", () => {
  hidePages();
  gamePage.classList.remove("hide-page");
});

startGameButton.addEventListener("click", () => {
  hidePages();
  gamePage.classList.remove("hide-page");
  savePlayerData();
  startNewGame()
});

scoreButton.forEach((button) => {
  button.addEventListener("click", () => {
    hidePages();
    scorePage.classList.remove("hide-page");
  });
});
