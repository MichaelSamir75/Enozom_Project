import React, { useState } from "react";
import basestyle from "../Base.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import loginstyle from "../Login/Login.module.css";
import './Games.module.css'


const Games = ({ setUserState }) => {
    const navigate = useNavigate();
    // const [options, setOptions] = useState({
    //     numOfPlayers: 2,
    //     boardNumber: 1,
    // });
    const options = {numOfPlayers: 2, boardNumber: 1};

    const submitGame = () => {

    }

    const games = [{gameid: 1, numOfPlayers: 3, BoardId: 5},
        {gameid: 2, numOfPlayers: 2, BoardId: 1},
        {gameid: 3, numOfPlayers: 1, BoardId: 2},
        {gameid: 4, numOfPlayers: 5, BoardId: 3},
        {gameid: 2, numOfPlayers: 2, BoardId: 1},
        {gameid: 3, numOfPlayers: 1, BoardId: 2},

    ]
    return (
        <div className="card w-50 mx-auto">
            <table>
                <thead>
                <tr>
                    <th>Number of Players</th>
                    <th>Board Number</th>
                </tr>
                </thead>
                <tbody>
                {
                    games.map((game) =>
                        (
                            <tr onClick={() => {console.log(game.gameid)}}>
                                <td>{game.numOfPlayers}</td>
                                <td>{game.BoardId}</td>
                            </tr>
                        ))
                }
                </tbody>
            </table>
        </div>
    );
};

export default Games;
