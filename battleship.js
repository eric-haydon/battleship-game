var view = {
    displayMessage: function(msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};

var model = {

    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    ships: [{locations: ["06", "16", "26"], hits: ["", "", ""]}, {locations: ["24", "34", "44"], hits: ["", "", ""]}, {locations: ["10", "11", "12"], hits: ["", "", ""]}],
    fire: function(guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");
                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my Battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.");
        return false;
    },
    isSunk: function(ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    }
}

var controller = {
    guesses: 0,
    processGuess: function(guess) {
        var location = parseGuess(guess);
        if (location) {
            this.guesses++;
            var hit = model.fire(location);
        }
    },
    parseGuess: function(guess) {
        var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
        if (guess === null || guess.length !== 2) {
            alert("Oops, please enter a letter and a number on the board.");
        } else {
            var firstChar = guess.charAt(0);
            var row = alphabet.indexOf(firstChar);
            var column = guess.charAt(1);
            if (isNaN(row) || isNaN(column)) {
                alert("Oops, that isnt on the board.");
            } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
                alert("Oops, thats off the board!");
            } else {
                return row + column;
            }
        }
        return null;
    }
}


// !!test firing calls

// model.fire("53");
// model.fire("06");
// model.fire("16");
// model.fire("26");
// model.fire("34");
// model.fire("24");
// model.fire("44");
// model.fire("12");
// model.fire("11");
// model.fire("10");

console.log(controller.parseGuess("A0"));
console.log(controller.parseGuess("B6"));
console.log(controller.parseGuess("G3"));
console.log(controller.parseGuess("H0"));
console.log(controller.parseGuess("A7"));

// **first early version of BS**

// var randomLoc = Math.floor(Math.random() * 5);
// var location1 = randomLoc;
// var location2 = location1 + 1;
// var location3 = location2 + 1;

// var guess;
// var hits = 0;
// var guesses = 0;

// var isSunk = false;

// while (isSunk == false) {
//     guess = prompt("Ready, aim, fire! (enter a number from 0-6):");    
//     if (guess < 0 || guess > 6) {
//         alert("Please enter a valid cell number!");    
//     } else {
//         guesses = guesses + 1;    

//         if (guess == location1 || guess == location2 || guess == location3) {
//             alert("HIT!");    
//             hits = hits + 1;

//             if (hits == 3) {
//                 isSunk = true;    
//                 alert("You sank my Battleship!!");
//             }
//         }
//         else {
//             alert("MISS")    
//         }
//     }
// }

// var stats = "You took " + guesses + " guess to sink the battleship, " + "which means your shooting accuracy was " + (3/guesses);

// alert(stats);

// view.displayMiss("00");
// view.displayHit("34");
// view.displayMiss("55");
// view.displayHit("12");
// view.displayMiss("25");
// view.displayHit("26");

// view.displayMessage("tap tap, is this thing on?");
