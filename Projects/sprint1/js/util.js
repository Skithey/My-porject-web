function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function createBoard() {
//     var board = [];
//     for (var i = 0; i < 4; i++) {
//         board[i] = []
//         for (var j = 0; j < 4; j++) {
//             var cell = {
//                 minesAroundCount: 4,
//                 isShown: false,
//                 isMine: false,
//                 isMarked: false
//             }
//             board[i][j] = cell
//         }
//     }
//     randomMines(board)
//     return board;
// }

// function randomMines(gBoard){
//     var ranMines = [];
//     for (var i = 0; i < gLevel.mines; i++) {
//         var row = getRandomIntInclusive(0, gLevel.size - 1);
//         var col = getRandomIntInclusive(0, gLevel.size - 1);
//         board[row][col].isMine = true;
//         ranMines.push(row);
//         ranMines.push(col)
//     }
//     // console.log(ranMines);
//     return ranMines
// }

// function renderBoard(board) {
//     // console.table(board);
//     var strHTML = '';
//     for (var i = 0; i < board.length; i++) {
//         strHTML += '<tr>'
//         for (var j = 0; j < board[0].length; j++) {
//             var cell = board[i][j];
//             var ifMine = (cell.isMine) ? '💣' : setMinesNegsCount(board, i, j);
//             var ifShown = (cell.isShown) ? ifMine : '';
//             {
//                 var className = (board[i][j] === '💣') ? 'mine' : 'num'
//                 strHTML += `<td data-i="${i}" data-j="${j}"
//                 onclick="cellClicked(this , ${i},${j},event)" 
//                 class="${className}" onmousedown="cellMarked(event,this,${i},${j})"
//                 >
//                 ${ifShown}</td>`
//             }
//             // console.log(board[i][j]);
//         }

//         strHTML += '</tr>'
//     }
//     var elBoard = document.querySelector('.board');
//     elBoard.innerHTML = strHTML
// }

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// function renderCell(location, value) {
//     // Select the elCell and set the value
//     var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
//     elCell.innerHTML = value;
// }


            // function printMat(mat, selector) {
            //     var strHTML = '<table border="0"><tbody>';
            //     for (var i = 0; i < mat.length; i++) {
            //         strHTML += '<tr>';
            //         for (var j = 0; j < mat[0].length; j++) {
            //             var cell = mat[i][j];
            //             var className = 'cell cell' + i + '-' + j;
            //             strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
            //         }
            //         strHTML += '</tr>'
            //     }
            //     strHTML += '</tbody></table>';
            //     var elContainer = document.querySelector(selector);
            //     elContainer.innerHTML = strHTML;
            // }
            // onmousedown="cellUnMarked(event,this)"