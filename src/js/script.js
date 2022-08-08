'use strict';

const ShapeToClass = {
	'X': 'cross',
	'O': 'circle'
};

const WIN_COMBINATIONS = [
	[1,1,1,0,0,0,0,0,0],
	[0,0,0,1,1,1,0,0,0],
	[0,0,0,0,0,0,1,1,1],
	[1,0,0,1,0,0,1,0,0],
	[0,1,0,0,1,0,0,1,0],
	[0,0,1,0,0,1,0,0,1],
	[1,0,0,0,1,0,0,0,1],
	[0,0,1,0,1,0,1,0,0]
];

// данные (модель)

const players = [
	{
		shape: 'X',
		moves: [0,0,0,0,0,0,0,0,0]
	},
	{
		shape: 'O',
		moves: [0,0,0,0,0,0,0,0,0]
	}
];

// запуск игры

let playerNum = 0;
const messageText = document.querySelector('.message__text');
const messagePlayer = document.querySelector('.message__player');
const restartBtn = document.querySelector('.restart-btn');
const grid = document.querySelector('.grid');
const cells = Array.from(grid.children);

function runGame() {
	restartBtn.addEventListener('click', () => window.location.reload());
	grid.addEventListener('click', cellClickHandler);
	showGameStatus();
}

function stopGame() {
	grid.removeEventListener('click', cellClickHandler);
	cells.forEach(cell => cell.classList.add('grid__cell--off'));
	showRestartBtn();
}

runGame();

// функции вывода информации (представление)

function showGameStatus(isWin, isDraw) {
	const currentPlayer = players[playerNum].shape;
	messagePlayer.textContent = currentPlayer;
	messagePlayer.classList.remove('message__player--hide');
	messagePlayer.classList.remove(`message__player--${ShapeToClass['X']}`);
	messagePlayer.classList.remove(`message__player--${ShapeToClass['O']}`);
	messagePlayer.classList.add(`message__player--${ShapeToClass[currentPlayer]}`);
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
	const playerShape = players[playerNum].shape;
	cell.classList.add(`grid__cell--${ShapeToClass[playerShape]}`);
}

function showRestartBtn() {
	restartBtn.classList.remove('restart-btn--hide');
}

function showWinMoves(winFieldset) {
	for(let i = 0; i < winFieldset.length; i++) {
		if(winFieldset[i] == 1) cells[i].classList.add('win');
	}
}

// функции изменения модели (контроллер)

function changePlayer() {
	playerNum = playerNum == 0 ? 1 : 0;
}

function savePlayerMove(cellId) {
	players[playerNum].moves[cellId] = 1;
}

function isEmptyCell(cell) {
	const shapes = Object.keys(ShapeToClass);
	return shapes.every(shape => !cell.classList.contains(`grid__cell--${ShapeToClass[shape]}`));
}

function checkWin() {
	const moves = [];
	for(let i = 0; i < WIN_COMBINATIONS.length; i++) {
		moves.push([]);
		for(let j = 0; j < WIN_COMBINATIONS[i].length; j++) {
			moves[i][j] = players[playerNum].moves[j] * WIN_COMBINATIONS[i][j];
		}
	}
	for(let i = 0; i < WIN_COMBINATIONS.length; i++) {
		if(moves[i].join() == WIN_COMBINATIONS[i].join()) {
			showWinMoves(WIN_COMBINATIONS[i]);
			return true;
		}
	}
	return false;
}

function checkDraw() {
	return !cells.some((cell) => isEmptyCell(cell));
}

function cellClickHandler(evt) {
	const cell = evt.target;
	if(isEmptyCell(cell)) {
		savePlayerMove(cell.id);
		showPlayerMove(cell);
		const isWin = checkWin();
		const isDraw = checkDraw();
		if (isWin || isDraw) {
			stopGame();
		} else {
			changePlayer();
		}
		showGameStatus(isWin, isDraw);
	}
}