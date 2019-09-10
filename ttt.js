let turnsCount = 0;
let cellTurn;
let thisIndex;

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

let xCells = [{
    cellElement: false
},
{
    cellElement: false
},
{
    cellElement: false
},
{
    cellElement: false
},
{
    cellElement: false
},
{
    cellElement: false
},
{
    cellElement: false
},
{
    cellElement: false
},
{
    cellElement: false
}];

let oCells = [{
    cellElement: false
},
{
    cellElement: false
},
{
    cellElement: false
},
{
    cellElement: false
},
{
    cellElement: false
},
{
    cellElement: false
},
{
    cellElement: false
},
{
    cellElement: false
},
{
    cellElement: false
}
];

const checkingXCellsValues = function () {
    for (let i = 0; i < xCells.length; i++) {
        if (thisIndex == i) {
            xCells[i].cellElement = true;
            winnerCheck(xCells, 'X');
        }
    }
};

const checkingOCellsValues = function () {
    for (let i = 0; i < oCells.length; i++) {
        if (thisIndex == i) {
            oCells[i].cellElement = true;
            winnerCheck(oCells, 'O');
        }
    }
};

const winnerCheck = function (value, winner) {
    if ((value[0].cellElement && value[1].cellElement && value[2].cellElement) ||
        (value[0].cellElement && value[3].cellElement && value[6].cellElement) ||
        (value[0].cellElement && value[4].cellElement && value[8].cellElement) ||
        (value[1].cellElement && value[4].cellElement && value[7].cellElement) ||
        (value[2].cellElement && value[4].cellElement && value[6].cellElement) ||
        (value[2].cellElement && value[5].cellElement && value[8].cellElement) ||
        (value[3].cellElement && value[4].cellElement && value[5].cellElement) ||
        (value[6].cellElement && value[7].cellElement && value[8].cellElement)
    ) {
        alert(`${winner} is the winner`);
        resetTrueOrFalse();
    }
};

const resetTrueOrFalse = function () {
    for (let i = 0; i < xCells.length; i++) {
        xCells[i].cellElement = false;
    } for (let i = 0; i < oCells.length; i++) {
        oCells[i].cellElement = false;
    } 
}

const xOrOPrint = function () {
    if (turnsCount % 2 == 0) {
        cellTurn.text('X');
        turnsCount++;
        checkingXCellsValues();
    } else if (turnsCount % 2 !== 0) {
        cellTurn.text('O');
        turnsCount++;
        checkingOCellsValues();
    } else if (turnsCount === 8) {
        alert(`DRAW!`);
    }
};

$(document).ready(function () {

    $('.cell').one('click', function () {
        cellTurn = $(this);
        thisIndex = $(this).attr("data-id");
        xOrOPrint();
    })

});  
