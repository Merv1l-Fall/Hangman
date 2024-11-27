let playerScore = JSON.parse(localStorage.getItem("playerData"));

export function handleEndGame(result, name, word) {
	const endGame = document.querySelector("#endGame");
	endGame.classList.remove("hide-page");

	const div = document.createElement("div");
	div.classList.add("popup");

	const h1 = document.createElement("h1");
	const p = document.createElement("p");
	const p2 = document.createElement("p");

	const nav = document.createElement("nav");
	nav.classList.add("menu");

	const ul = document.createElement("ul");
	const li = document.createElement("li");
	li.classList.add("home-button");
	const li2 = document.createElement("li");
	li2.classList.add("score-button");

	if (result == true) {
		endGame.classList.add("victory");

		h1.innerText = `Grattis ${name}`;
		div.append(h1);

		p.innerText = `Ordet var: ${word}`;
		div.append(p);

		p2.innerText = `Antal gissningar: 1`;
		div.append(p2);

		li.innerText = "Hem";
		li2.innerText = "Rankning";

		ul.append(li);
		ul.append(li2);
		nav.append(ul);
		div.append(nav);

		endGame.append(div);
	} else {
		h1.innerText = `Tyvärr ${name}`;
		div.append(h1);

		p.innerText = `Ordet var: ${word}`;
		div.append(p);

		p2.innerText = `Antal gissningar: 6`;
		div.append(p2);

		li.innerText = "Hem";
		li2.innerText = "Rankning";

		ul.append(li);
		ul.append(li2);
		nav.append(ul);
		div.append(nav);

		endGame.append(div);
	}
}
