export function handleEndGame(result, name, guesses, word) {
  const endGame = document.querySelector("#endGame");
  endGame.classList.remove("hide-page");
  const containerDiv = document.querySelector(".popup");
  const h1 = document.querySelector(".h1");
  const p = document.querySelector(".p");
  const p2 = document.querySelector(".p2");

  if (result == true) {
    endGame.classList.add("victory");

    h1.innerText = `Grattis ${name}`;
    containerDiv.append(h1);

    p.innerText = `Ordet var: ${word}`;
    containerDiv.append(p);

    p2.innerText = `Antal gissningar: ${guesses}`;
    containerDiv.append(p2);

    endGame.append(containerDiv);
  } else {
    h1.innerText = `Tyvärr ${name}`;
    containerDiv.append(h1);

    p.innerText = `Ordet var: ${word}`;
    containerDiv.append(p);

    p2.innerText = `Antal gissningar: ${guesses}`;
    containerDiv.append(p2);

    endGame.append(containerDiv);
  }
}
