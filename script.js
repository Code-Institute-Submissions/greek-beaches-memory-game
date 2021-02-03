// --------------------- Variables

const cards = document.querySelectorAll('.card');
let timer = document.getElementById("timer");
let restartButton = document.getElementById("restart-button");

let cardOne, cardTwo;
let flipped = false;
let blockCards = false;
let cardMatches = [];
let counter;
let timeLeft;
let interval;
counter = 1;


// --------------------- Functions 

// Content loaded

document.addEventListener("DOMContentLoaded", function() {
    //Show welcome modal 
    shuffleImages();
    startTimer();
    timeLeft = 60;
});

// Restarts the game when you click on the Restart button

function restart() {
    shuffleImages();
    clearInterval(interval);
    startTimer();
    counter = 1;
    counter++;
    cards.style.transform = 'rotateY(0deg)';
}

// Starts the 60 seconds countdown

function startTimer() {
        var interval = setInterval(() => {
            timeLeft--;
            timer.innerText = timeLeft;
            if (timeLeft === 0) {
               clearInterval(interval);
            }
        }, 1000);
    }

// Flipping the cards 

function flip() {

    if (blockCards) return;

    if (this === cardOne) return;

    setTimeout(() => {
    this.style.transform = 'rotateY(180deg)';
    }, 120);

    document.getElementById('counter').innerText = counter;
    counter++;
   

    if(!flipped) {
        flipped = true;
        cardOne = this;

    } else {
        flipped = false;
        cardTwo = this;
        
        checkMatch();
    }

}

// Do the card's src's match?

function checkMatch() {
    if (cardOne.childNodes[1].src === cardTwo.childNodes[1].src) {

        match();
    
    } else {
        
        unMatch();
    }
}

// Cards Match so push them in the cardPair array

function match() {

    cardOne.removeEventListener('click', flip);
    cardTwo.removeEventListener('click', flip);

    cardMatches.push(cardOne);
    cardMatches.push(cardTwo);
}

// Cards do not match so unlfip them

function unMatch() {

    blockCards = true;

    setTimeout(() => {
    cardOne.style.transform = 'rotateY(0deg)';
    cardTwo.style.transform = 'rotateY(0deg)';

    reset();
    }, 1100);
}

// Resets the variables

function reset() {

    flipped = false;
    blockCards = false;
    cardOne = null;
    cardTwo = null;
}


// Shuffles the src links

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
            imgs[i].src = srcs[i];
        }
}


//Win game

// if (cardMatches.length = 16) {
//    showModal for win
//    stop timer
// }

// function gameOver()
// show modal for game over

// Event Listeners
cards.forEach(card => card.addEventListener('click', flip));
restartButton.addEventListener('click', restart);


