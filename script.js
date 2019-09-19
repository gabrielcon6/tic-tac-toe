let turnsCount = 0;
let cellTurn;
let thisIndex;
let cellLocations = [$('.cell1'), $('.cell2'), $('.cell3'), $('.cell4'), $('.cell5'), $('.cell6'), $('.cell7'), $('.cell8'), $('.cell9')];
let xCells = [false, false, false, false, false, false, false, false, false];
let oCells = [false, false, false, false, false, false, false, false, false];
let xPoints = 0;
let oPoints = 0;
let gameNumber = 0;
let maxTurns = 8;

const resetCells = function () {
    for (i in xCells) {
        xCells[i] = false;
    }
    for (j in oCells) {
        oCells[j] = false;
    }
    for (k in cellLocations) {
        cellLocations[k].text('');
    }
    turnsCount = gameNumber;
    startingGame();
}

const playAgain = function () {
    $('.continue').on('click', function () {
        $('td').css({ 'width': '25vw', 'height': '20vh' });
        $('.container3').hide();
        $('.container2').slideDown('slow');
        resetCells();
    });
    $('.play-again').on('click', function () {
        $('td').css({ 'width': '25vw', 'height': '20vh' });
        $('.container3').hide();
        $('.container2').slideDown('slow');
        xPoints = 0;
        $('#xScore').html(xPoints);
        oPoints = 0;
        $('#oScore').html(oPoints);
        resetCells();
    });
    $('.quit').on('click', function () {
        $('td').css({ 'width': '25vw', 'height': '20vh' });
        $('.container2, .container3').hide();
        $('.container').slideDown('slow');
        xPoints = 0;
        $('#xScore').html(xPoints);
        oPoints = 0;
        $('#oScore').html(oPoints);
        resetCells();
    })
};

const winnerPage = function (winner, loser, sign1, plusPoints, sign2, minusPoints) {
    for (i in xCells) {
        xCells[i] = true;
    }
    for (j in oCells) {
        oCells[j] = true;
    }
    if (xPoints >= 10 || oPoints >= 10) {
        $('td').css({ 'width': '5vw', 'height': '10vh' });
        $('.container3').slideDown();
        $('#winner').show().html(`"${winner}" wins!`);
        $('.crown').show();
        $('.continue').hide();
        $('.play-again').fadeIn();
        //localStorage.getItem
    } else if (xPoints >= 10 && oPoints >= 10) {
        $('td').css({ 'width': '5vw', 'height': '10vh' });
        $('.container3').slideDown();
        $('#winner').show().html(`"Everyone is a Winner!`);
        $('.crown').show();
        $('.continue').hide();
        $('.play-again').fadeIn();
    } else if (turnsCount <= maxTurns + 1) {
        $('td').css({ 'width': '5vw', 'height': '10vh' });
        $('.play-again').hide();
        $('.crown').hide();
        $('#winner').html(`${winner}: <span style="color:#3498db">${sign1} ${plusPoints}</span> <br>
                         ${loser}: <span style="color:#3498db">${sign2} ${minusPoints}</span>`);
        $('.continue, .quit').show();
        $('.container3').slideDown();
        playAgain();
    }
}

const calcPointsX = function (add, sub, addedScoreCell, subScoreCell) {
    let addValue = add;
    let subValue = sub;
    xPoints += addValue;
    oPoints -= subValue;
    addedScoreCell.html(xPoints);
    subScoreCell.html(oPoints);
    winnerPage('X', 'O', '+', addValue, '-', subValue);
}

const calcPointsO = function (add, sub, addedScoreCell, subScoreCell) {
    let addValue = add;
    let subValue = sub;
    oPoints += addValue;
    xPoints -= subValue;
    addedScoreCell.html(oPoints);
    subScoreCell.html(xPoints);
    winnerPage('O', 'X', '+', addValue, '-', subValue);
}

const updatingScoreboard = function (winnerCells, winner) {
    let counts = {};
    winnerCells.forEach(function (y) {
        counts[y] = (counts[y] || 0) + 1;
    });
    if (counts.true == 3) {
        if (winner === 'X') {
            calcPointsX(4, 2, $('#xScore'), $('#oScore'));
        } else if (winner === 'O') {
            calcPointsO(4, 2, $('#oScore'), $('#xScore'));
        }
    } else if (counts.true == 4) {
        if (winner === 'X') {
            calcPointsX(3, 1, $('#xScore'), $('#oScore'));
        }
        else if (winner === 'O') {
            calcPointsO(3, 1, $('#oScore'), $('#xScore'));
        }
    } else if (counts.true == 5) {
        if (winner === 'X') {
            calcPointsX(2, 0, $('#xScore'), $('#oScore'));
        }
        else if (winner === 'O') {
            calcPointsO(2, 0, $('#oScore'), $('#xScore'));
        }
    }
};

const draw = function () {
    gameNumber++;
    maxTurns++;
    $('.container3').slideDown();
    $('.crown').hide();
    $('.play-again').hide();
    $('.continue').show();
    xPoints++;
    $('#xScore').html(xPoints);
    oPoints++;
    $('#oScore').html(oPoints);
    winnerPage('X', 'O', '+', '1', '+', '1');
}

const winnerCheck = function (winCell, winner) {
    if ((winCell[0] && winCell[1] && winCell[2]) || (winCell[0] && winCell[3] && winCell[6]) ||
        (winCell[0] && winCell[4] && winCell[8]) || (winCell[1] && winCell[4] && winCell[7]) ||
        (winCell[2] && winCell[4] && winCell[6]) || (winCell[2] && winCell[5] && winCell[8]) ||
        (winCell[3] && winCell[4] && winCell[5]) || (winCell[6] && winCell[7] && winCell[8])
    ) {
        if (winner == 'X') {
            gameNumber++;
            maxTurns++;
            updatingScoreboard(xCells, 'X');
        } else if (winner == 'O') {
            gameNumber++;
            maxTurns++;
            updatingScoreboard(oCells, 'O');
        }
    } else if (turnsCount > maxTurns) {
        draw();
    }
};

const xOrOPrint = function (turn) {
    cellTurn.html(turn).hide().fadeIn().fadeIn('slow').fadeIn(9000);
    turnsCount++;
    if (turn === 'X') {
        xCells[thisIndex] = true;
        winnerCheck(xCells, 'X');
    } else if (turn === 'O') {
        oCells[thisIndex] = true;
        winnerCheck(oCells, 'O');
    }
};

const xOrOTurn = function () {
    if (oCells[thisIndex] == false && xCells[thisIndex] == false) {
        if (turnsCount % 2 == 0) {
            xOrOPrint('X');
        } else if (turnsCount % 2 !== 0) {
            xOrOPrint('O');
        }
    }
};

const startingGame = function () {
    $('.cell').on('click', function () {
        cellTurn = $(this);
        thisIndex = $(this).attr("data-id");
        xOrOTurn();
    })
};

const startGameButton = function () {
    $('.start-button').on('click', function () {
        $('.container').hide();
        $('.container2').slideDown('slow');
        startingGame();
    })
    $('#scoreboard').on('click', function () {
        $('.scoreToggle').fadeToggle();
    })
};

const settingUpPages = function () {
    $('.container2').hide();
    $('.container3').hide();
    $('a').hide();
    $('a').slideDown('slow');
    startGameButton();
};

$(document).ready(settingUpPages);


//todo:
//read.me traduzir do pt
//comments
//do code review