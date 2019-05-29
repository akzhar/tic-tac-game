"use strict";

var player1 = prompt('Введите имя 1 игрока (х)', '');
player1 = (player1 == null) ? 'Игрок 1' : player1;
var player1Title = document.querySelector('.main__players li:nth-child(1) b');
player1Title.textContent = player1;
var player2 = prompt('Введите имя 2 игрока (о)', '');
player2 = (player2 == null) ? 'Игрок 2' : player2;
var player2Title = document.querySelector('.main__players li:nth-child(2) b');
player2Title.textContent = player2;

var players = [
  {
    name: player1,
    shape: 'cross',
    currentFieldset: [0,0,0,0,0,0,0,0,0]
  },
  {
    name: player2,
    shape: 'circle',
    currentFieldset: [0,0,0,0,0,0,0,0,0]
  }
]

var playerNo = 0;
var msg = document.querySelector('.main__msg b');
alertPlayer();

function alertPlayer() {
  msg.textContent = players[playerNo].name;
}

function changePlayer() {
  playerNo = (playerNo == 0) ? 1 : 0;
}

function addClickHandler(cell) {
  cell.addEventListener('click', function() {
    if(cell.classList.length == 0) {
      cell.classList.add(players[playerNo].shape);
      // setCurrentFieldset(); // занятые игроком ячейки
      // checkWinFieldset(); // проверка фактического сета ячеек с выигрышным (8х)
      // проверка на ничью
      changePlayer();
      alertPlayer();
    }
  })
}

var cells = document.querySelector('.field').children;

for(var i = 0; i < cells.length; i++) {
  addClickHandler(cells[i]);
}
