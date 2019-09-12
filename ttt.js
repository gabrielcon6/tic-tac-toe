let turnsCount = 0;
let cellTurn;
let thisIndex;

let cellLocations = [{
    cellLocation: $('.cell1')
},
{
    cellLocation: $('.cell2')
},
{
    cellLocation: $('.cell3')
},
{
    cellLocation: $('.cell4')
},
{
    cellLocation: $('.cell5')
},
{
    cellLocation: $('.cell6')
},
{
    cellLocation: $('.cell7')
},
{
    cellLocation: $('.cell8')
},
{
    cellLocation: $('.cell9')
}
];

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
        resetCells();
    } else if (turnsCount > 8) {
        alert(`It's a draw!`);
        resetCells();
    }
};

const resetCells = function () {
    for (let i = 0; i < xCells.length; i++) {
        xCells[i].cellElement = false;
    } for (let i = 0; i < oCells.length; i++) {
        oCells[i].cellElement = false;
    } for (let i = 0; i < cellLocations.length; i++) {
        cellLocations[i].cellLocation.text('');
    }
    turnsCount = 0;
    startingGame();
}

const xOrOPrint = function () {
    if (turnsCount % 2 == 0) {
        cellTurn.html("X").hide().fadeIn().fadeIn('slow').fadeIn(9000);
        turnsCount++;
        checkingXCellsValues();
    } else if (turnsCount % 2 !== 0) {
        cellTurn.html("O").hide().fadeIn().fadeIn('slow').fadeIn(9000);
        turnsCount++;
        checkingOCellsValues();
    }
};

const startingGame = function () {
    $('.cell').one('click', function () {
        cellTurn = $(this);
        thisIndex = $(this).attr("data-id");
        xOrOPrint();
    })
};

const startGameButton = function () {
    $('a').hide();
    $('a').slideDown('slow');
    startingGame();
}

$(document).ready(startGameButton);


//todo
//make it responsive
//create modal for the winner
// add a crossing line when someone wins?
// when I play the second time one character still appears
// check why live server does not work outside of those directories