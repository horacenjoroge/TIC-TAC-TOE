const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWinner = (player) => {
        for (const combo of winningCombinations) {
            if (
                board[combo[0]] === player &&
                board[combo[1]] === player &&
                board[combo[2]] === player
            ) {
                return true;
            }
        }
        return false;
    };

    const isTie = () => {
        return board.every((cell) => cell !== "");
    };

    const isValidMove = (index) => {
        return index >= 0 && index < 9 && board[index] === "";
    };

    const makeMove = (index, player) => {
        if (isValidMove(index)) {
            board[index] = player;
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        for (let i = 0; i < 9; i++) {
            board[i] = "";
        }
    };

    return {
        checkWinner,
        isTie,
        makeMove,
        resetBoard,
        getBoard: () => [...board],
    };
})();

// Module for the display
const displayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.querySelector("#restart");

    const renderBoard = () => {
        const board = gameBoard.getBoard();
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = board[i];
        }
    };

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (gameBoard.makeMove(index, currentPlayer)) {
                renderBoard();
                if (gameBoard.checkWinner(currentPlayer)) {
                    announceWinner(currentPlayer);
                } else if (gameBoard.isTie()) {
                    announceTie();
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        });
    });

    restartButton.addEventListener("click", () => {
        gameBoard.resetBoard();
        renderBoard();
        currentPlayer = "X";
        document.querySelector(".winner").style.display = "none";
    });

    const announceWinner = (player) => {
        const winnerDiv = document.querySelector(".winner");
        winnerDiv.textContent = `${player} wins!`;
        winnerDiv.style.display = "block";
    };

    const announceTie = () => {
        const winnerDiv = document.querySelector(".winner");
        winnerDiv.textContent = "It's a tie!";
        winnerDiv.style.display = "block";
    };

    return {
        renderBoard,
    };
})();

let currentPlayer = "X";
displayController.renderBoard();