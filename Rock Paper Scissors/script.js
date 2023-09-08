const buttons = document.querySelectorAll('button');
const resultText = document.getElementById('game-result');
const playerScoreText = document.getElementById('player-score');
const computerScoreText = document.getElementById('computer-score');

const winSound = document.getElementById('winSound');
const loseSound = document.getElementById('loseSound');
const tieSound = document.getElementById('tieSound');

let playerScore = 0;
let computerScore = 0;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.id;
        const computerChoice = generateComputerChoice();
        const winner = getWinner(playerChoice, computerChoice);
        
        if (winner === 'You win!') {
            playerScore++;
            playWinSound();
        } else if (winner === 'Computer wins!') {
            computerScore++;
            playLoseSound();
        } else {
            playTieSound();
        }

        displayResult(playerChoice, computerChoice, winner);
        displayScores();
    });
});

function playWinSound() {
    winSound.play();
}

function playLoseSound() {
    loseSound.play();
}

function playTieSound() {
    tieSound.play();
}

function generateComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function getWinner(player, computer) {
    if (player === computer) return 'It\'s a tie!';
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'You win!';
    }
    return 'Computer wins!';
}

function displayResult(player, computer, winner) {
    resultText.textContent = `You chose ${player}, Computer chose ${computer}. ${winner}`;
}

function displayScores() {
    playerScoreText.textContent = `Player Score: ${playerScore}`;
    computerScoreText.textContent = `Computer Score: ${computerScore}`;
}
