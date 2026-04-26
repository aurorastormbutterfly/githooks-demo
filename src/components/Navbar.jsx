import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/tutorial"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Tutorial
      </NavLink>
      <NavLink
        to="/quiz"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Quiz
      </NavLink>
    </nav>
  );
}

export default Navbar;
