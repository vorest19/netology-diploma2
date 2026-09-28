let players = ['x', 'o'];
let activePlayer = 0;

/* Допзадание: любой размер поля (по умолчанию 3x3) */
const boardSize = 3;
let board = [];

/* Функция startGame вызывается без параметров при открытии или перезапуске игры. */
function startGame() {
  /* 1. Создать игровое поле. Оно должно представлять из себя массив массивов. */
  /* Для обращения к ячейке игрового поля нужно знать строку и колонку этого поля. */
  board = [];

  for (let i = 0; i < boardSize; i++) {
    let row = [];
    for (let j = 0; j < boardSize; j++) {
      row.push('');
    }
    board.push(row);
  }

  /* 2. Установить активного игрока. */
  activePlayer = 0;

  /* 3. Вызвать функцию renderBoard для отрисовки игрового поля. */
  renderBoard(board);
}

/* Функция click вызывается при клике игрока по полю с параметрами строки и колонки. */
function click(row, col) {
  /* 1. Обновить игровое поле, записать в нужную ячейку символ игрока. */
  board[row][col] = players[activePlayer];

  /* 2. Вызвать функцию renderBoard для отрисовки игрового поля. */
  renderBoard(board);

  /* 3. Проверить, выигрышная ли сложилась ситуация. */
  if (checkWin()) {
    /* 4. Если ситуация выигрышная, вызвать функцию showWinner и передать в неё номер игрока. */
    showWinner(activePlayer);
  } else {
    /* 5. Если нужно играть дальше, то передать ход следующему игроку. */
    activePlayer = (activePlayer + 1) % players.length;
  }
}

/* Допфункция checkWin проверяет наличие победной комбинации на поле любого размера. */
function checkWin() {
  const symbol = players[activePlayer];

  /* Проверка строк */
  for (let r = 0; r < boardSize; r++) {
    let rowWin = true;
    for (let c = 0; c < boardSize; c++) {
      if (board[r][c] !== symbol) {
        rowWin = false;
        break;
      }
    }
    if (rowWin) {
      return true;
    }
  }

  /* Проверка колонок */
  for (let c = 0; c < boardSize; c++) {
    let columnWin = true;
    for (let r = 0; r < boardSize; r++) {
      if (board[r][c] !== symbol) {
        columnWin = false;
        break;
      }
    }
    if (columnWin) {
      return true;
    }
  }

  /* Проверка главной диагонали (\) */
  let mainDiagonalWin = true;
  for (let i = 0; i < boardSize; i++) {
    if (board[i][i] !== symbol) {
      mainDiagonalWin = false;
      break;
    }
  }
  if (mainDiagonalWin) {
    return true;
  }

  /* Проверка побочной диагонали (/) */
  let secondaryDiagonalWin = true;
  for (let i = 0; i < boardSize; i++) {
    if (board[i][boardSize - 1 - i] !== symbol) {
      secondaryDiagonalWin = false;
      break;
    }
  }
  if (secondaryDiagonalWin) {
    return true;
  }

  return false;
}
