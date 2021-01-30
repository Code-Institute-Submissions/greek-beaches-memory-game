// variables
const cards = document.querySelectorAll('.card');
let cardOne, cardTwo;
cardPair = [cardOne, cardTwo];
flipped = false;

// Functions 

// Content loaded

document.addEventListener("DOMContentLoaded", function() {
    //Show welcome modal 
    shuffleImages()

    
});

// Flipping the cards 

function flipCard() {
    this.classList.add("flip");

    if(!flipped) {
        flipped = true;
        cardOne = this.querySelector('img').src;
    } else {
        flippedCard = false;
        cardTwo = this.querySelector('img').src;
        
        checkMatch();
    }

}

// Do the cards srcs match?

function checkMatch() {
    if (cardPair[0] === cardPair[1]) {

    cardOne.removeEventListener('click', flipCard);
    cardTwo.removeEventListener('click', flipCard);

    //matchCounter = i++

    } else {

        setTimeout(() => {
        cardOne.classList.remove('flip');
        cardTwo.classList.remove('flip');
        }, 1300);
    }

}

// function to lock the board before unFlip 


// Shuffles the images

function shuffleImages() {
    let srcs = ['cards/apelles.jpg', 'cards/apelles.jpg', 'cards/gidaki.jpg', 'cards/gidaki.jpg', 'cards/kolona.jpg', 'cards/kolona.jpg', 'cards/stravnam.png', 'cards/stravnam.png', 'cards/myrtos.jpg', 'cards/myrtos.jpg', 'cards/navagio.jpg', 'cards/navagio.jpg', 'cards/porto-katsiki.jpg', 'cards/porto-katsiki.jpg', 'cards/voutoumi.jpg', 'cards/voutoumi.jpg'];
    let randomPos, temp;

    for (let i = srcs.length - 1; i > 0; i--) {
        randomPos = Math.floor(Math.random() * (i + 1));
        temp = srcs[i];
        srcs[i] = srcs[randomPos];
        srcs[randomPos] = temp;
        cards.forEach(card => card.querySelector('img').setAttribute("src", srcs[i]));
    }
}

//Win game

// if (matchCounter = 8) {
//    showModal for win
// }

//Game over

//if (timer = 0) {
// show modal for game over
// }

// Event Listeners
cards.forEach(card => card.addEventListener('click', flipCard));

