const cards = document.querySelectorAll(".card");

cards.forEach((card) => card.addEventListener("click", flipCard));

let cardFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
let combosFound = 0;

//Game play
function flipCard() {
  if (this === firstCard) return; //prevents same card being clicked twice

  if (lockBoard) return;

  this.classList.add("flip");

  cardFlips += 1;
  flipCount.innerHTML = `${cardFlips}`;

  if (!cardFlipped) {
    //Store first card flipped
    cardFlipped = true;
    firstCard = this;

    return;
  }

  //Store second card flipped
  cardFlipped = false;
  secondCard = this;

  checkMatched();
}

function checkMatched() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  //if cards match prevent them being clicked again
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  combosFound += 1;

  if (combosFound === 8) {
    winGame();
  }
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1200);
}

function resetBoard() {
  [cardFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach((card) => {
    let posit = Math.floor(Math.random() * 12);
    card.style.order = posit;
  });
}

(function loaded() {
  shuffle();
})();

//Flip Counter for cards
const flipCount = document.getElementById("flip-count");
let cardFlips = 0;

//Timer for game
const countdown = document.getElementById("countdown");

const startingMin = 5;
let time = startingMin * 60;

function updateCountdown() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  countdown.innerHTML = `${minutes}:${seconds}`;
  if (minutes === 0 && seconds == 00 && combosFound !== 8) {
    countdown.innerHTML = `0:00`;
    resetCountdown();
    setTimeout(() => {
      //console.log("Now its 0");
      loseGame();
    }, 1000);
  } else if (minutes >= 0) {
    time--;
  }
}
setInterval(updateCountdown, 1000);

//Win-loss decision and game reset
function winGame() {
  setTimeout(() => {
    shuffle();
    alert("You Win!");
    resetCounter();
    cards.forEach((card) => {
      card.classList.remove("flip");
      card.addEventListener("click", flipCard);
    });
  }, 1000);
  resetCountdown();
}

function resetCountdown() {
  time = startingMin * 60;
  setTimeout(() => {
    updateCountdown();
  }, 1000);
}

function resetCounter() {
  cardFlips = 0;
  flipCount.innerHTML = `${cardFlips}`;
}

function loseGame() {
  alert("Time is up!");
  resetCounter();
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });
  setTimeout(() => {
    shuffle();
  }, 1000);
}
