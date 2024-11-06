const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const messageDiv = document.getElementById('message');

let currentPlayer = 'X';
let gameActive = true;
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Empty board

// Winning combinations
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Start a new game
function startNewGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto';
    });
    messageDiv.textContent = '';
}

// Handle a cell click
function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (gameBoard[index] !== '' || !gameActive) return; // If cell is already filled or game is over

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        messageDiv.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        cells.forEach(cell => cell.style.pointerEvents = 'none'); // Disable further clicks
    } else if (gameBoard.every(cell => cell !== '')) {
        messageDiv.textContent = 'It\'s a draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Check if the current player has won
function checkWinner() {
    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', startNewGame);

// Initialize the game
startNewGame();
