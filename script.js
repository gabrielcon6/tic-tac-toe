let turnsCount = 0;
let cellTurn;
let thisIndex;
let cellLocations = [$('.cell1'), $('.cell2'), $('.cell3'), $('.cell4'), $('.cell5'), $('.cell6'), $('.cell7'), $('.cell8'), $('.cell9')];
let xCells = [false, false, false, false, false, false, false, false, false];
let oCells = [false, false, false, false, false, false, false, false, false];
let xPoints = 0;
let oPoints = 0;
let counts;

const updatingScoreboard = function (winnerCells, addedScoreCell, subsScoreCell, addPoints, subsPoints) {
    counts = {};
    winnerCells.forEach(function (y) { counts[y] = (counts[y] || 0) + 1; });
    if (counts.true == 3) {
        addPoints += 4;
        subsPoints -= 2;
    } else if (counts.true == 4) {
        addPoints += 3;
        subsPoints -= 1;
    } else if (counts.true == 5) {
        addPoints += 2;
    }
    addedScoreCell.html(addPoints);
    subsScoreCell.html(subsPoints);
    playAgain();
}

const winnerCheck = function (value, winner) {
    if ((value[0] && value[1] && value[2]) || (value[0] && value[3] && value[6]) ||
        (value[0] && value[4] && value[8]) || (value[1] && value[4] && value[7]) ||
        (value[2] && value[4] && value[6]) || (value[2] && value[5] && value[8]) ||
        (value[3] && value[4] && value[5]) || (value[6] && value[7] && value[8])
    ) {
        $('#winner').text(`"${winner}" wins!`);
        $('.container').hide();
        $('.container3').slideDown();
        if (winner == 'X') {
            updatingScoreboard(xCells, $('#xScore'), $('#oScore'), xPoints, oPoints);
        } else if (winner == 'O') {
            updatingScoreboard(oCells, $('#oScore'), $('#xScore'), oPoints, xPoints)
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
        playAgain();
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
    $('.play-again').on('click', function () {
        $('.container').hide();
        $('.container3').hide();
        $('.container2').slideDown('slow');
        resetCells();
    });
    $('.quit').on('click', function () {
        $('.container2').hide();
        $('.container3').hide();
        $('.container').slideDown('slow');
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
        // $('#scoreboard').addClass('animated bounceInDown delay-0.7s');
        startingGame();
    }
    )
    $('#scoreboard').on('click', function () {
        $('.scoreToggle').toggle();
        // $('.scoreToggle').slideDown('slow');
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