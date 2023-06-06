import React, { useState } from "react";
import "./css/Login.css";
import PropTypes from "prop-types";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form>
        <label>
          <p>Username</p>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
