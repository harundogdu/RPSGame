/* consts */
const myChoice = document.querySelectorAll(".diceOne  img");
const playerChoice = document.getElementById("playerChoice");
const computerChoice = document.getElementById("computerChoice");
const btnFight = document.getElementById("btnFight");
const imgArray = ["rock.png", "paper.png", "scissors.png"];
const gameText = document.getElementById("gameText");
const counterDiv = document.querySelectorAll(".counter h3");
let counterOne = 0;
let counterTwo = 0;

/* choose element  */
for (let index = 0; index < myChoice.length; index++) {
  let element = myChoice[index];
  element.addEventListener("click", getMyChoice);
}

/* functions */
function getMyChoice(item) {
  playerChoice.setAttribute("src", item.target.getAttribute("src"));
}

function lastOfGame(icon, title, text) {
  swal({
    title: title,
    text: text,
    icon: icon,
    button: "Ok",
  }).then(() => {
    window.location.reload();
  });
}

function random() {
  let randomEl =
    "images/" + imgArray[Math.floor(Math.random() * imgArray.length)];
  if (computerChoice.getAttribute("src") !== randomEl) {
    return randomEl;
  } else {
    return "images/" + imgArray[Math.floor(Math.random() * imgArray.length)];
  }
}

function checkSelections(paramOne, paramTwo) {
  let playerOneChoice = playerChoice.getAttribute("src");
  let playerTwoChoice = computerChoice.getAttribute("src");

  playerOneChoice = playerOneChoice.split("/");
  playerTwoChoice = playerTwoChoice.split("/");

  playerOneChoice = playerOneChoice[1].split(".");
  playerTwoChoice = playerTwoChoice[1].split(".");

  playerOneChoice = playerOneChoice[0];
  playerTwoChoice = playerTwoChoice[0];

  if (playerOneChoice == paramOne && playerTwoChoice == paramTwo) return true;
  else return false;
}

/* fight button */
btnFight.addEventListener("click", () => {
  gameText.innerText = "";
  computerChoice.setAttribute("src", random());

  if (
    checkSelections("paper", "rock") ||
    checkSelections("rock", "scissors") ||
    checkSelections("scissors", "paper")
  ) {
    gameText.innerText = "Player Crushed Computer";
    counterOne++;
    counterDiv[0].innerHTML = counterOne;
  } else if (
    checkSelections("scissors", "rock") ||
    checkSelections("rock", "paper") ||
    checkSelections("paper", "scissors")
  ) {
    gameText.innerText = "Computer did not show mercy to Player";
    counterTwo++;
    counterDiv[1].innerHTML = counterTwo;
  } else {
    gameText.innerText = "The fight ended in a draw.";
  }

  if (counterOne == 5) {
    lastOfGame("success", "Congratulations", "You win against the Computer");
  }
  if (counterTwo == 5) {
    lastOfGame("error", "You Lost", "You lost against the Computer");
  }
});
