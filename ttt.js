let xCells = [{
    cell1: true,
    cell2: true,
    cell3: true,
    cell4: false,
    cell5: false,
    cell6: false,
    cell7: false,
    cell8: false,
    cell9: false
}];

let yCells = [{
    cell1: true,
    cell2: true,
    cell3: true,
    cell4: false,
    cell5: false,
    cell6: false,
    cell7: false,
    cell8: false,
    cell9: false
}];

let playedCells = [{
    cell1: 'played',
    cell2: 'played',
    cell3: 'played',
    cell4: 'played',
    cell5: 'played',
    cell6: 'played',
    cell7: 'played',
    cell8: 'played',
    cell9: 'played'
}];

const yCheck = function () {
    for (let index = 0; index < xCells.length; index++) {
        if ((xCells[0].cell1 && xCells[0].cell2 && xCells[0].cell3) ||
            (xCells[0].cell1 && xCells[0].cell4 && xCells[0].cell7) ||
            (xCells[0].cell1 && xCells[0].cell5 && xCells[0].cell9) ||
            (xCells[0].cell2 && xCells[0].cell5 && xCells[0].cell8) ||
            (xCells[0].cell3 && xCells[0].cell5 && xCells[0].cell7) ||
            (xCells[0].cell3 && xCells[0].cell6 && xCells[0].cell9) ||
            (xCells[0].cell4 && xCells[0].cell5 && xCells[0].cell6) ||
            (xCells[0].cell7 && xCells[0].cell8 && xCells[0].cell9)
        ) {
            console.log(`Y is the winner`);
        }
    }
};

const xCheck = function () {
    for (let index = 0; index < xCells.length; index++) {
        if ((xCells[0].cell1 && xCells[0].cell2 && xCells[0].cell3) ||
            (xCells[0].cell1 && xCells[0].cell4 && xCells[0].cell7) ||
            (xCells[0].cell1 && xCells[0].cell5 && xCells[0].cell9) ||
            (xCells[0].cell2 && xCells[0].cell5 && xCells[0].cell8) ||
            (xCells[0].cell3 && xCells[0].cell5 && xCells[0].cell7) ||
            (xCells[0].cell3 && xCells[0].cell6 && xCells[0].cell9) ||
            (xCells[0].cell4 && xCells[0].cell5 && xCells[0].cell6) ||
            (xCells[0].cell7 && xCells[0].cell8 && xCells[0].cell9)
        ) {
            console.log(`X is the winner`);
        }
    }
};

const tie = function () {
    for (let index = 0; index < xCells.length; index++) {
        if (index === 'unplayed') {
           break;
        } else {
            console.log(`It is a tie!`)
        }
}
};


  yCheck();
  xCheck();
  tie();