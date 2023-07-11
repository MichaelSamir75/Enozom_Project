const Move = require('./Move')
const db = require('../utils/database_functions')

class Board
{
    boardnumber
    transitions

    async initializeBoard(boardnumber)
    {
        this.boardnumber = boardnumber;
        const dbTransitions = await db.getElementsByBoardId(this.boardnumber);
        this.transitions = new Map();

        dbTransitions.forEach((jsonObject) => {
            jsonMap.set(jsonObject.From, jsonObject.To);
        });
    }

    async getMoveAfterThrowingDice(dicevalue, position)
    {
        let newposition = dicevalue + position;
        if (this.transitions.has(newposition))
            newposition = this.transitions.get(newposition);
        newposition = min(100, newposition);
        const move = new Move(position, newposition);
    }
}

module.exports = Board;