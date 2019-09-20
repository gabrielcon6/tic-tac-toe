//to understand the code's logic better, please read it from bottom to top

const cellLocations = [$('.cell-1'), $('.cell-2'), $('.cell-3'), $('.cell-4'), $('.cell-5'), $('.cell-6'), $('.cell-7'), $('.cell-8'), $('.cell-9')];
let cellVal = [false, false, false, false, false, false, false, false, false];
let turnsCount = 0;
let cellTurn;
let thisIndex;
let xPoints = 0;
let oPoints = 0;
let gameNumber = 0;
let maxTurns = 8;

const playingAgain = function () { // cleaning up everything to go to start a new
    for (i in cellLocations) {
        cellLocations[i].text('');
    }
    for (i in cellVal) {
        cellVal[i] = false;
    }
    $('td').css({ 'width': '25vw', 'height': '20vh' });
    $('.container-3').hide();
    $('.container-2').slideDown('slow');
    xPoints = 0;
    $('#x-score').html(xPoints);
    oPoints = 0;
    $('#o-score').html(oPoints);
    if (gameType == '1 Player') {
        starting1PGame();
    } else if (gameType == '2 Players') {
        starting2PGame();
    }
}

const continuingGame = function () { // cleaning up everything to go to the next round of a game
    for (i in cellLocations) {
        cellLocations[i].text('');
    }
    for (i in cellVal) {
        cellVal[i] = false;
    }
    $('td').css({ 'width': '25vw', 'height': '20vh' });
    $('.container-3').hide();
    $('.container-2').slideDown('slow');
    if (gameType == '1 Player') { //to make sure it redirects to the right game
        starting1PGame();
    } else if (gameType == '2 Players') {
        starting2PGame();
    }
}
const gameOptions = function () {
    for (i in cellVal) { //all true (random pick) so no one can click on the cells whilst showing with the results
        cellVal[i] = true;
    }
    turnsCount = gameNumber;
    $('.continue').on('click', function () {
        continuingGame();
    });
    $('.play-again').on('click', function () {
        playingAgain();
    });
    $('.quit').on('click', function () {
        window.location.reload(); // this reloads game to initial page, in case someone quits.
    })
};

const winnerPage = function (winner, loser, sign1, plusPoints, sign2, minusPoints) {
    if (xPoints >= 10 && oPoints >= 10) { // if both players get to 10 points
        $('td').css({ 'width': '5vw', 'height': '10vh' });
        $('.container-3').slideDown( 1500 );
        $('#winner').slideDown( 1500 ).html(`"Everyone is a Winner!`);
        $('.crown').show();
        $('.continue').hide();
        $('.play-again').fadeIn();
    } else if (xPoints >= 10 || oPoints >= 10) { // if only one player gets to 10 points
        $('td').css({ 'width': '5vw', 'height': '10vh' });
        $('.container-3').slideDown( 1500 );
        $('#winner').slideDown( 1500 ).html(`"${winner}" wins!`);
        $('.crown').show();
        $('.continue').hide();
        $('.play-again').fadeIn();
    } else if (turnsCount <= maxTurns + 1) { // if no one gets to 10 points the game goes on
        $('td').css({ 'width': '5vw', 'height': '10vh' });
        $('.play-again').hide();
        $('.crown').hide();
        $('#winner').html(`${winner}: <span style="color:#3498db">${sign1} ${plusPoints}</span> <br>
                         ${loser}: <span style="color:#3498db">${sign2} ${minusPoints}</span>`);
        $('.continue, .quit').show();
        $('.container-3').slideDown();
        gameOptions();
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

const updatingScoreboard = function (winner) {
    let counts = 0;
    for (i in cellVal) {
        if (cellVal[i] === winner) {
            counts++;
        }
    } // counting how many 1 or -1 are in the array that register each go
    if (counts === 3) { // this is how we define the points. please see read.me file to understand how the scores work.
        if (winner == 1) {
            calcPointsX(4, 2, $('#x-score'), $('#o-score')); // pass on the arguments to update the score on the page and the numbers to be used
        } else if (winner == -1) {
            calcPointsO(4, 2, $('#o-score'), $('#x-score'));
        }
    } else if (counts === 4) {
        if (winner == 1) {
            calcPointsX(3, 1, $('#x-score'), $('#o-score'));
        }
        else if (winner == -1) {
            calcPointsO(3, 1, $('#o-score'), $('#x-score'));
        }
    } else if (counts === 5) {
        if (winner == 1) {
            calcPointsX(2, 0, $('#x-score'), $('#o-score'));
        }
        else if (winner == -1) {
            calcPointsO(2, 0, $('#o-score'), $('#x-score'));
        }
    }
};

const draw = function () {
    gameNumber++;
    maxTurns++;
    $('.container-3').slideDown();
    $('.crown').hide();
    $('.play-again').hide();
    $('.continue').show();
    xPoints++;
    $('#x-score').html(xPoints);
    oPoints++;
    $('#o-score').html(oPoints);
    winnerPage('X', 'O', '+', '1', '+', '1');
}

const winnerCheck = function () {
    if (
        (cellVal[0] + cellVal[1] + cellVal[2]) === 3 || (cellVal[0] + cellVal[3] + cellVal[6]) === 3 ||
        (cellVal[0] + cellVal[4] + cellVal[8]) === 3 || (cellVal[1] + cellVal[4] + cellVal[7]) === 3 ||
        (cellVal[2] + cellVal[4] + cellVal[6]) === 3 || (cellVal[2] + cellVal[5] + cellVal[8]) === 3 ||
        (cellVal[3] + cellVal[4] + cellVal[5]) === 3 || (cellVal[6] + cellVal[7] + cellVal[8]) === 3
    ) {
        gameNumber++;
        maxTurns++;
        updatingScoreboard(1); // pass on the winner as argument
    } else if (
        (cellVal[0] + cellVal[1] + cellVal[2]) === -3 || (cellVal[0] + cellVal[3] + cellVal[6]) === -3 ||
        (cellVal[0] + cellVal[4] + cellVal[8]) === -3 || (cellVal[1] + cellVal[4] + cellVal[7]) === -3 ||
        (cellVal[2] + cellVal[4] + cellVal[6]) === -3 || (cellVal[2] + cellVal[5] + cellVal[8]) === -3 ||
        (cellVal[3] + cellVal[4] + cellVal[5]) === -3 || (cellVal[6] + cellVal[7] + cellVal[8]) === -3
    ) {
        gameNumber++;
        maxTurns++;
        updatingScoreboard(-1); // pass on the winner as argument
    } else if (turnsCount >= maxTurns) {
        draw();
    }
};

//****2 PLAYERS GAME UNIQUE FUNCTIONS:****

const xOrOTurn = function () {
    if (cellVal[thisIndex] == false) {
        if (turnsCount % 2 == 0) {
            cellTurn.html('X').hide().fadeIn().fadeIn('slow').fadeIn(9000);
            cellVal[thisIndex] = 1;
        } else if (turnsCount % 2 !== 0) {
            cellTurn.html('O').hide().fadeIn().fadeIn('slow').fadeIn(9000);
            cellVal[thisIndex] = -1;
        }
        turnsCount++;
        winnerCheck();
    }
};

const starting2PGame = function () {
    $('.cell').on('click', function () {
        cellTurn = $(this);
        thisIndex = $(this).attr("data-id"); // grabing the index from the ID in the html
        xOrOTurn();
    })
}; //******END OF 2 PLAYERS UNIQUE FUNCTIONS*****

//******1P GAME UNIQUE FUNCTIONS*******
const randomSpot = function () {
    let randomNum = Math.floor(Math.random() * Math.floor(9));
    if (cellVal[randomNum] === false) {
        cellLocations[randomNum].html('O').hide().delay(100).fadeIn(600);
        cellVal[randomNum] = -1; // we are using '-1' to represent 'O'
        turnsCount++;
        winnerCheck();
    } else if (turnsCount < maxTurns) {
        randomSpot(); // it keeps calling it until it finds a vancant cell
    }
}

const starting1PGame = function () {
    $('.cell').on('click', function () {
        cellTurn = $(this);
        thisIndex = $(this).attr("data-id");
        if (cellVal[thisIndex] === false) {
            cellTurn.html('X').hide().fadeIn(600);
            cellVal[thisIndex] = 1; // we are using '1' to represent 'X'
            turnsCount++;
            if (turnsCount < maxTurns) { // to check if there was a tie
                randomSpot();
            } else {
                winnerCheck();
            }
        }
    })
}; //*****END OF 1P GAME FUNCTIONS******

//this function determines the actions depending on each button you choose
const startGameButton = function () {
    $('.one-player').on('click', function () {
        $('.one-player, .two-players').hide();
        $('.level').slideDown('slow');
        $('.medium, .hard').on('click', function () {
            $('.premium').slideDown('slow');
        })
        $('.easy').on('click', function () {
            $('.container-1').hide();
            $('.container-2').slideDown('slow');
            gameType = 1; //type 1 = 1 player playing against the machine
            maxTurns++; // maximum of terns is define to know when it is a tie. It is based on number os turns, which is the base for alternating players each beggining of game. that is why they both keep increasing throughout the game
            starting1PGame();
        })
    });
    $('.two-players').on('click', function () {
        $('.container-1').hide();
        $('.container-2').slideDown('slow');
        gameType = 2; // type 2 = 2 players
        maxTurns++;
        starting2PGame();
    })
    $('#scoreboard').on('click', function () {
        $('.score-toggle').fadeToggle();
    })
};

//this function sets up the first screen, as everything is in containars in the same html
const settingUpPages = function () {
    $('.container-2, .container-3, .level, .premium, a').hide();
    $('.one-player, .two-players').slideDown('slow');
    for (i in cellLocations) {
        cellLocations[i].text('');
    }
    for (i in cellVal) {
        cellVal[i] = false;
    }
    startGameButton();
};

$(document).ready(settingUpPages);