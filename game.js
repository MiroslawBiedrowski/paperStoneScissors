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
  this.style.boxShadow = "0 0 0 4px green";
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
    return "lose";
  }
  console.log(game.playerHand, game.aiHand);
}

function publishResult(player, ai, result) {
  document.querySelector('[data-summary="your-choice"]').textContent = player;
  document.querySelector('[data-summary="ai-choice"]').textContent = ai;
  document.querySelector(".numbers span").textContent = ++gameSummary.numbers;

  if (result === "win") {
    document.querySelector(".wins span").textContent = ++gameSummary.wins;
    document.querySelector('[data-summary="who-win"]').textContent = "wygrałeś";
    document.querySelector('[data-summary="who-win"]').style.color = "green";
  } else if (result === "lose") {
    document.querySelector(".losses span").textContent = ++gameSummary.losses;
    document.querySelector('[data-summary="who-win"]').textContent =
      "przegrałeś";
    document.querySelector('[data-summary="who-win"]').style.color = "red";
  } else {
    document.querySelector(".draws span").textContent = ++gameSummary.draws;
    document.querySelector('[data-summary="who-win"]').textContent = "remis";
    document.querySelector('[data-summary="who-win"]').style.color = "gray";
  }
}

function endGame() {
  document.querySelector(`[data-option=${game.playerHand}]`).style.boxShadow =
    "";
  game.playerHand = "";
}

function startGame() {
  if (game.playerHand === "") {
    return alert("Wybierz dłoń");
  }
  game.aiHand = aiChoice();
  const gameResult = checkResult(game.playerHand, game.aiHand);
  publishResult(game.playerHand, game.aiHand, gameResult);
  endGame();
}

document.querySelector("button.start").addEventListener("click", startGame);
