//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

//Global variables
let randomNumber;
let attempts = 0;
let MAX_ATTEMPTS = 7;
let wins = 0;
let losses = 0;

initializeGame();

function initializeGame() {
    // generate random num
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber);

    //reset attempts
    attempts = 0;

    //display remaining attempts
    document.querySelector("#remaining_attempts").textContent = (MAX_ATTEMPTS - attempts);

    //hiding the Reset button (set display: none)
    document.querySelector("#resetBtn").style.display = "none";

    //show guess button
    document.querySelector("#guessBtn").style.display = "inline";

    // get playerguess element
    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus(); //adding focus to textbox
    playerGuess.value = ""; //clearing textbox

    let feedback = document.querySelector("#feedback");
    feedback.textContent = ""; //clear feedback

    //clear prev guesses
    document.querySelector("#guesses").textContent = "";

    displayScore();
}

function checkGuess() {
    //clear feedback div
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    //retrive guess
    let guess = document.querySelector("#playerGuess").value;

    //if guess is invalid
    if(guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    //update attempt count
    attempts++;
    //display remaining attempts
    document.querySelector("#remaining_attempts").textContent = (MAX_ATTEMPTS - attempts);

    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";
    //guess was correct
    if (guess == randomNumber) {
        wins++;
        feedback.textContent = "You guessed it! You won!";
        feedback.style.color = "darkgreen";
        gameOver();
    } else {  // incorrect guess
        document.querySelector("#guesses").textContent += (guess + " ");
        if (attempts == MAX_ATTEMPTS) {
            losses++;
            feedback.textContent = "Sorry, you lost!";
            feedback.style.color = "red";
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
        } else {
            feedback.textContent = "Guess was low";
        }
    }

    //refocus textbox
    let textbox = document.querySelector("#playerGuess");
    textbox.value = "";
    textbox.focus();
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; //hides guess button
    resetBtn.style.display = "inline"; //display reset button
    displayScore(); //display score
}

function displayScore() {
    let score = document.querySelector("#score");
    score.textContent = ("Wins: " + wins + " ◆ Losses: " + losses);
}