const word = ["adoptivbarn"];
let secretWord = "";
let guessLetters = [];
let inCorrectGuesses = 0;
const maxIncorectGuesses = 10;


function getRandomWord(){
	const randomIndex = Math.floor(Math.random() * word.lenght);  
	return word[randomIndex];
}





