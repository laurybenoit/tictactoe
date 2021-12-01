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


let gameboard;
let turn = 'O';
let win;
let audio;



const cells = Array.from(document.querySelectorAll('#gameboard div'));
const messages = document.querySelector('h4');
document.getElementById('newgame').addEventListener('click', newGame);


function getWinner() {
    let winner = null;
    winningCombos.forEach((combo, index) => {
            if (gameboard[combo[0]] && gameboard[combo[0]] === gameboard[combo[1]] && gameboard[combo[0]] === gameboard[combo[2]])
                winner = gameboard[combo[0]];
        });
        return winner ? winner : gameboard.includes('') ? null : 'T';
};

function handleTurn() {
    if (win) {
        document.getElementById('gameboard').removeEventListener('click', handleTurn);
        document.getElementById('gameboard').removeEventListener('click', playsound);
        return;
    };
    let idx = cells.findIndex(function(cell) {
        return cell === event.target;
    });
    if (!gameboard[idx]) {
        gameboard[idx] = turn;
        turn = turn === 'O' ? 'X' : 'O';
        win = getWinner();
        if (win === 'O' || win === 'X') {
            congratsSound = new Audio("win.mp3");
            congratsSound.play();
        };
        if (win === 'T'){
            let tie = new Audio('tie.mp3')
            tie.play();
        }
        render();
    }
};

function playsound(){
    audio = new Audio("event.wav");
        audio.play();
}

function newGame() {
    init();
    document.getElementById('gameboard').addEventListener('click', handleTurn);
    document.getElementById('gameboard').addEventListener('click', playsound);
}

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
    messages.textContent = win === 'T' ? `We have a tie` : win ? `Player ${win} wins the game!` : `Its Player ${turn}'s turn!`;
    };

newGame();

