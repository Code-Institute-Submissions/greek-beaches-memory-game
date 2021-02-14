// Inspiration for the shuffle function https://www.youtube.com/watch?v=QrTCHHhoUQU&ab_channel=codeTonight

// Inspiration on the flip, match and reset functions https://www.youtube.com/watch?v=ZniVgo8U7ek&ab_channel=freeCodeCamp.org


const cards = document.querySelectorAll('.card');
let timer = document.getElementById("timer");
let restartButton = document.getElementById("restart-button");
let musicBtn = document.getElementById('music-btn');
let musicIcon = document.getElementById('music-icon');

let cardOne, cardTwo;
let flipped = false;
let blockCards = false;
let cardMatches = [];
let counter;
let timeLeft;
let interval;
counter = 1;


/**
 * Content loaded
 */
document.addEventListener("DOMContentLoaded", function() { 
    shuffleImages();
    startTimer();
    timeLeft = 60;
});

 
/**
 * Refreshes the page when clicked on the restart button
 */
function restart() {
    location.reload();
}

// --------------------- Music

const bgAudio = new Audio('assets/audio/greek.mp3');

/**
 * checks if the music is on or off
 */
function bgMusic() {
    let iconClasses = Array.from(musicIcon.classList);
    if (iconClasses.includes("fa-play")) {
        musicIcon.classList.remove("fa-play");
        musicIcon.classList.add("fa-volume-mute");
        startBgMusic();
    } else {
        musicIcon.classList.remove("fa-volume-mute");
        musicIcon.classList.add("fa-play");
        stopMusic();
    }
}

/**
 * functions to play the background music and sound effects
 */
function startBgMusic() {
    bgAudio.play();
    bgAudio.volume = 0.3;
    bgAudio.loop = true;
}

function stopMusic() {
    bgAudio.pause();
}

function flipSound() {
    const flipSound = new Audio('assets/audio/card-flip.mp3');
    flipSound.play();
}

function gameOverSound() {
    const gameOverAudio = new Audio('assets/audio/lose.mp3');
    gameOverAudio.play();
}

function winSound() {
    const winAudio = new Audio('assets/audio/win.mp3');
    winAudio.play();
}


/**
 * Starts the 60 seconds countdown
 */
function startTimer() {
        interval = setInterval(() => {
            timeLeft--;
            timer.innerText = timeLeft;
            if (timeLeft === 0) {
               clearInterval(interval);
               gameOver();
            }
        }, 1000);
    }


/**
 * Flipping the cards 
 */
function flip() {
    
    flipSound();

    if (blockCards) return;

    if (this === cardOne) return;

    let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

    if (isMobile) {
        setTimeout(() => {
            this.style.transform = 'rotateY(180deg)';
        }, 500);
    }

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


/**
 * Do the card's src's match?
 */
function checkMatch() {
    if (cardOne.childNodes[1].src === cardTwo.childNodes[1].src) {

        match();
    
    } else {
        
        unMatch();
    }
}


/**
 * Cards match, so push them in the cardPair array
 */
function match() {

    cardOne.removeEventListener('click', flip);
    cardTwo.removeEventListener('click', flip);

    cardMatches.push(cardOne);
    cardMatches.push(cardTwo);
    
    if (cardMatches.length === 16) {
    winGame();
    }
}


/**
 * Cards do not match, so unlfip them
 */
function unMatch() {

    blockCards = true;

    setTimeout(() => {
    cardOne.style.transform = 'rotateY(0deg)';
    cardTwo.style.transform = 'rotateY(0deg)';

    reset();
    }, 1100);
}


/**
 * Resets the variables
 */
function reset() {

    flipped = false;
    blockCards = false;
    cardOne = null;
    cardTwo = null;
}



/**
 * Shuffles the src links
 */
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

 
/**
 * Shows a modal when the game is won
 */
function winGame() { 
    setTimeout(() => {       
        stopMusic();
        $('#win-modal').modal('show');
        document.getElementById("win-text").insertAdjacentHTML('beforeend', `You have won the game with ${counter} flips and ${timeLeft} seconds left!`);
        clearInterval(interval);
        winSound();
    }, 1000);
}


/**
 * Shows a modal when the game is lost
 */
function gameOver() {
    setTimeout(() => {
        stopMusic();
        gameOverSound();
        if ($('#win-modal').modal('hide')) {
        $('#game-over-modal').modal('show');
        }
    }, 700);
}


/**
 * Event Listeners
 */
cards.forEach(card => card.addEventListener('click', flip));
restartButton.addEventListener('click', restart);
musicBtn.addEventListener('click', bgMusic);


