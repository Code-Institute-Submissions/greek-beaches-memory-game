// variables
const cards = document.querySelectorAll('.card');
let cardOne, cardTwo;
let flipped = false;
let cardMatches = [];
let blockCards = false;


// Functions 

// Content loaded

document.addEventListener("DOMContentLoaded", function() {
    //Show welcome modal 
    shuffleImages();

    
});

// Flipping the cards 

function flipCard() {
    if (blockCards) return;
    if (this === cardOne) return;
    this.classList.add('flip');
   

    if(!flipped) {
        flipped = true;
        cardOne = this;

    } else {
        flipped = false;
        cardTwo = this;
        
        checkMatch();
    }

}

// Do the cards srcs match?

function checkMatch() {
    if (cardOne.childNodes[1].src === cardTwo.childNodes[1].src) {

    cardOne.removeEventListener('click', flipCard);
    cardTwo.removeEventListener('click', flipCard);

    cardMatches.push(cardOne);
    cardMatches.push(cardTwo);
    console.log(cardMatches);

    } else {
        blockCards = true;

        setTimeout(() => {
        cardOne.classList.remove('flip');
        cardTwo.classList.remove('flip');

        reset();
        }, 1300);
    }

}

// Resets the variables

function reset() {

    flipped = false;
    blockCards = false;
    cardOne = null;
    cardTwo = null;
}


// Shuffles the images

function shuffleImages() {
    let srcs = ['cards/apelles.jpg', 'cards/apelles.jpg', 'cards/gidaki.jpg', 'cards/gidaki.jpg', 'cards/kolona.jpg', 'cards/kolona.jpg', 
    'cards/stravnam.png', 'cards/stravnam.png', 'cards/myrtos.jpg', 'cards/myrtos.jpg', 'cards/navagio.jpg', 'cards/navagio.jpg', 
    'cards/porto-katsiki.jpg', 'cards/porto-katsiki.jpg', 'cards/voutoumi.jpg', 'cards/voutoumi.jpg'];
    let imgs = document.getElementsByTagName('img');
    let randomPos, temp;

        for (let i = srcs.length - 1; i > 0; i--) {
            randomPos = Math.floor(Math.random() * (i + 1));
            temp = srcs[i];
            srcs[i] = srcs[randomPos];
            srcs[randomPos] = temp;
        }

        for(let i = 0; i < imgs.length; i++) {
            imgs[i].src = srcs[i]
        }
}


//Win game

// if (cardMatches.length = 16) {
//    showModal for win
// }

//Game over

//if (timer = 0) {
// show modal for game over
// }

// Event Listeners
cards.forEach(card => card.addEventListener('click', flipCard));

