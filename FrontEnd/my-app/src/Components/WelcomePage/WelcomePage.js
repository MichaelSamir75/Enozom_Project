import React from 'react';
import './WelcomePage.module.css';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import {useNavigate} from "react-router-dom";


function WelcomePage() {
        const navigate = useNavigate();


    return (
        <div className="welcome-page">
            <h1>Welcome to my game</h1>
            <button onClick={() => {navigate('/login')}} className="new-game-button">Home Create New Game</button>
            <button className="join-game-button">Join Existing Game</button>
        </div>
    );
}

export default WelcomePage;