'use strict'


var livesCount = 3;
var gBoard = [];
var gLevel = {
    size: 4,
    mines: 2
}
var FirstClick = 0;
var isGameOn = false;
var startTime = 0;
var seconds = 0;
var clickCount = 0;
var safeClicks = 3;
var setIntervalId;
var setIntervalEmojy
var ellives = document.querySelector('.lives')
var elEmoji = document.querySelector('.smile')
var elTimer = document.querySelector('.timer');
var elBoard = document.querySelector('.board');
var elAvailble = document.querySelector('.clicks')

function startTimer() {
    setIntervalId = setInterval(function () {
        seconds++;
        elTimer.innerText = ` ⌛ ${seconds}`;
    }, 1000);
}

function beginnerMode() {
    gLevel = {
        size: 4,
        mines: 2
    }
    init()
}

function mediumMode() {
    gLevel = {
        size: 8,
        mines: 12
    }
    init()
}

function expertMode() {
    gLevel = {
        size: 12,
        mines: 30
    }
    init()
}

function init() {
    isGameOn = true
    gBoard = createBoard();
    FirstClick = 0;
    livesCount = 3;
    safeClicks = 3;
    clickCount = 0;
    seconds = 0;
    ellives = document.querySelector('.lives')
    ellives.style.color = 'blue'
    ellives.style.fontSize = '30px'
    ellives.innerText = livesCount + ' LIVES LEFT'
    var elWin = document.querySelector('.win');
    elWin.style.display = 'none';
    var elLose = document.querySelector('.lose');
    elLose.style.display = 'none';
    elEmoji.innerText = '😀';
    ellives.innerText = livesCount + ' LIVES LEFT'
    elTimer.innerText = ` ⌛ 0`;
    elAvailble = document.querySelector('.clicks')
    elAvailble.innerText = `${safeClicks} clicks available`
    clearInterval(setIntervalId)
    renderBoard(gBoard);
}

function createBoard() {
    //create board//
    var board = [];
    for (var i = 0; i < gLevel.size; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.size; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
            board[i][j] = cell;
        }
    }

    return board;
}

function createMines(posI, posJ) {
    for (var i = 0; i < gLevel.mines; i++) {
        var row = getRandomIntInclusive(0, gLevel.size - 1);
        var col = getRandomIntInclusive(0, gLevel.size - 1);
        if (gBoard[row][col].isMine) {
            i--;
            continue;
        }
        if (gBoard[posI][posJ] === gBoard[row][col]) {
            i--;
            continue;
        }
        gBoard[row][col].isMine = true;
    }
    //create negs//
    for (var i = 0; i < gLevel.size; i++) {
        for (var j = 0; j < gLevel.size; j++) {
            gBoard[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j);
        }
    }
}

function setMinesNegsCount(board, rowIdx, colIdx) {
    var minesCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board.length) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (board[i][j].isMine === true) minesCount++;
        }
    }
    return minesCount;
}

function renderBoard(board) {
    // console.table(board);
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var className = 'cell'
            var isMine = (cell.isMine) ? '💣' : cell.minesAroundCount;
            var isShown = (cell.isShown) ? isMine : '';
            // console.log(setMinesNegsCount(gBoard, i, j))
            strHTML += `<td data-i="${i}" data-j="${j}"
            onmousedown="isClicked(this, ${i},${j}, event)"
            class="${className}">${isShown}</td>`
        }
        strHTML += '</tr>';
        // console.log(gBoard)
    }
    elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function isClicked(elCell, posI, posJ, ev) {
    if (isGameOn) {
        if (ev.button === 1) return;

        if (FirstClick === 0) {
            createMines(posI, posJ);
            FirstClick++;
            startTimer();
            startTime = Date.now();
        }
        if (ev.button === 0) {
            cellClicked(elCell, posI, posJ);
        }
        if (ev.button === 2) cellMarked(elCell, posI, posJ);
    }
}

function cellClicked(elCell, posI, posJ) {
    if (gBoard[posI][posJ].isMarked) {
        return;
    }
    if (gBoard[posI][posJ].minesAroundCount === 0) {
        getNegs(posI, posJ)
    }
    gBoard[posI][posJ].isShown = true;
    if (!gBoard[posI][posJ].isMine) {
        elCell.innerText = gBoard[posI][posJ].minesAroundCount;
    } else {
        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard.length; j++) {
                if (gBoard[i][j].isMine && livesCount === 1) {
                    var elMine = document.querySelector(`td[data-i="${i}"][data-j="${j}"]`)
                    elMine.innerText = '💣';


                }
            }
        }
        elCell.innerText = '💣';
        livesCount--
        ellives.style.fontSize = '70px';
        setInterval(function () {
            if (livesCount && livesCount === 2) {
                ellives.innerText = livesCount + ' LIVES LEFT'
                ellives.style.color = 'orange'
                ellives.style.fontSize = '30px'
            }
            if (livesCount === 1) {
                ellives.innerText = livesCount + ' LIVES LEFT'
                ellives.style.color = 'red'
                ellives.style.fontSize = '30px'

            }
            if (livesCount === 0) ellives.innerText = `0 LIVES, GAME OVER`
        }, 2000)
        elEmoji.innerText = '😱'
        setIntervalEmojy = setInterval(function () {
            if (livesCount && !gBoard[posI][posJ].isMarked) {
                elCell.innerText = '';
                elEmoji.innerText = '😀';
            }
        }, 1000)
    }
    gBoard[posI][posJ].isShown = true

    if (gBoard[posI][posJ].isShown &&
        gBoard[posI][posJ].isMine &&
        livesCount > 0) {
        gBoard[posI][posJ].isShown = false

    }
    checkGameOver(posI, posJ);
}




function cellMarked(elCell, posI, posJ) {
    if (!gBoard[posI][posJ].isShown && !gBoard[posI][posJ].isMarked) {
        elCell.innerText = '🏁';
        gBoard[posI][posJ].isMarked = true;
    } else if (gBoard[posI][posJ].isMarked) {
        gBoard[posI][posJ].isMarked = false;
        elCell.innerText = '';
    }
    checkGameOver(posI, posJ);
    // console.log(gBoard[i][j])
}

function checkGameOver(posI, posJ) {
    // console.log(gBoard[i][j])
    var counter = 0;
    var elEmoji = document.querySelector('.smile')
    if (gBoard[posI][posJ].isMine && gBoard[posI][posJ].isShown) {
        if (livesCount <= 0) {
            var elLose = document.querySelector('.lose');
            elLose.style.display = 'inline';
            clearInterval(setIntervalEmojy)
            clearInterval(setIntervalId)
            clearInterval(setIntervalLife)
            elEmoji.innerText = '😱'
            isGameOn = false

        }
    }
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isMarked) counter++
            if (!gBoard[i][j].isShown && !gBoard[i][j].isMarked) {
                return
            }
            if (gLevel.mines < counter) {
                return
            }
        }
    }
    isGameOn = false
    var elWin = document.querySelector('.win');
    elWin.style.display = 'inline';
    clearInterval(setIntervalEmojy)
    clearInterval(setIntervalId)
    elEmoji.innerText = '😘'
    var endTime = Date.now();
    var gameTime = endTime - startTime;
    // localStorage.setItem('Game Time', gameTime);
    var bestEasy = localStorage.getItem('BestTimeEasy');
    var bestMed = localStorage.getItem('BestTimeMed');
    var bestHard = localStorage.getItem('BestTimeHard');
    switch (gLevel.size) {
        case 4:
            if (gameTime < bestEasy || !bestEasy) bestEasy = localStorage.setItem('BestTimeEasy', gameTime);
            break;
        case 8:
            if (gameTime < bestMed || !bestMed) localStorage.setItem('BestTimeMed', gameTime);
            break;
        case 12:
            if (gameTime < bestHard || !bestHard) localStorage.setItem('BestTimeHard', gameTime);
            break;

    }
    console.log('win');
}



function getNegs(rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard.length) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (gBoard[i][j].isMarked) continue;
            if (gBoard[i][j].isShown) continue;

            var elNeg = document.querySelector(`td[data-i="${i}"][data-j="${j}"]`);
            elNeg.innerText = gBoard[i][j].minesAroundCount;
            gBoard[i][j].isShown = true;
            if (gBoard[i][j].minesAroundCount === 0) {
                getNegs(i, j);
            }
        }
    }
}

function safeClick() {
    elAvailble = document.querySelector('.clicks');
    if (safeClicks > 0) {
        var row = getRandomIntInclusive(0, gLevel.size - 1);
        var col = getRandomIntInclusive(0, gLevel.size - 1);
        if (gBoard[row][col].isMine || gBoard[row][col].isMarked || gBoard[row][col].isShown) {
            safeClick()
        } else
            safeClicks--
        //   console.log(safeClicks);
        gBoard[row][col].isShown = true;
        var elCell = document.querySelector(`td[data-i="${row}"][data-j="${col}"]`)
        elCell.innerText = gBoard[row][col].minesAroundCount
        setTimeout(function () {
            gBoard[row][col].isShown = false
            elCell.innerText = ''
            elAvailble.innerText = `${safeClicks} clicks available`
        }, 2000)
    }
}
