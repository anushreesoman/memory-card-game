const cards = document.querySelectorAll(".card");

cards.forEach((card) => card.addEventListener("click", flipCard));

let cardFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
let combosFound = 0;

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

  combosFound +=1;
  
  if (combosFound === 8){
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

function winGame(){
  setTimeout(() => {
    alert('You Win!');
    cards.forEach(card => {card.classList.remove('flip'); card.addEventListener("click", flipCard)});
    shuffle();
  }, 1200);
}

function shuffle() {
  cards.forEach(card => {
    let posit = Math.floor(Math.random() *12);
    card.style.order = posit;
  })
}

(function loaded() {
  shuffle();
})();


