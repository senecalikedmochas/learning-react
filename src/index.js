import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//this is the Square React component, it renders a single button
function Square(props) {
    //Component: Square
    //Methods: return()

    //the square component is a controlled component, the board has full control over them

    return (
        //here, we're passing a function as a prop of onClick
        <button
            className="square"
            onClick={ () => props.onClick({value:'X'})
            }>
            {props.value}
        </button>
    );
}




//this is the Board react component, it renders nine squares
class Board extends React.Component {
    //Component: Board
    //Methods: renderSquare(i) and render()
    //Props: i, for renderSquare

    //setting the initial state as 9 nulls, corresponding to 9 squares
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            //this boolean is to make sure the first move is "X" by default
            xIsNext:true,
        };
    }

    //here, we're using .slice() to create a copy of the squares array
    //to modify, instead of modifying the existing array.
    handleClick(i) {
        const squares = this.state.squares.slice()
        //if a player has won, then don't let them click
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares:squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        //we're asking the the Board's render square method to read from the Board's constrcutor

        //we're now passing two properties from Board to Square: value, and OnClick.
        return (
            <Square
                value={this.state.squares[i]}
                //the onClick property here is a function that square can call once clicked
                onClick={() => this.handleClick(i)}
        />
        );
    }

    render() {
        //here, we are declaring a variable that contains whether or not a player won
        //if a player won, then we're appending a specific status
        //if a player did not win, then we're appending a specific status
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

//this is the Game react component, it renders a board with placeholder values
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

//Given an array of 9 squares, this function will check for a winner and return
// 'X', 'O', or null as appropriate
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}



// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
