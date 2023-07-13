import React, { useState } from "react";
import basestyle from "../Base.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import loginstyle from "../Login/Login.module.css";

const GameOptions = ({ setUserState }) => {
    const navigate = useNavigate();
    // const [options, setOptions] = useState({
    //     numOfPlayers: 2,
    //     boardNumber: 1,
    // });
    const options = {numOfPlayers: 2, boardNumber: 1};

    const submitGame = () => {

    }

    const setNumOfPlayers = (newNumOfPlayers) => {
        options.numOfPlayers = newNumOfPlayers
    }

    const setBoardNumber = (newBoardNumber) => {
        options.boardNumber = newBoardNumber
    }

    return (
        <div className={loginstyle.login}>
            <form>
                <h1>Customise Game</h1>

                <select>
                    <option onClick={() => setNumOfPlayers(2)}>2 Player</option>
                    <option onClick={() => setNumOfPlayers(3)}>3 Player</option>
                    <option onClick={() => setNumOfPlayers(4)}>4 Player</option>
                    <option onClick={() => setNumOfPlayers(5)}>5 Player</option>
                    <option onClick={() => setNumOfPlayers(6)}>6 Player</option>
                    <option onClick={() => setNumOfPlayers(7)}>7 Player</option>
                    <option onClick={() => setNumOfPlayers(8)}>8 Player</option>
                    <option onClick={() => setNumOfPlayers(9)}>9 Player</option>
                    <option onClick={() => setNumOfPlayers(10)}>10 Player</option>
                </select>
                <br/>
                <br/>
                <label onClick={() => setBoardNumber(1)} htmlFor="red-radio" className="radio-image"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSQKsdPPqCVEHjBguLYpeO_xW8KYU9_BkMkPO-gLfs&s" alt="Red"/></label>
                <input onClick={() => setBoardNumber(1)} type="radio" name="color" value="1" id="red-radio" checked />
                <br/>

                <label onClick={() => setBoardNumber(2)} htmlFor="blue-radio" className="radio-image"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOQ-GErZnyujw9BLhsJxfjTqlKfXzAeEd-ul9qDzk&s" alt="Blue"/></label>
                <input onClick={() => setBoardNumber(2)} type="radio" name="color" value="2" id="blue-radio" />
                <br/>

                <button className={basestyle.button_common} onClick={submitGame}>
                    Make Game
                </button>
            </form>
        </div>
    );
};

export default GameOptions;
