const rulesClose = document.querySelector("#cross");
const rulesButton = document.querySelector("#rules-button");
const rulesBox = document.querySelector("#rules");
const startOverlay = document.querySelector("#start-overlay");

const numberDisplay = document.querySelector(".number-display");
const difficultyBox = document.querySelector("#difficulty");
const diffiultyClose = document.querySelector("#cross2");

const startButton = document.querySelector("#start-button");
const nameInput = document.querySelector("#name-input");
const numberInputSlider = document.querySelector("#number-input");

const alertBox = document.querySelector("#alert-box");
const alertButton = document.querySelector("#alert-button");
const alertClose = document.querySelector("#cross3");

function showRules() {
  rulesBox.classList.add("visible");
  startOverlay.classList.add("visible");
  setTimeout(() => {
    rulesBox.classList.add("display-block");
  }, 500);
  rulesBox.showModal();
}

function hideRules() {
  rulesBox.classList.remove("visible");
  startOverlay.classList.remove("visible");
  rulesBox.close();
}

function showDifficulty() {
  difficultyBox.classList.add("visible");
  startOverlay.classList.add("visible");
  setTimeout(() => {
    rulesBox.classList.add("display-block");
  }, 500);
  difficultyBox.showModal();
}

function hideDifficulty() {
  difficultyBox.classList.remove("visible");
  startOverlay.classList.remove("visible");
  difficultyBox.close();
}

function showAlertBox() {
  startOverlay.classList.add("visible");
  alertBox.classList.add("visible");
  setTimeout(() => {
    rulesBox.classList.add("display-block");
  }, 500);
  alertBox.showModal();
}

function hideAlertBox() {
  startOverlay.classList.remove("visible");
  alertBox.classList.remove("visible");
  alertBox.close();
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
  const difficulty = numberInputSlider.value;
  const name = nameInput.value;

  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDate();

  const playerData = {
    playerName: name,
    difficulty: difficulty,
    scoreTime: `${year}-${month + 1}-${day}`,
  };

  localStorage.setItem("playerData", JSON.stringify(playerData));
  console.log(playerData);
}

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

startOverlay.addEventListener("click", () => {
  hideRules();
  hideDifficulty();
  hideAlertBox();
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
