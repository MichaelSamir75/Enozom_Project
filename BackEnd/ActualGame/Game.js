const User = require('./User')
const Board = require('./Board')
const db = require('../utils/database_functions')

class Game
{
    board
    gameId

    constructor(gameId, numOfPlayers, boardnumber)
    {
        ///////////////////////// insert game in database with its game id
        this.gameId = gameId;
        // function to get board from database(snakes and stairs)
        this.playerscounter = 1;
        this.board = new Board(boardnumber); ////////////   initialize board frmo databaase

        db.setGameStatus(this.gameId, GameStatus.waitingForPlayers);
        /////////// change lastmove time to current date in db
    }

    joinUser(userId)
    {
        let currentNumberOfPlayers = db.getCurrentNumberOfPlayers(this.gameId);
        currentNumberOfPlayers++;
        db.setCurrentNumberOfPlayers(currentNumberOfPlayers);
        const numOfPlayers = db.getNumberOfPlayers(this.gameId);

        if (numOfPlayers == currentNumberOfPlayers)
        {
            db.setGameStatus(this.gameId, GameStatus.running);
            this.timerCheck();
        }
    }

    timerCheck()////////////////////////////
    {
        const date = new Date();
        const lastmovetime = 5;//////////////////// get from database;
        if (date - lastmovetime >= 20)
        {
            const id = db.getUserIdFromGameId(this.gameId, turn);
            this.throwDice(id);
        }

        const gamestatus = db.getGameStatus(this.gameId);
        if (gamestatus == GameStatus.finished) return;
        setTimeout(this.timerCheck, 1000);
    }

    throwDice(userid)
    {
        const dicevalue = Math.random() % 6 + 1;
        // function here to get user position from datbase using userid
        const position = db.getUserPositionByGameId(this.gameId);
        let move = this.board.getMoveAfterThrowingDice(dicevalue, position);
        this.changeTurn();
        //////////////////// initialize last move date in datbase to move.date

        if (move.to >= 100)
            db.setGameStatus(this.gameId, GameStatus.finished);
        return dicevalue;
    }

    changeTurn()//not completed
    {
        let turn = db.getTurnByGameId(this.gameId);
        const numOfPlayers = db.getNumberOfPlayers(this.gameId);
        turn = (turn + 1) % numOfPlayers;
        db.setTurn(this.gameId, turn);
    }
}

const GameStatus = {
    running: "running",
    waitingForPlayers: "pending",
    finished: "finished"
}