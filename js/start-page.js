import {words} from "/js/svenska-ord.js"

//const for rules
const rulesClose = document.querySelector("#cross");
const rulesButton = document.querySelector("#rules-button");
const rulesBox = document.querySelector("#rules");
const startOverlay = document.querySelector("#start-overlay");

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

function showRules() {
	rulesBox.classList.add("display-block");
	startOverlay.classList.add("display-flex");
	//   rulesBox.show();
	setTimeout(() => {
	  rulesBox.classList.add("visible");
  }, 300);
}

function hideRules() {
  rulesBox.classList.remove("visible", "display-block");
  startOverlay.classList.remove("display-flex");
}

function showDifficulty() {
	difficultyBox.classList.add("display-block");
	startOverlay.classList.add("display-flex");
	setTimeout(() => {
	  difficultyBox.classList.add("visible");
  }, 300);
}

function hideDifficulty() {
  difficultyBox.classList.remove("visible", "display-block");
  startOverlay.classList.remove("display-flex");
}

function showAlertBox() {
	alertBox.classList.add("display-block");
	startOverlay.classList.add("display-flex");
	setTimeout(() => {
		alertBox.classList.add("visible");
  }, 300);
}

function hideAlertBox() {
  startOverlay.classList.remove("display-flex");
  alertBox.classList.remove("visible", "display-block");
}

//fuction for randomizing word
let randomWord = '';
function randomWordPicker(){
	if(words.length === 0){
		console.error('Word list is empty');
	}
	let difficultyIndex = parseInt(numberInputSlider.value);
	
	do{
		const randomWordIndex = Math.floor(Math.random() * words.length);
		randomWord = words[randomWordIndex];
		console.log(randomWord)
	} while(randomWord.length !== difficultyIndex)
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
	playerWord: word
  };

  localStorage.setItem("playerData", JSON.stringify(playerData));
}

//buttons for pop up boxes
alertButton.addEventListener("click", () => {
  hideAlertBox();
});

alertClose.addEventListener("click", () => {
  hideAlertBox();
});

rulesButton.addEventListener("click", () => {
  showRules();
});

rulesClose.addEventListener("click", () => {
  hideRules();
});

startOverlay.addEventListener("click", (event) => {
	console.log("start overlay clock", event.target)
	if (event.target === startOverlay) {
	  hideRules();
	  hideDifficulty();
	  hideAlertBox();
	}
});

diffiultyClose.addEventListener("click", () => {
  hideDifficulty();
});

startButton.addEventListener("click", () => {
  if (nameInput.value === "") {
    showAlertBox();
    console.log("namn!");
  } else {
    showDifficulty();
  }
});

//eventlisteners to stop clicks from bubbling up
rulesBox.addEventListener("click", (event) => {
	event.stopPropagation();
});

difficultyBox.addEventListener("click", (event) => {
	event.stopPropagation();
});

alertBox.addEventListener("click", (event) => {
	event.stopPropagation();
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

