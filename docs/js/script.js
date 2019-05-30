"use strict";

var players = [
{
  name: '',
  shape: 'cross',
  fieldset: [0,0,0,0,0,0,0,0,0]
},
{
  name: '',
  shape: 'circle',
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
  var player = prompt('Введите имя ' + (i+1) + ' игрока (за ' + players[i].shape +')', '');
  player = (player == null) ? 'Игрок ' + (i+1) : player;
  players[i].name = player;
  var playerTitle = document.querySelector('.main__players').children[i].querySelector('b');
  playerTitle.textContent = player;
}

function alertGameStatus(win) {
  if (win) {
    msg.textContent = 'Игра окончена! ' + players[playerNo].name + ' выиграл!';
  } else {
    msg.textContent = 'Сейчас ходит: ' + players[playerNo].name;
  }
}

function changePlayer() {
  playerNo = (playerNo == 0) ? 1 : 0;
}

function addClickHandler(cell) {
  cell.addEventListener('click', function () {
    if(cell.classList.length == 0) {
    addPlayerShape(cell);
    setPlayerFieldset(cell);
    var win = checkWin();
    if (win) alert(players[playerNo].name + ' выиграл!');

    // кнопка обновить - играть заново
    // снять все события с ячеек
    // проверка на ничью

    if (!win) changePlayer();
    alertGameStatus(win);
    }
  });
}

function addPlayerShape(cell) {
  cell.classList.add(players[playerNo].shape);
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
      return true;
    }
  }
}

for(var i = 0; i < players.length; i++) {
  setPlayer(i);
}

var playerNo = 0;
var msg = document.querySelector('.main__msg');
alertGameStatus();

var cells = document.querySelector('.field').children;

for(var i = 0; i < cells.length; i++) {
  addClickHandler(cells[i]);
}