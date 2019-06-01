"use strict";

var players = [
{
  name: '',
  cssClass: 'cross',
  shape: 'X',
  fieldset: [0,0,0,0,0,0,0,0,0]
},
{
  name: '',
  cssClass: 'circle',
  shape: 'O',
  fieldset: [0,0,0,0,0,0,0,0,0]
}
]

var winFieldsets = [
[1,1,1,0,0,0,0,0,0],
[0,0,0,1,1,1,0,0,0],
[0,0,0,0,0,0,1,1,1],
[1,0,0,1,0,0,1,0,0],
[0,1,0,0,1,0,0,1,0],
[0,0,1,0,0,1,0,0,1],
[1,0,0,0,1,0,0,0,1],
[0,0,1,0,1,0,1,0,0]
]

function setPlayer(i) {
  var player = prompt('Введите имя ' + (i+1) + ' игрока (за ' + players[i].shape +')\nПо умолчанию \'Игрок ' + (i+1) + '\'', '');
  player = (player == null) ? 'Игрок ' + (i+1) : player;
  players[i].name = player;
  var playerTitle = document.getElementById('players').children[i].querySelector('b');
  playerTitle.textContent = player;
}

function alertGameStatus(isWin, isDraw) {
  if (isWin) {
    msgSpan.textContent = players[playerNo].name + ' выиграл!';
  } else if (isDraw) {
    msgSpan.textContent = 'Ничья!';
  } else {
    msgSpan.textContent = 'Сейчас ходит: ' + players[playerNo].name;
  }
}

function changePlayer() {
  playerNo = (playerNo == 0) ? 1 : 0;
}

function showRefreshButton() {
  refreshBtn.classList.add('show');
}

function CellsClickHandler() {
  if(this.classList.length == 0) {
    addPlayerShape(this);
    setPlayerFieldset(this);
    var isWin = checkWin();
    if (isWin) {
      removeCellsClickHandler();
      showRefreshButton();
    } else {
      var isDraw = checkDraw();
      (isDraw) ? showRefreshButton() : changePlayer();
    }
    alertGameStatus(isWin, isDraw);
  }
}

function setColorWinCells(winFieldset) {
  for(var i = 0; i < winFieldset.length; i++) {
    if(winFieldset[i] == 1) {
      cells[i].classList.add('win');
    }
  }
}

function checkDraw() {
  for(var i = 0; i < cells.length; i++) {
    if(cells[i].classList.length == 0) return false;
  }
  return true;
}

function removeCellsClickHandler() {
  for(var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', CellsClickHandler);
  }
}

function addPlayerShape(cell) {
  cell.classList.add(players[playerNo].cssClass);
}

function setPlayerFieldset(cell) {
  players[playerNo].fieldset[cell.id] = 1;
}

function checkWin() {
  var factFieldsets = [];
  for(var i = 0; i < winFieldsets.length; i++) {
    factFieldsets.push([]);
    for(var j = 0; j < winFieldsets[i].length; j++) {
      factFieldsets[i][j] = players[playerNo].fieldset[j] * winFieldsets[i][j];
    }
  }

  for(var i = 0; i < winFieldsets.length; i++) {
    if(factFieldsets[i].join() == winFieldsets[i].join()) {
      setColorWinCells(winFieldsets[i]);
      return true;
    }
  }
}

function RefreshClickHandler() {
  window.location.reload();
}

// *********************
// начало программы, порядок, разделение визуального и модели
// *********************

for(var i = 0; i < players.length; i++) {
  setPlayer(i);
}

var playerNo = 0;

var refreshBtn = document.getElementById('refresh');
refreshBtn.addEventListener('click', RefreshClickHandler);

var msgSpan = document.getElementById('msg');
alertGameStatus();

var cells = document.getElementById('field').children;

for(var i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', CellsClickHandler);
}
