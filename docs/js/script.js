'use strict';

var ShapeToClass = {
  'X': 'cross',
  'O': 'circle'
};
var WIN_COMBINATIONS = [[1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1], [1, 0, 0, 1, 0, 0, 1, 0, 0], [0, 1, 0, 0, 1, 0, 0, 1, 0], [0, 0, 1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1], [0, 0, 1, 0, 1, 0, 1, 0, 0]]; // данные (модель)

var players = [{
  shape: 'X',
  moves: [0, 0, 0, 0, 0, 0, 0, 0, 0]
}, {
  shape: 'O',
  moves: [0, 0, 0, 0, 0, 0, 0, 0, 0]
}]; // запуск игры

var playerNum = 0;
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

runGame(); // функции вывода информации (представление)

function showGameStatus(isWin, isDraw) {
  var currentPlayer = players[playerNum].shape;
  messagePlayer.textContent = currentPlayer;
  messagePlayer.classList.remove('message__player--hide');
  messagePlayer.classList.remove("message__player--".concat(ShapeToClass['X']));
  messagePlayer.classList.remove("message__player--".concat(ShapeToClass['O']));
  messagePlayer.classList.add("message__player--".concat(ShapeToClass[currentPlayer]));

  if (isWin) {
    messageText.textContent = 'В этот раз выиграл';
  } else if (isDraw) {
    messageText.textContent = 'Ничья';
    messagePlayer.textContent = '';
    messagePlayer.classList.add('message__player--hide');
  } else {
    messageText.textContent = 'Следующий ход ';
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
} // функции изменения модели (контроллер)


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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBTaGFwZVRvQ2xhc3MgPSB7XG4gICdYJzogJ2Nyb3NzJyxcbiAgJ08nOiAnY2lyY2xlJ1xufTtcbnZhciBXSU5fQ09NQklOQVRJT05TID0gW1sxLCAxLCAxLCAwLCAwLCAwLCAwLCAwLCAwXSwgWzAsIDAsIDAsIDEsIDEsIDEsIDAsIDAsIDBdLCBbMCwgMCwgMCwgMCwgMCwgMCwgMSwgMSwgMV0sIFsxLCAwLCAwLCAxLCAwLCAwLCAxLCAwLCAwXSwgWzAsIDEsIDAsIDAsIDEsIDAsIDAsIDEsIDBdLCBbMCwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMV0sIFsxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAxXSwgWzAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDBdXTsgLy8g0LTQsNC90L3Ri9C1ICjQvNC+0LTQtdC70YwpXG5cbnZhciBwbGF5ZXJzID0gW3tcbiAgc2hhcGU6ICdYJyxcbiAgbW92ZXM6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXVxufSwge1xuICBzaGFwZTogJ08nLFxuICBtb3ZlczogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdXG59XTsgLy8g0LfQsNC/0YPRgdC6INC40LPRgNGLXG5cbnZhciBwbGF5ZXJOdW0gPSAwO1xudmFyIG1lc3NhZ2VUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VfX3RleHQnKTtcbnZhciBtZXNzYWdlUGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2VfX3BsYXllcicpO1xudmFyIHJlc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdGFydC1idG4nKTtcbnZhciBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQnKTtcbnZhciBjZWxscyA9IEFycmF5LmZyb20oZ3JpZC5jaGlsZHJlbik7XG5cbmZ1bmN0aW9uIHJ1bkdhbWUoKSB7XG4gIHJlc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSk7XG4gIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjZWxsQ2xpY2tIYW5kbGVyKTtcbiAgc2hvd0dhbWVTdGF0dXMoKTtcbn1cblxuZnVuY3Rpb24gc3RvcEdhbWUoKSB7XG4gIGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjZWxsQ2xpY2tIYW5kbGVyKTtcbiAgY2VsbHMuZm9yRWFjaChmdW5jdGlvbiAoY2VsbCkge1xuICAgIHJldHVybiBjZWxsLmNsYXNzTGlzdC5hZGQoJ2dyaWRfX2NlbGwtLW9mZicpO1xuICB9KTtcbiAgc2hvd1Jlc3RhcnRCdG4oKTtcbn1cblxucnVuR2FtZSgpOyAvLyDRhNGD0L3QutGG0LjQuCDQstGL0LLQvtC00LAg0LjQvdGE0L7RgNC80LDRhtC40LggKNC/0YDQtdC00YHRgtCw0LLQu9C10L3QuNC1KVxuXG5mdW5jdGlvbiBzaG93R2FtZVN0YXR1cyhpc1dpbiwgaXNEcmF3KSB7XG4gIHZhciBjdXJyZW50UGxheWVyID0gcGxheWVyc1twbGF5ZXJOdW1dLnNoYXBlO1xuICBtZXNzYWdlUGxheWVyLnRleHRDb250ZW50ID0gY3VycmVudFBsYXllcjtcbiAgbWVzc2FnZVBsYXllci5jbGFzc0xpc3QucmVtb3ZlKCdtZXNzYWdlX19wbGF5ZXItLWhpZGUnKTtcbiAgbWVzc2FnZVBsYXllci5jbGFzc0xpc3QucmVtb3ZlKFwibWVzc2FnZV9fcGxheWVyLS1cIi5jb25jYXQoU2hhcGVUb0NsYXNzWydYJ10pKTtcbiAgbWVzc2FnZVBsYXllci5jbGFzc0xpc3QucmVtb3ZlKFwibWVzc2FnZV9fcGxheWVyLS1cIi5jb25jYXQoU2hhcGVUb0NsYXNzWydPJ10pKTtcbiAgbWVzc2FnZVBsYXllci5jbGFzc0xpc3QuYWRkKFwibWVzc2FnZV9fcGxheWVyLS1cIi5jb25jYXQoU2hhcGVUb0NsYXNzW2N1cnJlbnRQbGF5ZXJdKSk7XG5cbiAgaWYgKGlzV2luKSB7XG4gICAgbWVzc2FnZVRleHQudGV4dENvbnRlbnQgPSAn0JIg0Y3RgtC+0YIg0YDQsNC3INCy0YvQuNCz0YDQsNC7JztcbiAgfSBlbHNlIGlmIChpc0RyYXcpIHtcbiAgICBtZXNzYWdlVGV4dC50ZXh0Q29udGVudCA9ICfQndC40YfRjNGPJztcbiAgICBtZXNzYWdlUGxheWVyLnRleHRDb250ZW50ID0gJyc7XG4gICAgbWVzc2FnZVBsYXllci5jbGFzc0xpc3QuYWRkKCdtZXNzYWdlX19wbGF5ZXItLWhpZGUnKTtcbiAgfSBlbHNlIHtcbiAgICBtZXNzYWdlVGV4dC50ZXh0Q29udGVudCA9ICfQodC70LXQtNGD0Y7RidC40Lkg0YXQvtC0ICc7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvd1BsYXllck1vdmUoY2VsbCkge1xuICB2YXIgcGxheWVyU2hhcGUgPSBwbGF5ZXJzW3BsYXllck51bV0uc2hhcGU7XG4gIGNlbGwuY2xhc3NMaXN0LmFkZChcImdyaWRfX2NlbGwtLVwiLmNvbmNhdChTaGFwZVRvQ2xhc3NbcGxheWVyU2hhcGVdKSk7XG59XG5cbmZ1bmN0aW9uIHNob3dSZXN0YXJ0QnRuKCkge1xuICByZXN0YXJ0QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3Jlc3RhcnQtYnRuLS1oaWRlJyk7XG59XG5cbmZ1bmN0aW9uIHNob3dXaW5Nb3Zlcyh3aW5GaWVsZHNldCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHdpbkZpZWxkc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHdpbkZpZWxkc2V0W2ldID09IDEpIGNlbGxzW2ldLmNsYXNzTGlzdC5hZGQoJ3dpbicpO1xuICB9XG59IC8vINGE0YPQvdC60YbQuNC4INC40LfQvNC10L3QtdC90LjRjyDQvNC+0LTQtdC70LggKNC60L7QvdGC0YDQvtC70LvQtdGAKVxuXG5cbmZ1bmN0aW9uIGNoYW5nZVBsYXllcigpIHtcbiAgcGxheWVyTnVtID0gcGxheWVyTnVtID09IDAgPyAxIDogMDtcbn1cblxuZnVuY3Rpb24gc2F2ZVBsYXllck1vdmUoY2VsbElkKSB7XG4gIHBsYXllcnNbcGxheWVyTnVtXS5tb3Zlc1tjZWxsSWRdID0gMTtcbn1cblxuZnVuY3Rpb24gaXNFbXB0eUNlbGwoY2VsbCkge1xuICB2YXIgc2hhcGVzID0gT2JqZWN0LmtleXMoU2hhcGVUb0NsYXNzKTtcbiAgcmV0dXJuIHNoYXBlcy5ldmVyeShmdW5jdGlvbiAoc2hhcGUpIHtcbiAgICByZXR1cm4gIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ3JpZF9fY2VsbC0tXCIuY29uY2F0KFNoYXBlVG9DbGFzc1tzaGFwZV0pKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrV2luKCkge1xuICB2YXIgbW92ZXMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IFdJTl9DT01CSU5BVElPTlMubGVuZ3RoOyBpKyspIHtcbiAgICBtb3Zlcy5wdXNoKFtdKTtcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgV0lOX0NPTUJJTkFUSU9OU1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgbW92ZXNbaV1bal0gPSBwbGF5ZXJzW3BsYXllck51bV0ubW92ZXNbal0gKiBXSU5fQ09NQklOQVRJT05TW2ldW2pdO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCBXSU5fQ09NQklOQVRJT05TLmxlbmd0aDsgX2krKykge1xuICAgIGlmIChtb3Zlc1tfaV0uam9pbigpID09IFdJTl9DT01CSU5BVElPTlNbX2ldLmpvaW4oKSkge1xuICAgICAgc2hvd1dpbk1vdmVzKFdJTl9DT01CSU5BVElPTlNbX2ldKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gY2hlY2tEcmF3KCkge1xuICByZXR1cm4gIWNlbGxzLnNvbWUoZnVuY3Rpb24gKGNlbGwpIHtcbiAgICByZXR1cm4gaXNFbXB0eUNlbGwoY2VsbCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjZWxsQ2xpY2tIYW5kbGVyKGV2dCkge1xuICB2YXIgY2VsbCA9IGV2dC50YXJnZXQ7XG5cbiAgaWYgKGlzRW1wdHlDZWxsKGNlbGwpKSB7XG4gICAgc2F2ZVBsYXllck1vdmUoY2VsbC5pZCk7XG4gICAgc2hvd1BsYXllck1vdmUoY2VsbCk7XG4gICAgdmFyIGlzV2luID0gY2hlY2tXaW4oKTtcbiAgICB2YXIgaXNEcmF3ID0gY2hlY2tEcmF3KCk7XG5cbiAgICBpZiAoaXNXaW4gfHwgaXNEcmF3KSB7XG4gICAgICBzdG9wR2FtZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGFuZ2VQbGF5ZXIoKTtcbiAgICB9XG5cbiAgICBzaG93R2FtZVN0YXR1cyhpc1dpbiwgaXNEcmF3KTtcbiAgfVxufSJdfQ==
