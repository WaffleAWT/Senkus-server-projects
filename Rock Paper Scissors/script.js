const buttons = document.querySelectorAll('button');
const resultText = document.getElementById('game-result');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.id;
        const computerChoice = generateComputerChoice();
        const winner = getWinner(playerChoice, computerChoice);
        displayResult(playerChoice, computerChoice, winner);
    });
});

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
