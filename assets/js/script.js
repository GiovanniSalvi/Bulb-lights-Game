let computerSequence = [];
let userSequence = [];                                  
let level = 0;

const startButton = document.getElementById("startButton");
const sequenceLevel = document.querySelector(".waitmode");
const bulbContainer = document.getElementById("handleclick");          
const levelsCounter = document.querySelector(".counter");              
const endGame = document.querySelector(".success");
const gameLost = document.querySelector(".lost");
const audioClick = document.getElementById("audio");
const lostSound = document.getElementById("lost");

                     //global variabiles called//

function startGame() {
     console.log("start game - game has started")
    startButton.classList.add('hyde');
    sequenceLevel.classList.remove('hyde');
    levelsCounter.classList.remove('counter');                   
    gameLost.classList.add('hyde');
    nextTurn();
}


startButton.addEventListener('click', startGame);
bulbContainer.addEventListener('click', event => {
    var bulb = event.target.dataset.number; 
    console.log("bulbContainer - bulb: " + bulb)                            
                                                             
    if (bulb) manageTap(bulb);

});


function nextTurn() {
    level += 1;
    console.log("next turn - level: " + level)
    bulbContainer.classList.add('unclickable');
    sequenceLevel.classList.remove('hyde');
    levelsCounter.textContent = `Level ${level} of 10`;


    var nextSerie = [...computerSequence];
    nextSerie.push(chooseRandomBulb());
    console.log("next turn - nextSerie is : " + nextSerie)
    switchLight(nextSerie);

    computerSequence = [...nextSerie];
    console.log("next turn - computerSequence is: " + computerSequence)
    var timeoutInstance = setTimeout(() => {
        userTurn(level);
        clearTimeout(timeoutInstance);
    }, level * 1000 + 1000);
}

function chooseRandomBulb() {
    var bulbs = ['one', 'two', 'three', 'four', 'five', 'six'];
    var random = bulbs[Math.floor(Math.random() * bulbs.length)];
    console.log("chooseRandomBulb - random value : " + random)
    return random;
}

function switchLight(nextSerie) {
    nextSerie.forEach((number, index) => {
        var timeoutInstance = setTimeout(() => {
            activateBulb(number);
            console.log("switchLight - activeBulb : " + number)
            clearTimeout(timeoutInstance);
        }, (index + 1) * 1000);
    });
}

function activateBulb(number) {
    var bulb = document.querySelector(`[data-number='${number}']`);
        audioClick.play()
        bulb.classList.add('hyde')
    //bulb.classList.remove('bulb-off');//
    var timeoutInstance = setTimeout(() => {
        bulb.classList.remove('hyde');
        //bulb.classList.add('bulb-off');
        clearTimeout(timeoutInstance);
    }, 800);
}

function userTurn(level) {
    bulbContainer.classList.remove('unclickable');
    console.log("userTurn - userlevel: " + level)
    sequenceLevel.textContent = `Your turn:  Tap ${level}`;

}

function manageTap(bulb) {
    console.log("managetap - bulb is equal to: " + bulb)
    var index = userSequence.push(bulb) - 1;
    console.log("managetap - index is : " + index)
    var remainingTaps = computerSequence.length - userSequence.length;


    if (userSequence[index] !== computerSequence[index]) { 
        lostSound.play();                
        sequenceLevel.classList.add('hyde');
        levelsCounter.classList.add('counter');
        var timeoutInstance = setTimeout(() => {
        gameLost.classList.remove('hyde');
        clearTimeout(timeoutInstance);
    }, 300);
        var timeoutLostgame = setTimeout(() => {
        gameLost.classList.add('hyde'); 
        clearTimeout(timeoutLostgame);
    }, 5000);
        resetGame();
        return;
    }

    if (userSequence.length === computerSequence.length) {
        if (userSequence.length === 10) {
            levelsCounter.classList.add('counter')
            sequenceLevel.classList.add('hyde');
            endGame.classList.remove('hyde')
            var timeoutInstance = setTimeout(() => {
            endGame.classList.add('hyde')
            clearTimeout(timeoutInstance);
    }, 6000);
            resetGame();
            return;
    }

        userSequence = [];
        sequenceLevel.textContent = 'Well Done!';
        var timeoutInstance = setTimeout(() => {
            nextTurn();
            clearTimeout(timeoutInstance);
        }, 100);
        return;

    }

    sequenceLevel.textContent = `Your turn: Tap${
remainingTaps
}`;
}

function resetGame() {
    computerSequence = [];
    userSequence = [];
    level = 0;
    startButton.classList.remove('hyde');
    levelsCounter.classList.add('counter');
    bulbContainer.classList.add('unclickable');
    endGame.classList.add('hyde');
        
}

function play() {
        var audio = document.getElementById("audio");
        audio.play();
      }

function audio() {
        var sound = document.getElementById("lost");
        sound.audio();
}