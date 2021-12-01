// Winning Conditions
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];


// Board app state
let gameboard;
let turn = 'O';
let win;
let audio;


// cache the element references 
const cells = Array.from(document.querySelectorAll('#gameboard div'));
// Event listener for the h4 meassage and newgame
const messages = document.querySelector('h4');
document.getElementById('newgame').addEventListener('click', newGame);

// Function for looping through the game and declaring a winner or if we have a tie

function getWinner() {
    let winner = null;
    winningCombos.forEach((combo, index) => {
            if (gameboard[combo[0]] && gameboard[combo[0]] === gameboard[combo[1]] && gameboard[combo[0]] === gameboard[combo[2]])
                winner = gameboard[combo[0]];
        });
        return winner ? winner : gameboard.includes('') ? null : 'Tie';
};

// function for handle each turn with the starting player being O, then follow by player X then O and also removing event listener for if a player win 
function handleTurn() {
    if (win) {
        document.getElementById('gameboard').removeEventListener('click', handleTurn);
        document.getElementById('gameboard').removeEventListener('click', playsound);
        return;
    };
    // Index for each turn
    let idx = cells.findIndex(function(cell) {
        return cell === event.target;
    });
    if (!gameboard[idx]) {
        gameboard[idx] = turn;
        turn = turn === 'O' ? 'X' : 'O';
        win = getWinner();
        if (win === 'O' || win === 'X') {
            //if winner is declare play winning sound
            congratsSound = new Audio("win.mp3");
            congratsSound.play();
        };
        if (win === 'Tie'){
            //if tie is declare play tie sound
            let tie = new Audio('tie.mp3')
            tie.play();
        }
        render();
    }
};
// This function is to play sound of each click
function playsound(){
    audio = new Audio("event.wav");
        audio.play();
}
// function for new game and adding the event listener for each new game 
function newGame() {
    init();
    document.getElementById('gameboard').addEventListener('click', handleTurn);
    document.getElementById('gameboard').addEventListener('click', playsound);
}
// this function is just to initialize the game 
function init() {
    gameboard = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
    turn = 'O'
    win = undefined;
    render();
}; 

function render() {
    gameboard.forEach(function(mark, index) {
    cells[index].textContent = mark;
    });
    messages.textContent = win === tie() ? `We have a tie` : win ? `Player ${win} wins the game!` : `Its Player ${turn}'s turn!`;

    function tie() {
        return 'Tie';
    }
    };

newGame();

