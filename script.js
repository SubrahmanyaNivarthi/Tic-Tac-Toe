const board = document.getElementById("board");
const status = document.getElementById("status");
const difficultySelect = document.getElementById("difficulty");

let cells = Array(16).fill("");
let gameOver = false;

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((value, i) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = value;
    cell.addEventListener("click", () => playerMove(i));
    board.appendChild(cell);
  });
}

function playerMove(index) {
  if (gameOver || cells[index]) return;

  cells[index] = "X";
  renderBoard();

  if (checkWinner("X")) {
    status.textContent = "You win!";
    gameOver = true;
    return;
  }

  if (!cells.includes("")) {
    status.textContent = "Draw!";
    gameOver = true;
    return;
  }

  status.textContent = "Computer's turn...";
  setTimeout(() => computerMove(), 500);
}

function computerMove() {
  const difficulty = difficultySelect.value;

  if (difficulty === "easy") {
    easyMove();
  } else if (difficulty === "hard") {
    hardMove();
  }

  renderBoard();

  if (checkWinner("O")) {
    status.textContent = "Computer wins!";
    gameOver = true;
  } else if (!cells.includes("")) {
    status.textContent = "Draw!";
    gameOver = true;
  } else {
    status.textContent = "Your turn!";
  }
}

function easyMove() {
  const emptyIndices = cells.map((v, i) => v === "" ? i : null).filter(i => i !== null);
  const move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  cells[move] = "O";
}

function hardMove() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === "") {
      cells[i] = "O";
      if (checkWinner("O")) return;
      cells[i] = "";
    }
  }

  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === "") {
      cells[i] = "X";
      if (checkWinner("X")) {
        cells[i] = "O";
        return;
      }
      cells[i] = "";
    }
  }

  easyMove();
}

function checkWinner(player) {
  const lines = [];

  for (let i = 0; i < 16; i += 4) {
    lines.push([i, i+1, i+2, i+3]);
  }

  for (let i = 0; i < 4; i++) {
    lines.push([i, i+4, i+8, i+12]);
  }

  lines.push([0, 5, 10, 15]);
  lines.push([3, 6, 9, 12]);

  return lines.some(combo => combo.every(i => cells[i] === player));
}

function resetGame() {
  cells = Array(16).fill("");
  gameOver = false;
  status.textContent = "Your turn!";
  renderBoard();
}

renderBoard();
