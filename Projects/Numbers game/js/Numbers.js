'use strict'

var gBoardSize = 4;
var gNums;
var gGameInterval;
var gNum = 1;
var seconds = 0;
var milisec = seconds / 10;
var setIntervalId;

function init() {
    gNums = createNum()
    renderBoard()
}


function createNum() {
    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    shuffle(nums)
    return nums
}


function renderBoard() {
    var strHTML = '';
    for (var i = 0; i < gBoardSize; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gBoardSize; j++) {
            var num = gNums.pop();
            strHTML += `<td onclick="cellClicked(this,${i},${j})"> ${num} </td>`
        }
        strHTML += '</tr>';
    }
    var elTable = document.querySelector('.board');
    elTable.innerHTML = strHTML;
}

function cellClicked(clickedNum) {
    console.log(clickedNum);
    if (gNum === +clickedNum.innerText) {
        clickedNum.style.backgroundColor = 'red'
        gNum++
    }
    if (+clickedNum.innerText === 1) startTimer()
}

function startTimer() {

    setIntervalId = setInterval(function () {
        var elTime = document.querySelector('.time');
        milisec++
        elTime.innerText = `Timer:${seconds}.${milisec}`
        if (milisec === 99) {
            milisec = 0
            seconds++
        }
    }, 10)
}

function easyMode() {
    gNum = 1
    gBoardSize = 4;
    clearInterval(setIntervalId)
    seconds = 0
    milisec = 0
    gNums = createNum()
    renderBoard()
}

function hardMode() {
    gNum = 1
    gBoardSize = 5;
    clearInterval(setIntervalId)
    seconds = 0
    milisec = 0
    gNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    shuffle(gNums)
    renderBoard()
}

function extremeMode() {
    gNum = 1
    gBoardSize = 6;
    clearInterval(setIntervalId)
    seconds = 0
    milisec = 0
    gNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
        28, 29, 30, 31, 32, 33, 34, 35, 36]
    shuffle(gNums)
    renderBoard()
}
