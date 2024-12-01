const scoreList = document.querySelector("#score-list");
const scoreMenu = document.querySelectorAll(".score-menu th");

// Uppdaterar scoreboarden i localStorage
export function updateScoreBoard(win, name, hint, guesses, wordLength, date) {
  if (localStorage.getItem("scoreBoard") === null) {
    localStorage.setItem("scoreBoard", JSON.stringify([{ win, name, hint, guesses, wordLength, date }]));
  } else {
    let scoreBoard = JSON.parse(localStorage.getItem("scoreBoard"));
    scoreBoard.push({ win, name, hint, guesses, wordLength, date });
    localStorage.setItem("scoreBoard", JSON.stringify(scoreBoard));
  }
}

// Sorterar scoreboard (type är det man vill sortera efter, standard ska vara "guesses")
export function sortArray(type) {
  let scoreBoard = JSON.parse(localStorage.getItem("scoreBoard"));
  if (!scoreBoard) return;
  else if (type == "win" || type == "wordLength") {
    scoreBoard.sort((a, b) => {
      if (a[type] > b[type]) return -1;
      if (a[type] < b[type]) return 1;
      return 0;
    });
  } else if (type == "date") {
    scoreBoard.sort((a, b) => {
      const dateA = new Date(a[type]);
      const dateB = new Date(b[type]);
      return dateB - dateA;
    });
  } else {
    scoreBoard.sort((a, b) => {
      if (a[type] < b[type]) return -1;
      if (a[type] > b[type]) return 1;
      return 0;
    });
  }

  localStorage.setItem("scoreBoard", JSON.stringify(scoreBoard));
}

export function renderOutScoreboard() {
  let scoreBoard = JSON.parse(localStorage.getItem("scoreBoard"));
  scoreList.innerHTML = "";

  if (scoreBoard) {
    scoreBoard.forEach((player) => {
      // Skapar en tr container
      let playerContainer = document.createElement("tr");

      // Skapar svg och img element och lägger till svg filen till det
      let td = document.createElement("td");
      let img = document.createElement("img");
      img.classList.add("checkmark");

      if (player.win === true) {
        img.src = "/svg/checkmark.svg";
        img.alt = "en checkmark ikon för vinst";
      } else {
        img.src = "/svg/cross.svg";
        img.alt = "ett kryss för förlust";
      }

      td.append(img);
      playerContainer.append(td);

      // Om man tagit en hint så får spelaren en asterisk
      if (player.hint >= 1) {
        player.name = player.name + "*";
      }

      // Lägger till namn, antal gissningar, ord längd och datum med tid på score boarden
      let date = new Date(player.date);
      date = date.toLocaleString().slice(0, -3);

      let playerProp = [player.name, player.guesses, player.wordLength, date];

      playerProp.forEach((prop) => {
        let elementTd = document.createElement("td");
        elementTd.innerText = prop;
        playerContainer.append(elementTd);
      });

      scoreList.append(playerContainer);
    });
  }
}

scoreMenu.forEach((option) => {
  option.addEventListener("click", () => {
    scoreMenu.forEach((option) => {
      option.classList.remove("sort-by");
    });

    option.classList.add("sort-by");
    sortArray(option.dataset.value);
    renderOutScoreboard();
  });
});
