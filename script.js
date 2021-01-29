// variables

const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;

// Event Listeners

cards.forEach(card => card.addEventListener('click', flipCard))

// Functions

// Flipping the cards 

function flipCard() {
    this.classList.add('flip');

    if(!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
    } else {
        // second card
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch();
    }
}

//Do the cards/data-numbers match?

function checkForMatch() {
    let isMatch = firstCard.dataset.number === secondCard.dataset.number;
    
    isMatch ? disableCards() : unFlipCards();
}

// Cards match -> remove click eventListener so they are not clickable

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

// Cards do not match -> remove flip class so they flip back

function unFlipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    }, 1500);
}
