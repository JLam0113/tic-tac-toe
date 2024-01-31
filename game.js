function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const placeMark = (row, column, player) => {
        if (board[row][column].getValue() !== '') return false
        board[row][column].addMark(player);
        return true;
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    return { getBoard, placeMark, printBoard };
}

function Cell() {
    let value = '';

    const addMark = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        addMark,
        getValue
    };
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            mark: 'X'
        },
        {
            name: playerTwoName,
            mark: 'O'
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewTurn = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, column) => {
        console.log(`Marking ${getActivePlayer().name}'s mark at [${row},${column}]`);
        if (!board.placeMark(row, column, getActivePlayer().mark)) {
            console.log("That spot is already marked, please try again");
            return;
        }
        else {
            switchPlayerTurn();
            printNewTurn();
        }
    };

    printNewTurn();
    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    };
}

const game = GameController();