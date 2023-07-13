import React, { useState } from "react";
import basestyle from "../Base.module.css";

const GameOption = ({ setUserState, username }) => {
    const name = "Omar Taha";
    const [playersNumber, setPlayersNumber] = useState('');
    const [boardType, setBoardType] = useState('');

    console.log(boardType)

    return (
        <div className="profile">
            <h1 style={{ color: "white" }}>Welcome {name} !!</h1>

            <div  className={basestyle.container}>
                <div style={
                    {
                        paddingTop:'10px',
                    }
                } className={basestyle.first}>
                    <label htmlFor="number">Number of players: </label>
                    <input
                        onChange={(e) => setPlayersNumber(e.target.value)}
                        type="number"
                        min="2"
                        max="10"
                        name="number"
                        value={playersNumber}
                        placeholder="max 10"
                    />

                    <div style={{
                        marginTop:'10px'
                    }}>
                        Board type:
                        <input
                            onChange={(e) => setBoardType(e.target.value)}
                            type="radio"
                            id="Omar"
                            name="boardType"
                            value="Omar"

                        />
                        <label htmlFor="Omar">Omar</label>
                        <input
                            onChange={(e) => setBoardType(e.target.value)}
                            type="radio"
                            id="Michele"
                            name="boardType"
                            value="Michele"
                        />
                        <label htmlFor="Michele">Michele</label>
                        <input
                            onChange={(e) => setBoardType(e.target.value)}
                            type="radio"
                            id="Toubar"
                            name="boardType"
                            value="Toubar"
                        />
                        <label htmlFor="Toubar">Toubar</label>
                    </div>

                    <div style={{ display: "flex", justifyContent:'center' }}>
                        <button
                            className={basestyle.button_common}
                            onClick={() => setUserState({})}
                        >
                            Create Room
                        </button>

                        <button
                            className={basestyle.button_common}
                            onClick={() => setUserState({})}
                        >
                            Join Room
                        </button>
                    </div>
                </div>

            </div>
            <div style={{ display: "grid" }}>
                <button
                    className={basestyle.button_common}
                    onClick={() => setUserState({})}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};
export default GameOption;
