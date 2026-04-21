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
        to="/setup"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Set-up
      </NavLink>
    </nav>
  );
}

export default Navbar;
