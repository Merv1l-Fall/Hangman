import { updateScoreBoard } from "/js/score.js";
import { handleEndGame } from "/js/endGame.js";
import { gameState } from "/js/gameState.js";

// Hangman-gubbens delar, visas en efter en vid fel gissningar
const hangmanParts = [
  document.getElementById("ground"),
  document.getElementById("scaffold"),
  document.getElementById("head"),
  document.getElementById("body"),
  document.getElementById("arms"),
  document.getElementById("legs"),
];

// Spelstatistik
let correctGuesses = 0; // Antal korrekta gissningar
let incorrectGuesses = 0; // Antal felaktiga gissningar
let hintCount = 0; // Antal använda ledtrådar
let gameOver = false; // Om spelet är över
let secretWord = ""; // Det hemliga ordet
let correctCounter = 0; // Räknare för rätt gissningar
let incorrectCounter = 0; // Räknare för fel gissningar
let hintCounter = 0; // Räknare för antal använda ledtrådar

const maxIncorrectGuesses = hangmanParts.length; // Max antal fel innan spelet är över
const maxHints = 1; //Max antal ledtrådar

//Bokstäver som visas när man gissat rätt eller fel
function revealLetter(letter, isHint = false) {
  const blanks = document.querySelectorAll(".gissa");
  for (let i = 0; i < secretWord.length; i++) {
    if (secretWord[i] === letter) {
      blanks[i].innerHTML = letter;
      if (isHint) blanks[i].classList.add("hint-reveal");
    }
  }
}

//Uppdaterar de som visas i spelet
function updateCounters() {
  const correctCounterElem = document.querySelector("#correctCounter");
  const incorrectCounterElem = document.querySelector("#incorrectCounter");
  const hintCounterElem = document.querySelector("#hintCounter");

  if (correctCounterElem) correctCounterElem.textContent = `Rätt: ${correctCounter}`;
  if (incorrectCounterElem) incorrectCounterElem.textContent = `Fel: ${incorrectCounter}`;
  if (hintCounterElem) hintCounterElem.textContent = `Hints: ${hintCounter}`;
}

// Återställer alla räknare tll 0 inför nytt spel
export function resetCounters() {
  correctGuesses = 0;
  incorrectGuesses = 0;
  hintCount = 0; //Håller reda på hur många ledtrådar som använts
}

// Visar nästa del av Hangman-gubben efter en felaktig gissning
function showNextPart() {
  if (incorrectGuesses < hangmanParts.length) {
    hangmanParts[incorrectGuesses].style.display = "block";
  }
}

// Döljer alla delar av Hangman-gubben vid omstart
function hideAllParts() {
  hangmanParts.forEach((part) => {
    if (part) part.style.display = "none";
  });
}

// Startar ett nytt spel och återställer spelet
export function startNewGame() {
  const gameButton = document.querySelector(".game-button");
  gameButton.classList.remove("no-game"); // Återaktiverar knappen

  //remove the victory state
  const endGame = document.querySelector("#endGame");
  endGame.classList.remove("victory");

  gameOver = false;
  resetCounters(); // Nollställer statistiken
  resetGameState(); // Nollställ spelets tillstånd
  gameState.isGameActive = true; // Visar att spelet är aktivt

  // Hämtar spelarens data från localStorage och sätter upp spelet
  const savedPlayerData = JSON.parse(localStorage.getItem("playerData"));
  secretWord = savedPlayerData && savedPlayerData.playerWord ? savedPlayerData.playerWord.toUpperCase() : ""; // Kontrollera att playerWord finns och konvertera till versaler

  hideAllParts(); // Dölj Hangman_gubben
  createWordBlanks(savedPlayerData.difficulty); // Skapa tomma platser för det hemliga ordet
  setupKeyboard(); // Aktivera tagentbordet

  // Återaktiverar Hint-knappen
  const hintButton = document.querySelector(".hint");
  if (hintButton) hintButton.disabled = false;
  hintButton.classList.remove("disabled"); //Ta bort disabled status
}

// Återställer spelets tillstånd
function resetGameState() {
  gameOver = false;
  gameState.isGameActive = false;
  correctGuesses = 0;
  incorrectGuesses = 0;
  hintCount = 0;
  secretWord = "";
  hideAllParts(); // Döljer alla Hangman-gubben delar innan spelet startar om
  resetKeyboard(); // Återställer tangentbordets tillstånd

  // Rensar ordkontainern och aktivera Hint-knappen
  const wordContainer = document.querySelector(".word-container");
  wordContainer.innerHTML = ""; // Rensar
  const hintButton = document.querySelector(".hint");
  if (hintButton) hintButton.disabled = false; //Aktiverar
}
// Skapar tomma platser för varje bokstav i det hemliga ordet
function createWordBlanks() {
  const wordContainer = document.querySelector(".word-container");
  wordContainer.innerHTML = "";

  for (let i = 0; i < secretWord.length; i++) {
    const blank = document.createElement("div");
    blank.classList.add("gissa");
    blank.textContent = "_"; // En oupptäckt bokstav
    wordContainer.appendChild(blank);
  }
}

// Hanterar felaktiga gissningar
function handleIncorrectGuess() {
  if (incorrectGuesses < maxIncorrectGuesses) {
    showNextPart(); // Visa nästa del av Hangman-gubben
    incorrectGuesses++;
    incorrectCounter++;
  }

  // Alla delar av Hangman är visade
  if (incorrectGuesses >= maxIncorrectGuesses) {
    gameOver = true;
    hintButton.disabled = true;
    const savedPlayerData = JSON.parse(localStorage.getItem("playerData"));
    updateScoreBoard(
      false,
      savedPlayerData.playerName,
      hintCount,
      incorrectGuesses,
      savedPlayerData.difficulty,
      savedPlayerData.scoreTime
    );

    // Fördröjning för att visa sista delen av Hangman innan meddelande
    setTimeout(() => {
      handleEndGame(false, savedPlayerData.playerName, incorrectGuesses + correctGuesses, savedPlayerData.playerWord);
      gameState.isGameOver = true;
    }, 500);
  }
}

//  Kontrollera ordet gissats rätt
function checkWin() {
  const blanks = document.querySelectorAll(".gissa");
  return Array.from(blanks).every((blank, index) => blank.textContent === secretWord[index]);
}

// Återställer tangentbordets knappar så att de kan användas igen.
function resetKeyboard() {
  const buttons = document.querySelectorAll(".ord");
  buttons.forEach((button) => {
    button.disabled = false; //Aktiverar knappen
    button.classList.remove("correct", "incorrect", "hint-disabled");
  });
}

// Lägger till funktionalitet för både fysisk tangentbord och virtuella knappar.
function setupKeyboard() {
  document.addEventListener("keydown", function (event) {
    const letter = event.key.toUpperCase();
    const buttons = document.querySelectorAll(".ord");

    buttons.forEach((button) => {
      if (button.dataset.letter === letter) {
        button.click(); // Ett klick på motsvarande virtuell knapp
      }
    });
  });

  // Lägger till klickhändelse för virtuella knappar.
  document.querySelectorAll(".ord").forEach((button) => {
    button.addEventListener("click", (event) => {
      if (!gameOver) handleLetterClick(event.target.dataset.letter); // Hanterar knapptryck om spelet inte är över
    });
  });
}

function handleLetterClick(letter) {
  // Hanterar användarens gissning av en bokstav
  const button = document.querySelector(`button[data-letter="${letter}"]`);
  if (!button || button.disabled || gameOver) return; // Ignorerar om knappen inte finns, är inaktiverad eller game over

  button.disabled = true; // Inaktiverar efter användning

  if (secretWord.includes(letter)) {
    // Om bokstaven finns i det hemliga ordet.
    revealLetter(letter); // Avslöjar bokstaven i ordet.
    button.classList.add("correct"); // Markerar bokstaven som korrekt
    correctGuesses++;
    correctCounter++;
  } else {
    // Om bokstaven inte finns i det hemliga ordet
    handleIncorrectGuess(); // Hanterar felgissning
    button.classList.add("incorrect"); // Markerar bokstaven som inkorrekt
  }

  updateCounters(); // Uppdaterar räknare för rätt/fel gissningar

  if (checkWin()) {
    // Kontrollera om spelaren har vunnit
    gameOver = true;
    const savedPlayerData = JSON.parse(localStorage.getItem("playerData"));

    updateScoreBoard(
      true, // Uppdaterar poängtavlan med vinst
      savedPlayerData.playerName,
      hintCount,
      incorrectGuesses,
      savedPlayerData.difficulty,
      savedPlayerData.scoreTime
    );
    // Fördröj en kort tid innan vinstmeddelandet visas
    setTimeout(() => {
      handleEndGame(true, savedPlayerData.playerName, correctGuesses + incorrectGuesses, savedPlayerData.playerWord);
      gameState.isGameOver = true;
    }, 100);
  }
}

function giveHint() {
  // Hanterar funktionaliteten för att ge en ledtråd
  const hintButton = document.getElementById("hintButton"); // Säkerställer att knappen finns

  // Kontrollera om max antal ledtrådar har uppnåtts eller knappen redan är inaktiverad
  if (hintCount >= maxHints || !hintButton || hintButton.disabled) {
    return;
  }

  // Hitta alla ogissade bokstäver
  const unguessedLetters = [...secretWord].filter(
    (letter) => !Array.from(document.querySelectorAll(".gissa")).some((blank) => blank.textContent === letter)
  );

  if (unguessedLetters.length > 0) {
    // Välj en slumpmässig ogissad bokstav
    const hintLetter = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)];
    revealLetter(hintLetter, true);

    // Hitta motsvarande tangentknapp och inaktivera den
    const button = document.querySelector(`button[data-letter="${hintLetter}"]`);
    if (button) {
      button.disabled = true;
      button.classList.add("hint-disabled");
    }

    // Uppdatera hint-räknaren
    hintCount++;
    hintCounter++;
    updateCounters();

    // Inaktivera hint-knappen om max antal ledtrådar har använts
    if (hintCount >= maxHints) {
      hintButton.disabled = true;
      hintButton.classList.add("disabled");
    }
  }
}

// Aktiverar hint-knappen och lägger till Event Listener
const hintButton = document.getElementById("hintButton");
if (hintButton) {
  hintButton.disabled = false; // Säkerställer att knappen är aktiv
  hintButton.addEventListener("click", giveHint); // Lägger till event listener
}
