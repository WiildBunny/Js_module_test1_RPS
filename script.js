// DOM Elements
const btnRules = document.querySelector(".btn-rules");
const btnClose = document.querySelector(".btn-close");
const modal = document.querySelector(".rules-modal");
const gameSec = document.querySelector(".game");
const resultSec = document.querySelector(".result");
const choices = document.querySelectorAll(".choice");
const picked = document.querySelectorAll(".picked");
const resultWinner = document.querySelector(".result-winner");
const resultTitle = document.querySelector(".result-title");
const btnPlayAgain = document.querySelector(".play-again");
const computerScore = document.querySelector(".score-com");
const playerScore = document.querySelector(".score-player");
const btnNext = document.querySelector(".btn-next");
const hurryScreen = document.querySelector(".hurry-screen");
const reset = document.querySelector(".reset");

// Choices
const CHOICES = [
  { name: "rock", beats: "scissors" },
  { name: "scissors", beats: "paper" },
  { name: "paper", beats: "rock" },
];

// Initialize and Update Scores
function initializeScores() {
  let scores = JSON.parse(localStorage.getItem("scores"));
  if (!scores) {
    scores = { user: 0, computer: 0 };
    localStorage.setItem("scores", JSON.stringify(scores));
  }
  computerScore.innerText = scores.computer;
  playerScore.innerText = scores.user;
}

function updateScores(result) {
  let scores = JSON.parse(localStorage.getItem("scores"));
  if (result === "user") {
    scores.user += 1;
  } else if (result === "comp") {
    scores.computer += 1;
  }
  localStorage.setItem("scores", JSON.stringify(scores));
  computerScore.innerText = scores.computer;
  playerScore.innerText = scores.user;
}

// Initialize scores when page loads
initializeScores();

// Event Listener for Choices
choices.forEach((btn) =>
  btn.addEventListener("click", () => {
    const choiceName = btn.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  })
);

function choose(choice) {
  const rand = Math.floor(Math.random() * CHOICES.length);
  const pcChoice = CHOICES[rand];
  displayResult([choice, pcChoice]);
  displayWinner([choice, pcChoice]);
}

function displayResult(result) {
  picked.forEach((pick, idx) => {
    setTimeout(() => {
      pick.innerHTML = `
        <div class="choice ${result[idx].name}">
          <img src="./img/icon-${result[idx].name}.png" alt="${result[idx].name}">
        </div>
      `;
    }, idx * 1000);
  });

  gameSec.classList.add("hidden");
  resultSec.classList.remove("hidden");
}

function isWinner(result) {
  return result[0].beats === result[1].name;
}

function displayWinner(result) {
  setTimeout(() => {
    const userWins = isWinner(result);
    const aiWins = isWinner(result.reverse());

    if (userWins) {
      resultTitle.innerHTML = `You win<br><span>Against PC</span>`;
      picked[0].classList.add("winner");
      updateScores("user");
      btnNext.classList.remove("hidden");
    } else if (aiWins) {
      resultTitle.innerHTML = `You Lose<br><span>Against PC</span>`;
      picked[1].classList.add("winner");
      updateScores("comp");
      btnNext.classList.add("hidden");
    } else {
      resultTitle.innerHTML = `TIE UP`;
      btnNext.classList.add("hidden");
    }

    resultWinner.classList.remove("hidden");
    resultSec.classList.add("show-winner");

    btnPlayAgain.innerHTML = "Play Again";
  }, 1000);
}

function playAgain() {
  gameSec.classList.remove("hidden");
  resultSec.classList.add("hidden");

  picked.forEach((pick) => {
    pick.innerHTML = "";
    pick.classList.remove("winner");
  });

  resultTitle.innerText = "";
  resultWinner.classList.add("hidden");
  resultSec.classList.remove("show-winner");

  btnNext.classList.add("hidden");
  hurryScreen.classList.add("hidden");

  const confettiContainer = document.querySelector(".confetti");
  if (confettiContainer) {
    confettiContainer.remove();
  }
}

btnPlayAgain.addEventListener("click", playAgain);

btnNext.addEventListener("click", () => {
  hurryScreen.classList.remove("hidden");
  resultSec.classList.add("hidden");
  addConfetti();
});

reset.addEventListener("click", () => {
  hurryScreen.classList.add("hidden");
  playAgain();
});

btnRules.addEventListener("click", () => {
  modal.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modal.classList.toggle("show-modal");
});

function addConfetti() {
  const confettiContainer = document.createElement("div");
  confettiContainer.classList.add("confetti");
  document.body.appendChild(confettiContainer);

  for (let i = 0; i < 100; i++) {
    const confettiPiece = document.createElement("div");
    confettiPiece.classList.add("confetti-piece");

    const colors = ["#ffcc00", "#ff5733", "#33ff57", "#3385ff", "#ff33a8"];
    confettiPiece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    confettiContainer.appendChild(confettiPiece);
  }

  setTimeout(() => {
    document.body.removeChild(confettiContainer);
  }, 4000);
}
