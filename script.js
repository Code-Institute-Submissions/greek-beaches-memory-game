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
    }
}

