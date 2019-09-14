// debugger;
let turnsCount = 0;
let cellTurn;
let thisIndex;
let cellLocations = [$('.cell1'), $('.cell2'), $('.cell3'), $('.cell4'), $('.cell5'), $('.cell6'), $('.cell7'), $('.cell8'), $('.cell9')];
let xCells = [false, false, false, false, false, false, false, false, false];
let oCells = [false, false, false, false, false, false, false, false, false];
let xPoints = 0;
let oPoints = 0;

//I will make this function DRY again - stay tuned
const updatingScoreboard = function (winnerCells, addedScoreCell, subsScoreCell, winner) {
    let counts = {};
    let addPoints = 0;
    let subsPoints = 0;
    winnerCells.forEach(function (y) { counts[y] = (counts[y] || 0) + 1; });
    if (counts.true == 3) {
        addPoints = 4;
        subsPoints = 2;
        if (winner === 'X') {
            xPoints += addPoints;
            oPoints -= subsPoints;
            addedScoreCell.html(xPoints);
            subsScoreCell.html(oPoints);
            winnerPage('X');
        }
        else if (winner === 'O') {
            oPoints += addPoints;
            xPoints -= subsPoints;
            addedScoreCell.html(oPoints);
            subsScoreCell.html(xPoints);
            winnerPage('O');
        }
    } else if (counts.true == 4) {
        addPoints = 3;
        subsPoints = 1;
        if (winner === 'X') {
            xPoints += addPoints;
            oPoints -= subsPoints;
            addedScoreCell.html(xPoints);
            subsScoreCell.html(oPoints);
            winnerPage('X');

        }
        else if (winner === 'O') {
            oPoints += addPoints;
            xPoints -= subsPoints;
            addedScoreCell.html(oPoints);
            subsScoreCell.html(xPoints);
            winnerPage('O');

        }
    } else if (counts.true == 5) {
        addPoints = 2;
        if (winner === 'X') {
            xPoints += addPoints;
            addedScoreCell.html(xPoints);
            winnerPage('X');
        }
        else if (winner === 'O') {
            oPoints += addPoints;
            addedScoreCell.html(oPoints);
            winnerPage('O');
        }
    }
};

const winnerPage = function (winner) {
    if (xPoints >= 10 || oPoints >= 10) {
        $('.container3').slideDown();
        $('#winner').text(`"${winner}" wins!`);
        $('.crown').show();
        $('.continue').hide();
        $('.play-again').fadeIn();
    }  else if (xPoints >= 10 && oPoints >= 10) {
        $('.container3').slideDown();
        $('#winner').text(`"Everyone is a Winner!`);
        $('.crown').hide();
        $('.continue').hide();
        $('.play-again').fadeIn();
    }  else {
        $('.play-again').hide();
        $('.container3').slideDown();
        $('.crown').hide();
        playAgain();
    }
}

const winnerCheck = function (winCell, winner) {
    if ((winCell[0] && winCell[1] && winCell[2]) || (winCell[0] && winCell[3] && winCell[6]) ||
        (winCell[0] && winCell[4] && winCell[8]) || (winCell[1] && winCell[4] && winCell[7]) ||
        (winCell[2] && winCell[4] && winCell[6]) || (winCell[2] && winCell[5] && winCell[8]) ||
        (winCell[3] && winCell[4] && winCell[5]) || (winCell[6] && winCell[7] && winCell[8])
    ) {
        if (winner == 'X') {
            updatingScoreboard(xCells, $('#xScore'), $('#oScore'), 'X');
        } else if (winner == 'O') {
            updatingScoreboard(oCells, $('#oScore'), $('#xScore'), 'O');
        }

    } else if (turnsCount > 8) { //maybe create a tie function first turn turnscount = 0 and then it equals 1
        $('#winner').text(`it's a draw!`);
        $('.container').hide();
        $('.container3').slideDown();
        $('.crown').hide();
        xPoints++;
        $('#xScore').html(xPoints);
        oPoints++;
        $('#oScore').html(oPoints);
        winnerPage();
    }
};

const checkXCellsValues = function () {
    for (let i = 0; i < xCells.length; i++) {
        if (thisIndex == i) {
            xCells[i] = true;
            winnerCheck(xCells, 'X');
        }
    }
};

const checkOCellsValues = function () {
    for (let i = 0; i < oCells.length; i++) {
        if (thisIndex == i) {
            oCells[i] = true;
            winnerCheck(oCells, 'O');
        }
    }
};

const xOrOPrint = function () {
    for (let i = 0; i < cellLocations.length; i++) {
        if (oCells[thisIndex] == false && xCells[thisIndex] == false) {
            if (turnsCount % 2 == 0) {
                cellTurn.html("X").hide().fadeIn().fadeIn('slow').fadeIn(9000);
                turnsCount++;
                checkXCellsValues();
            } else if (turnsCount % 2 !== 0) {
                cellTurn.html("O").hide().fadeIn().fadeIn('slow').fadeIn(9000);
                turnsCount++;
                checkOCellsValues();
            }
        }
    }
};
//make these two lines (if and else if) above into one function

const resetCells = function () {
    for (let i = 0; i < xCells.length; i++) {
        xCells[i] = false;
    } for (let i = 0; i < oCells.length; i++) {
        oCells[i] = false;
    } for (let i = 0; i < cellLocations.length; i++) {
        cellLocations[i].text('');
    }
    turnsCount = 0;
    startingGame();
}
const playAgain = function () {
    $('.continue').on('click', function () {
        $('.container3').hide();
        $('.container2').slideDown('slow');
        resetCells();
    });
    $('.play-again').on('click', function () {
        $('.container3').hide();
        $('.container2').slideDown('slow');
        xPoints = 0;
        $('#xScore').html(xPoints);
        oPoints = 0;
        $('#oScore').html(oPoints);
        resetCells();
    });
    $('.quit').on('click', function () {
        $('.container2').hide();
        $('.container3').hide();
        $('.container').slideDown('slow');
        xPoints = 0;
        $('#xScore').html(xPoints);
        oPoints = 0;
        $('#oScore').html(oPoints);
        resetCells();
    })
};

const startingGame = function () {
    $('.cell').on('click', function () {
        cellTurn = $(this);
        thisIndex = $(this).attr("data-id");
        xOrOPrint();
    })
};

const startGameButton = function () {
    $('.start').on('click', function () {
        $('.container').hide();
        $('.container2').slideDown('slow');
        startingGame();
    }
    )
    $('#scoreboard').on('click', function () {
        $('.scoreToggle').fadeToggle();
    }
    )
}

const settingUpPages = function () {
    $('.container2').hide();
    $('.container3').hide();
    $('a').hide();
    $('a').slideDown('slow');
    startGameButton();
}
$(document).ready(settingUpPages);


//todo:

//make it responsive
//learn how to creat modals
// add a strike through line when someone wins?
// check why live server does not work outside of those directories

//ask aaron for help with read.me

//check points system
//x always starts - how to solve
//Scores hide
//show them instead of wins
// when it gets to 10 someone wins
//make the transitioon to winner window a bit smother