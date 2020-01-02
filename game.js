const gameSummary = {
  numbers: 0,
  wins: 0,
  losses: 0,
  draws: 0
};

const game = {
  playerHand: "",
  aiHand: "",
  playerHandHTML: ""
};

const hands = document.querySelectorAll(".select img");

function handSelection() {
  game.playerHand = this.dataset.option;
  hands.forEach(hand => {
    hand.style.boxShadow = "";
  });
  this.style.boxShadow = "0 0 0 4px yellow";
}

hands.forEach(hand => {
  hand.addEventListener("click", handSelection);
});

function aiChoice() {
  return hands[Math.floor(Math.random() * hands.length)].dataset.option;
}
function checkResult(player, ai) {
  if (player === ai) {
    return "draw";
  } else if (
    (player === "papier" && ai === "kamień") ||
    (player === "kamień" && ai === "nożyczki") ||
    (player === "nożyczki" && ai === "papier")
  ) {
    return "win";
  } else {
    return "loss";
  }
  console.log(game.playerHand, game.aiHand);
}

function startGame() {
  if (game.playerHand === "") {
    return alert("Wybierz dłoń");
  }
  game.aiHand = aiChoice();
  const gameResult = checkResult(game.playerHand, game.aiHand);
  console.log(gameResult);
}

document.querySelector("button.start").addEventListener("click", startGame);
