
export function handleEndGame(result, name, guesses, word) {
  const endGame = document.querySelector("#endGame");
  endGame.classList.remove("hide-page");
  const endGameDialog = document.querySelector(".popup");
  const h1 = document.querySelector(".h1");
  const p = document.querySelector(".p");
  const p2 = document.querySelector(".p2");

  if (result == true) {
    endGame.classList.add("victory");

    h1.innerText = `Grattis ${name}`;
    endGameDialog.append(h1);

    p.innerText = `Ordet var: ${word}`;
    endGameDialog.append(p);

    p2.innerText = `Antal gissningar: ${guesses}`;
    endGameDialog.append(p2);

    endGame.append(endGameDialog);
  } else {
    h1.innerText = `Tyvärr ${name}`;
    endGameDialog.append(h1);

    p.innerText = `Ordet var: ${word}`;
    endGameDialog.append(p);

    p2.innerText = `Antal gissningar: ${guesses}`;
    endGameDialog.append(p2);

    endGame.append(endGameDialog);
  }
}
