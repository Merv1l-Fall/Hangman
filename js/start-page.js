

const rulesClose = document.querySelector('#cross');
const rulesButton = document.querySelector('#rules-button');
const rulesBox = document.querySelector('#rules');
const rulesOverlay = document.querySelector('#rules-overlay');

const numberDisplay = document.querySelector('.number-display')
const difficultyBox = document.querySelector('#difficulty');
const diffiultyClose = document.querySelector('#cross2');

const startButton = document.querySelector('#start-button');
const nameInput = document.querySelector('#name-input');
const numberInputSlider = document.querySelector('#number-input');


function showRules(){
	rulesBox.classList.add('visible');
	rulesOverlay.classList.add('visible');
};

function hideRules(){
	rulesBox.classList.remove('visible');
	rulesOverlay.classList.remove('visible');
}

function showDifficulty(){
	difficultyBox.classList.add('visible')
	rulesOverlay.classList.add('visible');
}

function hideDifficulty(){
	difficultyBox.classList.remove('visible')
	rulesOverlay.classList.remove('visible');
}

export function savePlayerData(){
	const name = nameInput.value;
	const difficulty = numberInputSlider.value;

	const playerData = {
		playerName: name,
		difficulty: difficulty
	};

	localStorage.setItem('playerData', JSON.stringify(playerData));

	if (!name) {
		alert('Fyll i namn!');
		return;
	}
	console.log(playerData);
}


rulesButton.addEventListener('click', () => {
	showRules();
});

rulesClose.addEventListener('click', () => {
	hideRules();
});

rulesOverlay.addEventListener('click', () =>{
	hideRules();
	hideDifficulty();
});

diffiultyClose.addEventListener('click', () => {
	hideDifficulty();
})

startButton.addEventListener('click', () => {
	showDifficulty();
})





//functions for the difficulty inputslider
function numberUpdate(currentNumber, min, max){
	numberDisplay.innerHTML = '';

	for(let i = min; i <= max; i++){
		const numberElement = document.createElement('div');
		numberElement.textContent = i;

		if (i === currentNumber){
			numberElement.classList.add('highlight');
		}
		numberDisplay.appendChild(numberElement);
	}
}

const min = parseInt(numberInputSlider.min);
const max = parseInt(numberInputSlider.max);
numberUpdate(parseInt(numberInputSlider.value), min, max);

numberInputSlider.addEventListener('input', () => {
	const currentNumber = parseInt(numberInputSlider.value);
	numberUpdate(currentNumber, min, max);
});