const Move = require('./Move')

class Board
{
    boardnumber
    transitions

    constructor(boardnumber)
    {
        this.boardnumber = boardnumber;
        ////////////////////////////////// initialize transitions from database
    }

    getMoveAfterThrowingDice(dicevalue, position)
    {
        let newposition = dicevalue + position;
        if (this.transitions.has(newposition))
            newposition = this.transitions.get(newposition);
        const move = new Move(position, newposition);
    }
}

export default Board;