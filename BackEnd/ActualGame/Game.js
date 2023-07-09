const User = require('./User')
const Board = require('./Board')

class Game
{
    board
    gameId

    constructor(numOfPlayers, boardnumber, gameId)
    {
        ///////////////////////// insert game in database with its game id
        this.gameId = gameId;
        // function to get board from database(snakes and stairs)
        this.playerscounter = 1;
        this.board = new Board(boardnumber); ////////////   initialize board frmo databaase

        //////////// change gamestatus to pending
        /////////// change lastmove time to current date in db
    }

    joinUser(userId) //not completed
    {
        this.playerscounter++;
        if (this.playerscounter == this.numOfPlayers)
        {
            this.timerCheck();
            ///////////////////////// set gamestatus to running in database
        }
    }

    timerCheck()////////////////////////////
    {
        const date = new Date();
        const lastmovetime = 5;//////////////////// get from database;
        if (date - lastmovetime >= 20)
        {
            // get currentplayer id from datbase
            const id = 5;
            this.throwDice(id);
        }

        const gamestatus = 5;  ////////// get from database
        if (gamestatus == GameStatus.finished) return;
        setTimeout(this.timerCheck, 1000);
    }

    throwDice(userid)
    {
        const dicevalue = Math.random() % 6 + 1;
        // function here to get user position from datbase using userid
        let position = 5;///////////////////////////////////////////////////////////
        let move = this.board.getMoveAfterThrowingDice(dicevalue, position);
        this.changeTurn();
        //////////////////// initialize last move in datbase to move.date
        if (move.to >= 100)
        {
            ///////////////// change gamestatus to finished in database
        }
        return dicevalue;
    }

    changeTurn()//not completed
    {
        this.currentPlayerIndes = (this.currentPlayerIndes + 1) % this.numOfPlayers;
    }
}

const GameStatus = {
    running: "running",
    waitingForPlayers: "pending",
    finished: "finished"
}