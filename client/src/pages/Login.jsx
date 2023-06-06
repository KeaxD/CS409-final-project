import React, { useState, useEffect } from "react";
import "./css/Login.css";
import PropTypes from "prop-types";
import { resolvePath, useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if a token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true); // Set loggedIn to true if token exists
    }
  }, []);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (email && name && password) {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          const token = data.token;
          setToken(token);
          localStorage.setItem("token", token);
          setLoggedIn(true);
          navigate("/");
        } else if (response.status === 401) {
          console.log(response.statusText, ": Invalid Password/Email");
        }
      } catch (err) {
        console.log(err, "Wrong password/email");
      }
    } else {
      console.log("Please provide Email and Password");
    }
  };

  return (
    <div className="login-wrapper">
      {loggedIn ? <h1>Logged in</h1> : <h1>Please Log in</h1>}
      <form onSubmit={handleLogin}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          <p>Email address</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
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
