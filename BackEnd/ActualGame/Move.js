class Move
{
    to
    from
    date

    constructor(from, to)
    {
        this.to = to, this.from = from
        this.date = new Date();
    }
}

export default Move;