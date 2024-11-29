import { words } from "/js/svenska-ord.js";

//const for rules
const rulesClose = document.querySelector("#cross");
const rulesButton = document.querySelector("#rules-button");
const rulesBox = document.querySelector("#rules");
const Overlay = document.querySelector("#start-overlay");

//const for difficulty box
const numberDisplay = document.querySelector(".number-display");
const difficultyBox = document.querySelector("#difficulty");
const diffiultyClose = document.querySelector("#cross2");

//const for start/difficulty inputs
const startButton = document.querySelector("#start-button");
const nameInput = document.querySelector("#name-input");
const numberInputSlider = document.querySelector("#number-input");

//const for alertbox
const alertBox = document.querySelector("#alert-box");
const alertButton = document.querySelector("#alert-button");
const alertClose = document.querySelector("#cross3");

//eventlistener for the nameinput
nameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    startButton.click();
  }
});

//dialog
export function showDialog(dialog) {
  dialog.classList.add("display-block");
  Overlay.classList.add("display-flex");

  setTimeout(() => {
    dialog.classList.add("visible");

    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const firstFocusable = dialog.querySelector(focusableSelectors);
    if (firstFocusable) firstFocusable.focus();
    trapFocus(dialog);
  }, 300);
}

export function hideDialog(dialog) {
  dialog.classList.remove("visible", "display-block");
  Overlay.classList.remove("display-flex");
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    [rulesBox, difficultyBox, alertBox].forEach(hideDialog);
  }
});

//fuction for randomizing word
let randomWord = "";
function randomWordPicker() {
  if (words.length === 0) {
    console.error("Word list is empty");
  }
  let difficultyIndex = parseInt(numberInputSlider.value);

  do {
    const randomWordIndex = Math.floor(Math.random() * words.length);
    randomWord = words[randomWordIndex];
  } while (randomWord.length !== difficultyIndex);
  console.log(randomWord.length, randomWord);
}

//Function to save the players name, difficulty, date and word
export function savePlayerData() {
  randomWordPicker();
  const difficulty = numberInputSlider.value;
  const name = nameInput.value;
  const word = randomWord;

  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDate();

  const playerData = {
    playerName: name,
    difficulty: difficulty,
    scoreTime: `${year}-${month + 1}-${day}`,
    playerWord: word,
  };

  localStorage.setItem("playerData", JSON.stringify(playerData));
  hideDialog(difficultyBox);
}

//buttons for pop up boxes
alertButton.addEventListener("click", () => {
  hideDialog(alertBox);
});

alertClose.addEventListener("click", () => {
  hideDialog(alertBox);
});

rulesButton.addEventListener("click", () => {
  showDialog(rulesBox);
});

rulesClose.addEventListener("click", () => {
  hideDialog(rulesBox);
});

Overlay.addEventListener("click", (event) => {
  if (event.target === Overlay) {
    [rulesBox, difficultyBox, alertBox].forEach(hideDialog);
  }
});

diffiultyClose.addEventListener("click", () => {
  hideDialog(difficultyBox);
});

startButton.addEventListener("click", () => {
  if (nameInput.value === "") {
    showDialog(alertBox);
  } else {
    showDialog(difficultyBox);
  }
});

//eventlistener to stop clicks from bubbling up
[rulesBox, difficultyBox, alertBox].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

//functions for the difficulty inputslider
function numberUpdate(currentNumber, min, max) {
  numberDisplay.innerHTML = "";

  for (let i = min; i <= max; i++) {
    const numberElement = document.createElement("div");
    numberElement.textContent = i;

    if (i === currentNumber) {
      numberElement.classList.add("highlight");
    }
    numberDisplay.appendChild(numberElement);
  }
}

const min = parseInt(numberInputSlider.min);
const max = parseInt(numberInputSlider.max);
numberUpdate(parseInt(numberInputSlider.value), min, max);

numberInputSlider.addEventListener("input", () => {
  const currentNumber = parseInt(numberInputSlider.value);
  numberUpdate(currentNumber, min, max);
});

//function to trap focus in the dialog box
function trapFocus(dialog) {
  const focusableElements = dialog.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  });
}
