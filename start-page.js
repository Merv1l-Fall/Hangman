const rulesClose = document.querySelector('#cross')
const rulesButton = document.querySelector('#rules-button')
const testHidden = document.querySelector('.hidden')
const rulesBox = document.querySelector('#rules')
const rulesOverlay = document.querySelector('#rules-overlay')


function showRules(){
	rulesBox.classList.add('visible')
	rulesOverlay.classList.add('visible')
}

function hideRules(){
	rulesBox.classList.remove('visible')
	rulesOverlay.classList.remove('visible')
}


rulesButton.addEventListener('click', () => {
	showRules()
})
rulesClose.addEventListener('click', () => {
	hideRules()
})