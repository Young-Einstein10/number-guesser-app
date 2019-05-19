/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of the guesses remaining
- Notify player of the correct answer if lose
- Let player chose to play again
*/

//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elelments
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');


//Assign Ui min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play Again Event Listener
game.addEventListener('mousedown', function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

//Listen for Guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    //Validate
    if (isNaN(guess) || guess < min || guess > max ) {
        setMessage(`Pls enter a number between ${min} and ${max}`, 'red');        
    } 
        //Check if number is correct
        else if (guess === winningNum) {
            //Game Over - Won 
        gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else {
        //Wrong Number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            //GAme over - Lost
            gameOver(false, `Game Over, You lost. The Correct Number was ${winningNum}`);
            // //Disable Input
            // guessInput.disabled = true;
            // //change border color
            // guessInput.style.borderColor = 'red';
            // //Set Message
            // setMessage(`Game Over, You lost. The Correct Number was ${winningNum}`, 'red');
        } else {
            //Game continues - answer wrong

            //change border color
            guessInput.style.borderColor = 'red';

            //clear input
            guessInput.value = '';

            //Tell user its wrong number
            setMessage(`${guess} is not correct. You have ${guessesLeft} guesses left.`, 'red');
        }
    }
});


//Game Over 
function gameOver(won, msg){
    let color;
    won ===true ? color = 'green' : color = 'red';

    //Disable Input
    guessInput.disabled = true;
    //change border color
    guessInput.style.borderColor = color;
    //Set text color
    message.style.color =  color;
    //Set Message
    setMessage(msg);

    //Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//Get Winning Number
function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}

//Set Message
function setMessage(msg,color) {
    message.style.color = color; 
    message.textContent = msg;
}
