const choices = ['ROCK', 'PAPER', 'SCISSORS'];

// Helper funciton to determine index for computer choice.
function generateIndex(listLength) {
    return Math.floor(Math.random() * listLength);
}

// Computer makes selection.
function computerPlay() {
    let randomIndex = generateIndex(3);
    return choices[randomIndex];
}

// Initialize score to 0.
let playerScore = 0;
let computerScore = 0;

function playRound(playerSelection, computerSelection) {
    // Storing round result messages.
    const winRoundMessage = `You win! ${playerSelection} beats ${computerSelection}.`;
    const loseRoundMessage = `You lose! ${computerSelection} beats ${playerSelection}.`;
    const tieRoundMessage = `Tie! You both chose ${playerSelection}`;
    
    // If selection is the same, they tie.
    if (playerSelection === computerSelection) {
        showRoundResult(tieRoundMessage);
        return;
    }

    // Switch to determine if player wins/loses.
    switch (playerSelection) {
        case 'ROCK':
            if (computerSelection === 'PAPER') {
                updateScore(false);
                showRoundResult(loseRoundMessage);
            } else {
                updateScore(true);
                showRoundResult(winRoundMessage);
            }
            break;

        case 'PAPER':
            if (computerSelection === 'SCISSORS') {
                updateScore(false);
                showRoundResult(loseRoundMessage);
            } else {
                updateScore(true);
                showRoundResult(winRoundMessage);
            }
            break;
        
        case 'SCISSORS':
            if (computerSelection === 'ROCK') {
                updateScore(false);
                showRoundResult(loseRoundMessage);
            } else {
                updateScore(true);
                showRoundResult(winRoundMessage);
            }
            break;

        default:
           console.log('Incorrect input.')
    }

    checkIfGameWinner();
}

// Storing score & results divs.
const score = document.querySelector('#score');
const results = document.querySelector('#results');

// Adding event listeners for selection buttons to play round.
const buttons = document.querySelectorAll('.selection-button');
buttons.forEach(button => button.addEventListener('click', () => {
    playRound(button.textContent, computerPlay());
}));

// Functions to run if you win / lose the round.
function updateScore(playerWinsRound) {
    if (playerWinsRound) {
        playerScore++;
    } else {
        computerScore++;
    }
    
    score.textContent = playerScore + ' / ' + computerScore;
}

function checkIfGameWinner() {
    if (playerScore === 5) {
        showGameResult(true);
    } else if (computerScore === 5) {
        showGameResult(false);
    } else {
        console.log('No winner yet...');
    }
}

function showRoundResult(roundResultMessage) {
    // Appending round results to the results div.
    const p = document.createElement('p');
    p.textContent += roundResultMessage;
    results.prepend(p);
}

function showGameResult(playerWins) {
    // Disabling seleciton buttons so play can't continue.
    buttons.forEach(button => button.disabled = true);

    // Adding a button to retry & reset the score.
    retryContainer.appendChild(retryButton);

    // Displaying game results.
    const gameResult = document.createElement('p');
    if (playerWins) {
        gameResult.textContent = 'You won the game! :D'
    } else {
        gameResult.textContent = 'You lost the game :('
    }
    results.prepend(gameResult);
}

// Adding retry button variables.
const retryContainer = document.querySelector('#retry-container');
const retryButton = document.createElement('button');
retryButton.textContent = 'RETRY';
retryButton.addEventListener('click', () => resetGame());


function resetGame() {
    buttons.forEach(button => button.disabled = false);
    playerScore = 0;
    computerScore = 0;
    score.textContent = '0 / 0';

    // Removing p elements from results div.
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }

    retryContainer.removeChild(retryButton);
    console.log('Game has been reset');
}
