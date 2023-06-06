import React, { useState } from "react";
import "./css/Login.css";
import PropTypes from "prop-types";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (email && name && password) {
      try {
        const response = await fetch("http://localhost:8080/api/auth/signup", {
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
        await response.json();
        if (response.status === 409) {
          console.log("This email is already taken");
        } else if (response.ok) {
          console.log("Success! User was added");
        } else {
          console.log("Internal Server Error");
        }
      } catch (e) {
        alert(e);
      }
    } else {
      alert("Please enter username/password");
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Please Sign up</h1>
      <form onSubmit={handleSignUp}>
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

Signup.propTypes = {
  setToken: PropTypes.func.isRequired,
};
