const scoreList = document.querySelector("#score-list");
let playerScore = JSON.parse(localStorage.getItem("playerData"));

// Uppdaterar scoreboarden i localStorage
function updateScoreBoard(win, name, guesses, wordLength, date) {
  if (localStorage.getItem("scoreBoard") === null) {
    localStorage.setItem("scoreBoard", JSON.stringify([{ win, name, guesses, wordLength, date }]));
  } else {
    let scoreBoard = JSON.parse(localStorage.getItem("scoreBoard"));
    scoreBoard.push({ win, name, guesses, wordLength, date });
    localStorage.setItem("scoreBoard", JSON.stringify(scoreBoard));
  }
}

let scoreBoard = JSON.parse(localStorage.getItem("scoreBoard"));

// Sorterar scoreboard (type är det man vill sortera efter, standard ska vara "guesses")
function sortArray(type) {
  let sortArray = [...scoreBoard];
  let isDone;

  do {
    isDone = false;
    for (let index = 0; index < sortArray.length - 1; index++) {
      if (sortArray[index][type] > sortArray[index + 1][type]) {
        [sortArray[index][type], sortArray[index + 1][type]] = [sortArray[index + 1][type], sortArray[index][type]];
        isDone = true;
      }
    }
  } while (isDone);
}
// För att ropa på funktionen
sortArray("guesses");

// För att ropa på funktionen
// updateScoreBoard(false, playerScore.playerName, 2, playerScore.difficulty, playerScore.scoreTime);

scoreBoard.forEach((player) => {
  // Skapar en tr container
  let playerContainer = document.createElement("tr");

  // Skapar svg och img element och lägger till svg filen till det
  let svg = document.createElement("td");
  let img = document.createElement("img");
  img.classList.add("checkmark");

  if (player.win === true) {
    img.src = "/svg/checkmark.svg";
    img.alt = "en checkmark ikon för vinst";
  } else {
    img.src = "/svg/cross.svg";
    img.alt = "ett kryss för förlust";
  }

  svg.append(img);
  playerContainer.append(svg);

  // Lägger till namn, antal gissningar, ord längd och datum med tid på score boarden
  let playerProp = [player.name, player.guesses, player.wordLength, player.date];

  playerProp.forEach((prop) => {
    let elementTd = document.createElement("td");
    elementTd.innerText = prop;
    playerContainer.append(elementTd);
  });

  scoreList.append(playerContainer);
});