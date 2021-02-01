// variables
const cards = document.querySelectorAll('.card');
let cardOne, cardTwo;
//let cardPair = []
let flipped = false;


// Functions 

// Content loaded

document.addEventListener("DOMContentLoaded", function() {
    //Show welcome modal 
    shuffleImages();

    
});

// Flipping the cards 

function flipCard() {
    this.classList.add('flip');
   

    if(!flipped) {
        flipped = true;
        cardOne = this;
        console.log(cardOne);
        //cardPair.push(cardOne);
    } else {
        flipped = false;
        cardTwo = this;
        console.log(cardTwo);
        //cardPair.push(cardTwo);
        
        checkMatch();
    }

}

// Do the cards srcs match?

function checkMatch() {
    if (cardOne.childNodes[1].src === cardTwo.childNodes[1].src) {
    cardOne.removeEventListener('click', flipCard);
    cardTwo.removeEventListener('click', flipCard);

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
    let srcs = ['cards/apelles.jpg', 'cards/apelles.jpg', 'cards/gidaki.jpg', 'cards/gidaki.jpg', 'cards/kolona.jpg', 'cards/kolona.jpg', 
    'cards/stravnam.png', 'cards/stravnam.png', 'cards/myrtos.jpg', 'cards/myrtos.jpg', 'cards/navagio.jpg', 'cards/navagio.jpg', 
    'cards/porto-katsiki.jpg', 'cards/porto-katsiki.jpg', 'cards/voutoumi.jpg', 'cards/voutoumi.jpg'];
    let imgs = document.getElementsByTagName('img');
    let randomPos, temp;

    //cards.forEach((card) => {
        for (let i = srcs.length - 1; i > 0; i--) {
            randomPos = Math.floor(Math.random() * (i + 1));
            temp = srcs[i];
            srcs[i] = srcs[randomPos];
            srcs[randomPos] = temp;
            // cards.forEach(card => card.querySelector('img').setAttribute("src", srcs[i]));
            //card.childNodes[1].src = srcs[i]
        }
    // });
        for(let i=0; i<imgs.length; i++) {
            imgs[i].src = srcs[i]
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

