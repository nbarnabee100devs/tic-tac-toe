document.querySelector(".initialize").addEventListener("click", initializeGame);
const buttonSet = document.querySelectorAll('.game-square');
const buttonArray = Array.from(buttonSet);
let playerSet = [];
let computerSet = [];
let choiceArray = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const victorySets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]]
let playerScore = 0;
let computerScore = 0;
document.querySelector(".score-board").textContent = `Player: ${playerScore},  Computer: ${computerScore}`;


// Reset the game board and set eventListeners

function initializeGame() {
  document.querySelector("h2").textContent = "";
  buttonArray.forEach(element => element.classList.add("ready"));
  buttonArray.forEach(element => element.addEventListener("click", setPlayerChoice));
  buttonArray.forEach(element=>{
    if (element.classList.contains("x")) {
      element.classList.remove("x")
    } 
    if (element.classList.contains("o")) {
      element.classList.remove("o")
    }
  });
}

// Check to see if the player has made a valid choice; if yes, do various things, check for a win condition, and trigger the computer choice (this function probably does too much)

function setPlayerChoice(click) {
  const clicked=click.target;
  let chosen = choiceArray.indexOf(+clicked.value);
  if (choiceArray.includes(+clicked.value)) {
    clicked.classList.add("x");
    playerSet.push(+clicked.value);
    choiceArray.splice(chosen, 1);
    evaluateSet(playerSet, "Player");
  }
  else return;
}

// Computer picks randomly from the values present in choiceArray (In the future, I would like to stick some basic logic in here to let the computer make more informed decisions)

function setComputerChoice() {
  let randomNum = Math.floor(Math.random() * choiceArray.length);
  let compChoice = choiceArray[randomNum];
  computerSet.push(compChoice);
  let compTarget = document.querySelector(`[value = '${compChoice}']`);
  compTarget.classList.add("o");
  choiceArray.splice(randomNum, 1);
  evaluateSet(computerSet, "Computer");
}


// Check for a win condition 

function evaluateSet(set, player) {
  for (i = 0; i < victorySets.length; i++) {
    if (victorySets[i].every(num => set.includes(num))) {
      document.querySelector("h2").textContent = `${player} wins!`;
      if (player === "Player") {
        playerScore += 1;
      } else computerScore += 1;
      document.querySelector(".score-board").textContent = `Player: ${playerScore},  Computer: ${computerScore}`;
      gameIdle();
      return;
    }
  }
  if (choiceArray.length === 0) {
    document.querySelector("h2").textContent = "Tie game!";
    gameIdle();
    return;
  }
  if (player === "Player") {
    setComputerChoice();
  }
  return;
}

// Prepare the game for restart

function gameIdle(player) {
  buttonArray.forEach(element => element.removeEventListener("click", setPlayerChoice));
  buttonArray.forEach(element => element.classList.remove("ready"));
  playerSet = [];
  computerSet = [];
  choiceArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
}