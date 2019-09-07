let xCells = [{
    cell1: true,
    cell2: false,
    cell3: true,
    cell4: true,
    cell5: true,
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


let xOrYCells = xCells; //here I get the lastes input x or o


const cellsCheck = function () {
    for (let index = 0; index < xOrYCells.length; index++) {
        if ((xOrYCells[0].cell1 && xOrYCells[0].cell2 && xOrYCells[0].cell3) ||
            (xOrYCells[0].cell1 && xOrYCells[0].cell4 && xOrYCells[0].cell7) ||
            (xOrYCells[0].cell1 && xOrYCells[0].cell5 && xOrYCells[0].cell9) ||
            (xOrYCells[0].cell2 && xOrYCells[0].cell5 && xOrYCells[0].cell8) ||
            (xOrYCells[0].cell3 && xOrYCells[0].cell5 && xOrYCells[0].cell7) ||
            (xOrYCells[0].cell3 && xOrYCells[0].cell6 && xOrYCells[0].cell9) ||
            (xOrYCells[0].cell4 && xOrYCells[0].cell5 && xOrYCells[0].cell6) ||
            (xOrYCells[0].cell7 && xOrYCells[0].cell8 && xOrYCells[0].cell9)
        ) {
            console.log(`${xOrYCells[0]} is the winner`);
        }
        else {
            tie();
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


cellsCheck();

$(document).ready(function () {

$('.cell1').click(function(event){  
    // $('body').keypress(function(event) {
            let insertLetter = event.key;
            $('.cell1').html(insertLetter);
          });
        // });  

    // $('body').keypress(function(event) {
    //     let insertLetter = event.key;
    //     $('#letter').html(insertLetter);
    //   });


    // 	$("p").css("background-color", "pink");  
    //   $('h1').css('color', 'red');
    //   $('#subHeader').css('font-size', '24px');
    //   $('#para').css("border","1px solid black");

});  