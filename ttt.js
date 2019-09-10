let cellsLocation = {
    cell1Location: $('.cell1'),
    cell2Location: $('.cell2'),
    cell3Location: $('.cell3'),
    cell4Location: $('.cell4'),
    cell5Location: $('.cell5'),
    cell6Location: $('.cell6'),
    cell7Location: $('.cell7'),
    cell8Location: $('.cell8'),
    cell9Location: $('.cell9')
};

let xOrOCells;

let xCells = {
    cell1Element: false,
    cell2Element: false,
    cell3Element: false,
    cell4Element: false,
    cell5Element: false,
    cell6Element: false,
    cell7Element: false,
    cell8Element: false,
    cell9Element: false
};

let oCells = [{
    cell1Element: true,
    cell2Element: true,
    cell3Element: true,
    cell4Element: false,
    cell5Element: false,
    cell6Element: false,
    cell7Element: false,
    cell8Element: false,
    cell9Element: false
}];

const checkingCellsValues = function () {
    for (const i in cellsLocation) {
        if (cellsLocation[i].val() === 'X') { //does it really get the value
            for (const j in xCells)
                xCells[j] = true;
        } else if (cellsLocation[i].val() === 'O') {
            for (const j in oCells)
                oCells[j] = true;
        }
    }
    updatingXorOCellsToX();
};

const updatingXorOCellsToX = function () {
    xOrOCells = [];
    xOrOCells.push(xCells);
    winnerCheck();
};

const updatingXorYCellsToO = function () {
    xOrOCells = [];
    xOrOCells.push(oCells);
    winnerCheck();
};

const winnerCheck = function () {
    if ((xOrOCells[0].cell1Element && xOrOCells[0].cell2Element && xOrOCells[0].cell3Element) ||
        (xOrOCells[0].cell1Element && xOrOCells[0].cell4Element && xOrOCells[0].cell7Element) ||
        (xOrOCells[0].cell1Element && xOrOCells[0].cell5Element && xOrOCells[0].cell9Element) ||
        (xOrOCells[0].cell2Element && xOrOCells[0].cell5Element && xOrOCells[0].cell8Element) ||
        (xOrOCells[0].cell3Element && xOrOCells[0].cell5Element && xOrOCells[0].cell7Element) ||
        (xOrOCells[0].cell3Element && xOrOCells[0].cell6Element && xOrOCells[0].cell9Element) ||
        (xOrOCells[0].cell4Element && xOrOCells[0].cell5Element && xOrOCells[0].cell6Element) ||
        (xOrOCells[0].cell7Element && xOrOCells[0].cell8Element && xOrOCells[0].cell9Element)
    ) {
        alert(`${xOrOCells[0]} is the winner`);
        console.log(`${xOrOCells[0]} is the winner`);
    }
    else {
        updatingXorYCellsToO();
    }
};


//THIS IS MY OLD FUNCTION WITH FOR LOOP INSTEAD

// const cellsCheck = function () {
//     for (let index = 0; index < xOrYCells.length; index++) {
// if (cell1Element[i] === 'x') {
//     xOrYCells[0] === true;
// }
//         if ((xOrYCells[0].cell1Element && xOrYCells[0].cell2Element && xOrYCells[0].cell3Element) ||
//             (xOrYCells[0].cell1Element && xOrYCells[0].cell4Element && xOrYCells[0].cell7Element) ||
//             (xOrYCells[0].cell1Element && xOrYCells[0].cell5Element && xOrYCells[0].cell9Element) ||
//             (xOrYCells[0].cell2Element && xOrYCells[0].cell5Element && xOrYCells[0].cell8Element) ||
//             (xOrYCells[0].cell3Element && xOrYCells[0].cell5Element && xOrYCells[0].cell7Element) ||
//             (xOrYCells[0].cell3Element && xOrYCells[0].cell6Element && xOrYCells[0].cell9Element) ||
//             (xOrYCells[0].cell4Element && xOrYCells[0].cell5Element && xOrYCells[0].cell6Element) ||
//             (xOrYCells[0].cell7Element && xOrYCells[0].cell8Element && xOrYCells[0].cell9Element)
//         ) {
//             console.log(`${xOrYCells[0]} is the winner`);
//         }
//         else {
//             tie();
//         }
//     }
// };


let turnsCount = 0;
let cellTurn;

const xOrOPrint = function () {
    // if (cellTurn.val() === 'X' || 'O') {
    //     alert(`You can't select this cell twice`);
    // }
    // else
    if (turnsCount % 2 === 0) {
        cellTurn.text('X');
        turnsCount++;
    } else {
        cellTurn.text('O');
        turnsCount++;
        if (turnsCount === 10) {
            turnsCount++;
            alert(`DRAW!`);
        }
    }
}


$(document).ready(function () {

    $('.cell1').click(function () {
        cellTurn = $(this);
        xOrOPrint();
    })
    $('.cell2').click(function () {
        cellTurn = $(this);
        xOrOPrint();
    })
    $('.cell3').click(function () {
        cellTurn = $(this);
        xOrOPrint();
    })
    $('.cell4').click(function () {
        cellTurn = $(this);
        xOrOPrint();
    })
    $('.cell5').click(function () {
        cellTurn = $(this);
        xOrOPrint();
    })
    $('.cell6').click(function () {
        cellTurn = $(this);
        xOrOPrint();
    })
    $('.cell7').click(function () {
        cellTurn = $(this);
        xOrOPrint();
    })
    $('.cell8').click(function () {
        cellTurn = $(this);
        xOrOPrint();
    })
    $('.cell9').click(function () {
        cellTurn = $(this);
        xOrOPrint();
    })


});  
