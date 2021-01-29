// variables
const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


// Functions

// Flipping the cards 

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  secondCard = this;
  checkForMatch();
}

//Do the cards/data-numbers match?

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    
    isMatch ? disableCards() : unFlipCards();
}

// Cards match -> remove click eventListener so they are not clickable

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

// Cards do not match -> remove flip class so they flip back

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

// Event Listeners

cards.forEach(card => card.addEventListener('click', flipCard));