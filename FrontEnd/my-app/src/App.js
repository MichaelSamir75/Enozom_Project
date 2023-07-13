import "./App.css";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import GameOptions from "./Components/GameOptions/GameOptions";
import Games from './Components/Games/Games'
import Game from './Components/Game/Game'
import WelcomePage from './Components/WelcomePage/WelcomePage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App()
{
  const [userstate, setUserState] = useState({});
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              userstate && userstate._id ? (
                <Profile
                  setUserState={setUserState}
                  username={userstate.fname}
                />
              ) : (
                <Login setUserState={setUserState} />
              )
            }
          ></Route>
          <Route
            path="/login"
            element={<Login setUserState={setUserState} />}
          ></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/gameoptions" element={<GameOptions />}></Route>
        <Route path="/games" element={<Games />}></Route>
        <Route path="/game" element={<Game />}></Route>
        <Route path="/welcomepage" element={<WelcomePage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
