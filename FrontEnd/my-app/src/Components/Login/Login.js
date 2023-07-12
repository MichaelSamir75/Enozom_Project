import React, { useState } from "react";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [user, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!user.username) {
      errors.username = "username is required";
    }

    if (!user.password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if there are no errors
  };

  const loginHandler = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(user)
      axios
        .post("http://localhost:3000/login", user)
        .then((res) => {
          console.log(res.data.token);
          setUserState(res.data.user);
          navigate("/", { replace: true });
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  };

  return (
    <div className={loginstyle.login}>
      <form>
        <h1>Login</h1>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          onChange={changeHandler}
          value={user.username}
        />
        {formErrors.username && <p className={basestyle.error}>{formErrors.username}</p>}

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={changeHandler}
          value={user.password}
        />
        {formErrors.password && <p className={basestyle.error}>{formErrors.password}</p>}

        <button className={basestyle.button_common} onClick={loginHandler}>
          Login
        </button>
      </form>
      <NavLink to="/signup">Not yet registered? Register Now</NavLink>
    </div>
  );
};

export default Login;
