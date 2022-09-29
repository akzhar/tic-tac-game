'use strict';

var ShapeToClass = {
  'X': 'cross',
  'O': 'circle'
};
var WIN_COMBINATIONS = [[1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1], [1, 0, 0, 1, 0, 0, 1, 0, 0], [0, 1, 0, 0, 1, 0, 0, 1, 0], [0, 0, 1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1], [0, 0, 1, 0, 1, 0, 1, 0, 0]]; // game data

var playerNum = 0;
var players = [{
  shape: 'X',
  moves: [0, 0, 0, 0, 0, 0, 0, 0, 0]
}, {
  shape: 'O',
  moves: [0, 0, 0, 0, 0, 0, 0, 0, 0]
}]; // run the game

var messageText = document.querySelector('.message__text');
var messagePlayer = document.querySelector('.message__player');
var restartBtn = document.querySelector('.restart-btn');
var grid = document.querySelector('.grid');
var cells = Array.from(grid.children);

function runGame() {
  restartBtn.addEventListener('click', function () {
    return window.location.reload();
  });
  grid.addEventListener('click', cellClickHandler);
  showGameStatus();
}

function stopGame() {
  grid.removeEventListener('click', cellClickHandler);
  cells.forEach(function (cell) {
    return cell.classList.add('grid__cell--off');
  });
  showRestartBtn();
}

runGame(); // output game results

function showGameStatus(isWin, isDraw) {
  var currentPlayer = players[playerNum].shape;
  messagePlayer.textContent = currentPlayer;
  messagePlayer.classList.remove('message__player--hide');
  messagePlayer.classList.remove("message__player--".concat(ShapeToClass['X']));
  messagePlayer.classList.remove("message__player--".concat(ShapeToClass['O']));
  messagePlayer.classList.add("message__player--".concat(ShapeToClass[currentPlayer]));

  if (isWin) {
    messageText.textContent = 'And the winner is...';
  } else if (isDraw) {
    messageText.textContent = 'Draw';
    messagePlayer.textContent = '';
    messagePlayer.classList.add('message__player--hide');
  } else {
    messageText.textContent = 'Choose the cell for';
  }
}

function showPlayerMove(cell) {
  var playerShape = players[playerNum].shape;
  cell.classList.add("grid__cell--".concat(ShapeToClass[playerShape]));
}

function showRestartBtn() {
  restartBtn.classList.remove('restart-btn--hide');
}

function showWinMoves(winFieldset) {
  for (var i = 0; i < winFieldset.length; i++) {
    if (winFieldset[i] == 1) cells[i].classList.add('win');
  }
} // game logic


function changePlayer() {
  playerNum = playerNum == 0 ? 1 : 0;
}

function savePlayerMove(cellId) {
  players[playerNum].moves[cellId] = 1;
}

function isEmptyCell(cell) {
  var shapes = Object.keys(ShapeToClass);
  return shapes.every(function (shape) {
    return !cell.classList.contains("grid__cell--".concat(ShapeToClass[shape]));
  });
}

function checkWin() {
  var moves = [];

  for (var i = 0; i < WIN_COMBINATIONS.length; i++) {
    moves.push([]);

    for (var j = 0; j < WIN_COMBINATIONS[i].length; j++) {
      moves[i][j] = players[playerNum].moves[j] * WIN_COMBINATIONS[i][j];
    }
  }

  for (var _i = 0; _i < WIN_COMBINATIONS.length; _i++) {
    if (moves[_i].join() == WIN_COMBINATIONS[_i].join()) {
      showWinMoves(WIN_COMBINATIONS[_i]);
      return true;
    }
  }

  return false;
}

function checkDraw() {
  return !cells.some(function (cell) {
    return isEmptyCell(cell);
  });
}

function cellClickHandler(evt) {
  var cell = evt.target;

  if (isEmptyCell(cell)) {
    savePlayerMove(cell.id);
    showPlayerMove(cell);
    var isWin = checkWin();
    var isDraw = checkDraw();

    if (isWin || isDraw) {
      stopGame();
    } else {
      changePlayer();
    }

    showGameStatus(isWin, isDraw);
  }
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBTaGFwZVRvQ2xhc3MgPSB7XG4gICdYJzogJ2Nyb3NzJyxcbiAgJ08nOiAnY2lyY2xlJ1xufTtcbnZhciBXSU5fQ09NQklOQVRJT05TID0gW1sxLCAxLCAxLCAwLCAwLCAwLCAwLCAwLCAwXSwgWzAsIDAsIDAsIDEsIDEsIDEsIDAsIDAsIDBdLCBbMCwgMCwgMCwgMCwgMCwgMCwgMSwgMSwgMV0sIFsxLCAwLCAwLCAxLCAwLCAwLCAxLCAwLCAwXSwgWzAsIDEsIDAsIDAsIDEsIDAsIDAsIDEsIDBdLCBbMCwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMV0sIFsxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxXSwgWzAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDBdXTsgLy8gZ2FtZSBkYXRhXG5cbnZhciBwbGF5ZXJOdW0gPSAwO1xudmFyIHBsYXllcnMgPSBbe1xuICBzaGFwZTogJ1gnLFxuICBtb3ZlczogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdXG59LCB7XG4gIHNoYXBlOiAnTycsXG4gIG1vdmVzOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF1cbn1dOyAvLyBydW4gdGhlIGdhbWVcblxudmFyIG1lc3NhZ2VUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VfX3RleHQnKTtcbnZhciBtZXNzYWdlUGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VfX3BsYXllcicpO1xudmFyIHJlc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdGFydC1idG4nKTtcbnZhciBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcbnZhciBjZWxscyA9IEFycmF5LmZyb20oZ3JpZC5jaGlsZHJlbik7XG5cbmZ1bmN0aW9uIHJ1bkdhbWUoKSB7XG4gIHJlc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSk7XG4gIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjZWxsQ2xpY2tIYW5kbGVyKTtcbiAgc2hvd0dhbWVTdGF0dXMoKTtcbn1cblxuZnVuY3Rpb24gc3RvcEdhbWUoKSB7XG4gIGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjZWxsQ2xpY2tIYW5kbGVyKTtcbiAgY2VsbHMuZm9yRWFjaChmdW5jdGlvbiAoY2VsbCkge1xuICAgIHJldHVybiBjZWxsLmNsYXNzTGlzdC5hZGQoJ2dyaWRfX2NlbGwtLW9mZicpO1xuICB9KTtcbiAgc2hvd1Jlc3RhcnRCdG4oKTtcbn1cblxucnVuR2FtZSgpOyAvLyBvdXRwdXQgZ2FtZSByZXN1bHRzXG5cbmZ1bmN0aW9uIHNob3dHYW1lU3RhdHVzKGlzV2luLCBpc0RyYXcpIHtcbiAgdmFyIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJzW3BsYXllck51bV0uc2hhcGU7XG4gIG1lc3NhZ2VQbGF5ZXIudGV4dENvbnRlbnQgPSBjdXJyZW50UGxheWVyO1xuICBtZXNzYWdlUGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoJ21lc3NhZ2VfX3BsYXllci0taGlkZScpO1xuICBtZXNzYWdlUGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJtZXNzYWdlX19wbGF5ZXItLVwiLmNvbmNhdChTaGFwZVRvQ2xhc3NbJ1gnXSkpO1xuICBtZXNzYWdlUGxheWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJtZXNzYWdlX19wbGF5ZXItLVwiLmNvbmNhdChTaGFwZVRvQ2xhc3NbJ08nXSkpO1xuICBtZXNzYWdlUGxheWVyLmNsYXNzTGlzdC5hZGQoXCJtZXNzYWdlX19wbGF5ZXItLVwiLmNvbmNhdChTaGFwZVRvQ2xhc3NbY3VycmVudFBsYXllcl0pKTtcblxuICBpZiAoaXNXaW4pIHtcbiAgICBtZXNzYWdlVGV4dC50ZXh0Q29udGVudCA9ICdBbmQgdGhlIHdpbm5lciBpcy4uLic7XG4gIH0gZWxzZSBpZiAoaXNEcmF3KSB7XG4gICAgbWVzc2FnZVRleHQudGV4dENvbnRlbnQgPSAnRHJhdyc7XG4gICAgbWVzc2FnZVBsYXllci50ZXh0Q29udGVudCA9ICcnO1xuICAgIG1lc3NhZ2VQbGF5ZXIuY2xhc3NMaXN0LmFkZCgnbWVzc2FnZV9fcGxheWVyLS1oaWRlJyk7XG4gIH0gZWxzZSB7XG4gICAgbWVzc2FnZVRleHQudGV4dENvbnRlbnQgPSAnQ2hvb3NlIHRoZSBjZWxsIGZvcic7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvd1BsYXllck1vdmUoY2VsbCkge1xuICB2YXIgcGxheWVyU2hhcGUgPSBwbGF5ZXJzW3BsYXllck51bV0uc2hhcGU7XG4gIGNlbGwuY2xhc3NMaXN0LmFkZChcImdyaWRfX2NlbGwtLVwiLmNvbmNhdChTaGFwZVRvQ2xhc3NbcGxheWVyU2hhcGVdKSk7XG59XG5cbmZ1bmN0aW9uIHNob3dSZXN0YXJ0QnRuKCkge1xuICByZXN0YXJ0QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3Jlc3RhcnQtYnRuLS1oaWRlJyk7XG59XG5cbmZ1bmN0aW9uIHNob3dXaW5Nb3Zlcyh3aW5GaWVsZHNldCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHdpbkZpZWxkc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHdpbkZpZWxkc2V0W2ldID09IDEpIGNlbGxzW2ldLmNsYXNzTGlzdC5hZGQoJ3dpbicpO1xuICB9XG59IC8vIGdhbWUgbG9naWNcblxuXG5mdW5jdGlvbiBjaGFuZ2VQbGF5ZXIoKSB7XG4gIHBsYXllck51bSA9IHBsYXllck51bSA9PSAwID8gMSA6IDA7XG59XG5cbmZ1bmN0aW9uIHNhdmVQbGF5ZXJNb3ZlKGNlbGxJZCkge1xuICBwbGF5ZXJzW3BsYXllck51bV0ubW92ZXNbY2VsbElkXSA9IDE7XG59XG5cbmZ1bmN0aW9uIGlzRW1wdHlDZWxsKGNlbGwpIHtcbiAgdmFyIHNoYXBlcyA9IE9iamVjdC5rZXlzKFNoYXBlVG9DbGFzcyk7XG4gIHJldHVybiBzaGFwZXMuZXZlcnkoZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgcmV0dXJuICFjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcImdyaWRfX2NlbGwtLVwiLmNvbmNhdChTaGFwZVRvQ2xhc3Nbc2hhcGVdKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjaGVja1dpbigpIHtcbiAgdmFyIG1vdmVzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBXSU5fQ09NQklOQVRJT05TLmxlbmd0aDsgaSsrKSB7XG4gICAgbW92ZXMucHVzaChbXSk7XG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IFdJTl9DT01CSU5BVElPTlNbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIG1vdmVzW2ldW2pdID0gcGxheWVyc1twbGF5ZXJOdW1dLm1vdmVzW2pdICogV0lOX0NPTUJJTkFUSU9OU1tpXVtqXTtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgV0lOX0NPTUJJTkFUSU9OUy5sZW5ndGg7IF9pKyspIHtcbiAgICBpZiAobW92ZXNbX2ldLmpvaW4oKSA9PSBXSU5fQ09NQklOQVRJT05TW19pXS5qb2luKCkpIHtcbiAgICAgIHNob3dXaW5Nb3ZlcyhXSU5fQ09NQklOQVRJT05TW19pXSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRHJhdygpIHtcbiAgcmV0dXJuICFjZWxscy5zb21lKGZ1bmN0aW9uIChjZWxsKSB7XG4gICAgcmV0dXJuIGlzRW1wdHlDZWxsKGNlbGwpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY2VsbENsaWNrSGFuZGxlcihldnQpIHtcbiAgdmFyIGNlbGwgPSBldnQudGFyZ2V0O1xuXG4gIGlmIChpc0VtcHR5Q2VsbChjZWxsKSkge1xuICAgIHNhdmVQbGF5ZXJNb3ZlKGNlbGwuaWQpO1xuICAgIHNob3dQbGF5ZXJNb3ZlKGNlbGwpO1xuICAgIHZhciBpc1dpbiA9IGNoZWNrV2luKCk7XG4gICAgdmFyIGlzRHJhdyA9IGNoZWNrRHJhdygpO1xuXG4gICAgaWYgKGlzV2luIHx8IGlzRHJhdykge1xuICAgICAgc3RvcEdhbWUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hhbmdlUGxheWVyKCk7XG4gICAgfVxuXG4gICAgc2hvd0dhbWVTdGF0dXMoaXNXaW4sIGlzRHJhdyk7XG4gIH1cbn0iXX0=
