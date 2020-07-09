const cards = document.querySelectorAll(".card");

cards.forEach((card) => card.addEventListener("click", flipCard));

let cardFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    
  if (lockBoard) return;

  this.classList.add("flip");

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

(function shuffle() {
  cards.forEach(card => {
    let posit = Math.floor(Math.random() *12);
    card.style.order = posit;
  })
})();


