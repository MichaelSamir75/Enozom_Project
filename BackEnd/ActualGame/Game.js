const User = require('./User')
const Board = require('./Board')
const db = require('../utils/database_functions')

class Game
{
    board
    gameId

    initNewGameObject(numOfPlayers, boardnumber)
    {
        const id = db.createGame(gameid, numOfPlayers, boardnumber);
        this.gameId = id;
        this.board = new Board(boardnumber);
    }

    initExistingGameObject(id)
    {
        this.gameId = gameId;
        const boardnumber = db.getBoardNumber(this.gameId);
        this.board = new Board(boardnumber);
        const status = db.getGameStatus(this.gameId);

        if (status == GameStatus.running)
            this.timerCheck();
    }

    joinUser(userId)
    {
        let currentNumberOfPlayers = db.getCurrentNumberOfPlayers(this.gameId);
        currentNumberOfPlayers++;
        db.setCurrentNumberOfPlayers(this.gameId, currentNumberOfPlayers);
        const numOfPlayers = db.getNumberOfPlayers(this.gameId);
        db.addPlayerandSetPlayerTurn(this.gameId, userId);

        if (numOfPlayers == currentNumberOfPlayers)
        {
            db.setGameStatus(this.gameId, GameStatus.running);
            this.timerCheck();
        }
    }

    timerCheck()
    {
        const date = new Date();
        const lastmovetime = dp.getLastMove(this.gameId);
        if (date - lastmovetime >= 20)
        {
            const id = db.getUserIdFromGameId(this.gameId, turn);
            this.throwDice(id);
        }
        const gamestatus = db.getGameStatus(this.gameId);
        if (gamestatus == GameStatus.finished) return;
        setTimeout(this.timerCheck, 1000);
    }

    checkCorrectUserTurn(userid)
    {
        const correctUserId = db.getUserIdByGameId();
        if (correctUserId === userid) return true;
        else return false;
    }

    throwDice(userid)
    {
        const dicevalue = Math.random() % 6 + 1;
        const position = db.getUserPositionByGameId(this.gameId);
        let move = this.board.getMoveAfterThrowingDice(dicevalue, position);
        this.changeTurn();
        db.setLastMove(this.gameId, currentDate);

        if (move.to >= 100)
            db.setGameStatus(this.gameId, GameStatus.finished);
        return dicevalue;
    }

    changeTurn()
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