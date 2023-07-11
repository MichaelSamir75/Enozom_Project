const User = require('./User')
const Board = require('./Board')
const db = require('../utils/database_functions')

class Game
{
    board
    gameId

    async initNewGameObject(numOfPlayers, boardnumber)
    {
        const id = db.createGame(numOfPlayers, boardnumber);
        this.gameId = id;
        this.board = new Board();
        return;
        this.board.initializeBoard(boardnumber);
    }

    async initExistingGameObject(gameId)
    {
        this.gameId = gameId;
        const boardnumber = await db.getBoardIdByRoomId(this.gameId);
        this.board = new Board();
        this.board.initializeBoard(boardnumber);
        const status = await db.getGameStatus(this.gameId);

        if (status == GameStatus.running)
            this.timerCheck();
    }

    async joinUser(userId)
    {
        let currentNumberOfPlayers = await db.getCurrentNumberOfPlayers(this.gameId);
        currentNumberOfPlayers++;
        db.setCurrentNumberOfPlayers(this.gameId, currentNumberOfPlayers);
        const numOfPlayers = await db.getNumberOfPlayers(this.gameId);
        db.addPlayerandSetPlayerTurn(this.gameId, userId);

        if (numOfPlayers == currentNumberOfPlayers)
        {
            db.setGameStatus(this.gameId, GameStatus.running);
            this.timerCheck();
        }
    }

    async timerCheck()
    {
        const date = new Date();
        const lastmovetime = await dp.getLastMove(this.gameId);
        if (date - lastmovetime >= 20)
        {
            const id = await db.getUserIdFromGameId(this.gameId, turn);
            this.throwDice(id);
        }
        const gamestatus = await db.getGameStatus(this.gameId);
        if (gamestatus == GameStatus.finished) return;
        setTimeout(this.timerCheck, 1000);
    }

    async checkCorrectUserTurn(userid)
    {
        const correctUserId = await db.getUserIdByGameId();
        if (correctUserId === userid) return true;
        else return false;
    }

    async throwDice(userid)
    {
        const dicevalue = Math.random() % 6 + 1;
        const position = await db.getUserPositionByGameId(this.gameId);
        let move = await this.board.getMoveAfterThrowingDice(dicevalue, position);
        this.changeTurn();
        db.setLastMove(this.gameId, currentDate);

        if (move.to >= 100)
            db.setGameStatus(this.gameId, GameStatus.finished);
        return dicevalue;
    }

    async changeTurn()
    {
        let turn = await db.getTurnByGameId(this.gameId);
        const numOfPlayers = await db.getNumberOfPlayers(this.gameId);
        turn = (turn + 1) % numOfPlayers;
        db.setGameTurn(this.gameId, turn);
    }
}

const GameStatus = {
    running: "running",
    waitingForPlayers: "pending",
    finished: "finished"
}

module.exports = Game;