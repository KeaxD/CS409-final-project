import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  const [token, setToken] = useState();

  if (!token) {
    return (
      <BrowserRouter>
        <header className="main-header">
          <ul className="options">
            <Link to="/" className="links">
              Home
            </Link>
            <Link to="/about" className="links">
              About
            </Link>
            <Link to="/sign-up" className="links">
              Sign up
            </Link>
            <Link to="/login" className="links">
              Login
            </Link>
          </ul>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }

  return;
}

export default App;
