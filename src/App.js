import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Router, Route, Link } from "react-router-dom";
import ManageStudent from "./Pages/manageStudent";
import ManagePresident from "./Pages/managePresident";

function App() {
  return (
    <div className="App">
      <p>Let's do it</p>
      <nav>
        <ul>
          <li>
            <Link to="/student">Student Page</Link>
            <Link to="/president">President Page</Link>
            <Link to="/home">Admin Page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
