const scoreList = document.querySelector("#score-list");

const testData = [
  {
    svg: "/svg/checkmark.svg",
    name: "Linnéa",
    guesses: 19,
    wordlength: 10,
    date: "2024-11-21 14:32",
  },
  {
    svg: "/svg/checkmark.svg",
    name: "Vilmer",
    guesses: 15,
    wordlength: 15,
    date: "2024-11-21 14:32",
  },
  {
    svg: "/svg/cross.svg",
    name: "Elham",
    guesses: 10,
    wordlength: 10,
    date: "2024-11-21 14:32",
  },
  {
    svg: "/svg/cross.svg",
    name: "Igor",
    guesses: 9,
    wordlength: 19,
    date: "2024-11-21 14:32",
  },
  {
    svg: "/svg/cross.svg",
    name: "Julia",
    guesses: 5,
    wordlength: 12,
    date: "2024-11-21 14:32",
  },
];

testData.forEach((player) => {
  // Skapar en tr container
  let playerContainer = document.createElement("tr");

  // Skapar svg och img element och lägger till svg filen till det
  let svg = document.createElement("td");
  let img = document.createElement("img");
  img.src = player.svg;
  img.classList.add("checkmark");

  if (player.svg === "/svg/checkmark.svg") {
    img.alt = "en checkmark ikon för vinst";
  } else {
    img.alt = "ett kryss för förlust";
  }

  svg.append(img);
  // Lägger till svg till containern
  playerContainer.append(svg);

  // Lägger till namn, antal gissningar, ord längd och datum med tid på score boarden
  let playerProp = [player.name, player.guesses, player.wordlength, player.date];

  playerProp.forEach((prop) => {
    let elementTd = document.createElement("td");
    elementTd.innerText = prop;
    playerContainer.append(elementTd);
  });

  scoreList.append(playerContainer);
});
