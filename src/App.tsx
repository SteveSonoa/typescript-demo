import React, { Component } from 'react';
import './App.css';

enum Player {
    None = 0,
    One = 1,
    Two = 2
};

type ONGOING_GAME = -1;
const ONGOING_GAME = -1;

interface IState {
    board: Player[],
    nextPlayerTurn: Player,
    gameIsWon: Player | ONGOING_GAME
}

export default class App extends Component<{}, IState> {
    public initialState = {
        board: [
            Player.None,
            Player.None,
            Player.None,
            Player.None,
            Player.None,
            Player.None,
            Player.None,
            Player.None,
            Player.None            
        ],
        nextPlayerTurn: Player.One,
        gameIsWon: ONGOING_GAME
    }

    public state = this.initialState;

    public checkIfGameIsOver = (board: Player[]) => {
        if (board[0] === board[1] && board[1] === board[2] && board[2] !== Player.None) {
            return board[0];
        } else if (board[3] === board[4] && board[4] === board[5] && board[5] !== Player.None) {
            return board[3];
        } else if (board[6] === board[7] && board[7] === board[8] && board[8] !== Player.None) {
            return board[6];
        } else if (board[0] === board[3] && board[3] === board[6] && board[6] !== Player.None) {
            return board[0];
        } else if (board[1] === board[4] && board[4] === board[7] && board[7] !== Player.None) {
            return board[1];
        } else if (board[2] === board[5] && board[5] === board[8] && board[8] !== Player.None) {
            return board[2];
        } else if (board[0] === board[4] && board[4] === board[8] && board[8] !== Player.None) {
            return board[0];
        } else if (board[2] === board[4] && board[4] === board[6] && board[6] !== Player.None) {
            return board[2];
        }

        let gameOver = true;

        for (const player of board) {
            if(player === Player.None) {
                gameOver = false;
            }
        }

        return gameOver ? Player.None : ONGOING_GAME;
    }

    public createOnClickHandler = (index: number) => () => {
        const { board, nextPlayerTurn, gameIsWon } = this.state;

        if(board[index] !== Player.None || gameIsWon !== ONGOING_GAME) {
            return;
        }

        const newBoard = board.slice();

        newBoard[index] = nextPlayerTurn;

        const newGameIsWon = this.checkIfGameIsOver(newBoard);

        this.setState({
            board: newBoard,
            nextPlayerTurn: 3 - nextPlayerTurn,
            gameIsWon: newGameIsWon
        });
    }

    public renderCell = (index: number) => {
        const { board } = this.state;

        return <div
            className="cell"
            onClick={this.createOnClickHandler(index)}
            data-player={board[index]}
        />;
    }

    public renderStatus = () => {
        const { gameIsWon } = this.state;
        const gameOverText = gameIsWon === Player.None ? 'The game is a draw!' : `Player ${gameIsWon} wins!`
        return (<div>
            Player 1 is red<br />
            Player 2 is green<br />
            {gameIsWon === ONGOING_GAME ? `Game is ongoing` : gameOverText}<br />
            {gameIsWon !== ONGOING_GAME && <button onClick={this.resetGame()}>New Game</button>}
        </div>)
    }

    public renderBoard = () => {
        const { board } = this.state;
        return (
            <div className="board-container">
                {board.map((value, key) => this.renderCell(key))}
            </div>
        );
    }

    public resetGame = () => () => {
        this.setState(this.initialState);
    }

    render() {
        return (
            <div className="app-container">
                {this.renderBoard()}
                {this.renderStatus()}
            </div>
        );
    }
}
