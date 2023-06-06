import { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Home from "./pages/Home";

function App() {
  const [token, setToken] = useState();

  if (!token) {
    return (
      <>
        <header className="main-header">
          <ul className="options">
            <li>Home</li>
            <li>About</li>
            <li>Sign Up</li>
            <li>Login</li>
          </ul>
        </header>
        <Home />
      </>
    );
  }

  return <BrowserRouter></BrowserRouter>;
}

export default App;
