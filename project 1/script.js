const gameBoard = document.querySelector('.game-board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
const pvpButton = document.getElementById('pvpButton');
const pveButton = document.getElementById('pveButton');
const aiDifficulty = document.getElementById('aiDifficulty');
const easyButton = document.getElementById('easyButton');
const hardButton = document.getElementById('hardButton');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let isAIMode = false;
let isHardAI = false;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== '' || !gameActive) return;

    makeMove(cellIndex);

    if (isAIMode && gameActive && currentPlayer === 'O') {
        setTimeout(() => {
            makeAIMove();
        }, 500);
    }
}

function makeMove(cellIndex) {
    gameState[cellIndex] = currentPlayer;
    cells[cellIndex].textContent = currentPlayer;
    cells[cellIndex].classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
        gameActive = false;
        status.textContent = `Player ${currentPlayer} wins!`;
        return;
    }

    if (checkDraw()) {
        gameActive = false;
        status.textContent = "Game ended in a draw!";
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function makeAIMove() {
    if (!gameActive) return;

    let move;
    if (isHardAI) {
        move = findBestMove();
    } else {
        move = findRandomMove();
    }

    makeMove(move);
}

function findRandomMove() {
    const emptyCells = gameState
        .map((cell, index) => cell === '' ? index : null)
        .filter(cell => cell !== null);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function findBestMove() {
    let bestScore = -Infinity;
    let bestMove = 0;

    for (let i = 0; i < 9; i++) {
        if (gameState[i] === '') {
            gameState[i] = 'O';
            let score = minimax(gameState, 0, false);
            gameState[i] = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

function minimax(board, depth, isMaximizing) {
    if (checkWin()) {
        return isMaximizing ? -1 : 1;
    }
    if (checkDraw()) {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return gameState.every(cell => cell !== '');
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });

    if (isAIMode && currentPlayer === 'O') {
        setTimeout(() => {
            makeAIMove();
        }, 500);
    }
}

function setGameMode(mode) {
    isAIMode = mode === 'ai';
    aiDifficulty.classList.toggle('hidden', !isAIMode);
    pvpButton.classList.toggle('active', !isAIMode);
    pveButton.classList.toggle('active', isAIMode);
    restartGame();
}

function setAIDifficulty(difficulty) {
    isHardAI = difficulty === 'hard';
    easyButton.classList.toggle('active', !isHardAI);
    hardButton.classList.toggle('active', isHardAI);
    restartGame();
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
pvpButton.addEventListener('click', () => setGameMode('pvp'));
pveButton.addEventListener('click', () => setGameMode('ai'));
easyButton.addEventListener('click', () => setAIDifficulty('easy'));
hardButton.addEventListener('click', () => setAIDifficulty('hard')); 