function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];
    let visited = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        visited[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
            visited[i].push(false);
        }
    }

    const getBoard = () => board;

    const placeMark = (row, column, player) => {
        if (board[row][column].getValue() !== '') return false;
        board[row][column].addMark(player);
        return true;
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    const clearVisited = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                visited[i][j] = false;
            }
        }
    }

    const checkTie = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (board[i][j].getValue() == '') return false;
            }
        }
        return true;
    }

    const checkWin = (row, column, mark) => {
        if (dfsVertical(row, column, mark)) return true;
        clearVisited();
        if (dfsHorizontal(row, column, mark)) return true;
        clearVisited();
        if (row == column) if (dfsDiagonalDirection1(row, column, mark)) return true;
        clearVisited();
        if ((row == 0 && column == 2) || (row == 1 && column == 1) || (row == 2 && column == 0)) if (dfsDiagonalDirection2(row, column, mark)) return true
        clearVisited();
        return false;
    }

    const dfsVertical = (row, column, mark) => {
        if (column < 0 || column > 2) return true;
        if (board[row][column].getValue() !== mark) return false;
        if (visited[row][column] == true) return true;
        visited[row][column] = true;
        if (!dfsVertical(row, column + 1, mark) || !dfsVertical(row, column - 1, mark)) return false;
        return true;
    }

    const dfsHorizontal = (row, column, mark) => {
        if (row < 0 || row > 2) return true;
        if (board[row][column].getValue() !== mark) return false;
        if (visited[row][column] == true) return true;
        visited[row][column] = true;
        if (!dfsHorizontal(row + 1, column, mark) || !dfsHorizontal(row - 1, column, mark)) return false;
        return true;
    }

    const dfsDiagonalDirection1 = (row, column, mark) => {
        if (column < 0 || column > 2 || row < 0 || row > 2) return true;
        if (board[row][column].getValue() !== mark) return false;
        if (visited[row][column] == true) return true;
        visited[row][column] = true;
        if (!dfsDiagonalDirection1(row + 1, column + 1, mark) || !dfsDiagonalDirection1(row - 1, column - 1, mark)) return false;
        return true;
    }

    const dfsDiagonalDirection2 = (row, column, mark) => {
        if (column < 0 || column > 2 || row < 0 || row > 2) return true;
        if (board[row][column].getValue() !== mark) return false;
        if (visited[row][column] == true) return true;
        visited[row][column] = true;
        if (!dfsDiagonalDirection2(row - 1, column + 1, mark) || !dfsDiagonalDirection2(row + 1, column - 1, mark)) return false;
        return true;
    }

    return { getBoard, placeMark, printBoard, checkTie, checkWin };
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
        if (!board.placeMark(row, column, getActivePlayer().mark)) return;

        if (board.checkWin(row, column, getActivePlayer().mark)) {
            console.log(`${getActivePlayer().name} wins`);
            return;
        }
        if (board.checkTie()) {
            console.log(`Tie game`);
            return;
        }
        switchPlayerTurn();
        printNewTurn();
    };

    printNewTurn();
    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    };
}

const game = GameController();