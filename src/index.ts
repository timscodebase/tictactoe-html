
const statusDisplay = document.querySelector('.game_status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let X_wins = localStorage.getItem('X_wins') || 0;
let O_wins = localStorage.getItem('O_wins') || 0;
const x_score = document.querySelector('.x_score');
const o_score = document.querySelector('.o_score');

const winningMessage = () => `Player ${currentPlayer === 'X' ? `<span class="X">${currentPlayer}</span>` : `<span class="O">${currentPlayer}</span>`} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer === 'X' ? '<span class="X">X\'s</span>' : '<span class="O">O\'s</span>'} turn`;

x_score.innerHTML = X_wins;
o_score.innerHTML = O_wins;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell: HTMLBaseElement, clickedCellIndex: number) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
  clickedCell.setAttribute('data-mark', currentPlayer)
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === '' || b === '' || c === '') {
        continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break
    }
  }
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    currentPlayer === "X" ? ++X_wins : ++O_wins
    localStorage.setItem(`${currentPlayer}_wins`, currentPlayer === "X" ? X_wins : O_wins);
    // after 2 seconds, reload the page
    setTimeout(() => {
      location.reload()
    }, 2000);

    return;
  }
  
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    setTimeout(() => {
      location.reload()
    }, 2000);
    return;
  }
  
  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) { 
  console.log('clicked!!!!');
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell?.getAttribute('data-cell-index')
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
  }
      
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll('.cell')
          .forEach(cell => cell.innerHTML = "");
}

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
// cells.forEach(cell => cell.addEventListener('touchend', handleCellClick));

const restart = document.querySelector('.game_restart');
restart?.addEventListener('click', handleRestartGame);
// restart?.addEventListener('touchend', handleRestartGame);

const body = document.querySelector('body');
const toggle = document.querySelector('.toggle_theme');
toggle?.addEventListener('click', () => body?.classList.toggle('light'));
// toggle?.addEventListener('touchend', () => body?.classList.toggle('light'));