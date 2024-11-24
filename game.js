const word = ["Päron", "tillfälliga", "exempel", "sålänge"];
let secretWord = "";
let guessLetters = [];
let incorrectGuesses = 0;
const maxIncorrectGuesses = 10;

function updateHangman() {
    const hangmanImage = document.getElementById('hangmanImage');
    hangmanImage.src = `assets/hangman_step${incorrectGuesses}.png`; 
}


function handleIncorrectGuess() {
    incorrectGuesses++;  
    if (incorrectGuesses <= maxIncorrectGuesses) {
        updateHangman();  
    }
    if (incorrectGuesses >= maxIncorrectGuesses) {
        alert('Game over!');
        startNewGame(); 
    }
}

function startNewGame() {
    incorrectGuesses = 0;  
    secretWord = word[Math.floor(Math.random() * word.length)];
    guessLetters = [];
    document.getElementById('hangmanImage').src = 'assets/hangman_step0.png';
}

document.querySelectorAll('.ord').forEach(button => {
	button.addEventListener('click', (event) => {
	  handleLetterClick(event.target.dataset.letter);
	});
  });
  


function handleLetterClick(letter) {
	if (secretWord.includes(letter)) {
		revealLetter(letter);
	} else {
		incorrectGuesses++;
		updateHangman();
		}
	}

function revealLetter(letter) {

}