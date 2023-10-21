const squares = document.querySelectorAll('.square'); 
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

const winningCombinations = [ 
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleSquareClick(e) {
  const squareIndex = e.target.id;
  
  if (gameBoard[squareIndex] !== '' || gameOver) {
    return;
  }
  // if(gameBoard[squreIndex] ! ==='' || gameOver){}
  gameBoard[squareIndex] = currentPlayer;
  e.target.textContent = currentPlayer;
  
  checkForWinner();
  
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkForWinner() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    
    if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
      message.textContent = `${currentPlayer} wins!`;
      gameOver = true;
      return;
    }
  }
  
  if (!gameBoard.includes('')) {
    message.textContent = "It's a tie!";
    gameOver = true;
  }
}

function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];  gameOver = false;
  message.textContent = '';
  
  squares.forEach(square => square.textContent = '');
}

squares.forEach(square => square.addEventListener('click', handleSquareClick));
resetButton.addEventListener('click', resetGame);

function checkForWinner() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    
    if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {  
      message.textContent = `${currentPlayer} wins!`;
      gameOver = true;

      // Add classes to the winning squares
      squares[a].classList.add('winner');
      squares[b].classList.add('winner');
      squares[c].classList.add('winner');

      // Add class to the losing squares
      const loserSymbol = currentPlayer === 'X' ? 'O' : 'X';
      document.querySelectorAll(`.square:not(.${loserSymbol}):not(.winner)`) 
              .forEach(square => square.classList.add('loser'));
      return;
    }
  }
   
  // Code for tie game here
}

