import React from "react";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "./search-bar/SearchBar";

export default function Header() {
  return (
    <body>
      <header className="header-container">
        <Link to="/">
          <img
            src="../src/assets/Keskonregarde.gif"
            alt="logo"
            className="logo-pic"
          />
        </Link>
        <NavLink
          to="/top-rated"
          className={({ isActive }) =>
            isActive ? "button-top-rated-enabled" : "button-top-rated"
          }
        >
          Mieux notés
        </NavLink>
        <SearchBar />
      </header>

      <label>
        <input type="checkbox" />
        <div className="menu-burger">
          {" "}
          <span className="burger-icon" />
        </div>
        <ul>
          <li>
            <a href="/">Genres</a>
          </li>
          <li>
            <a href="/top-rated">Mieux notés</a>
          </li>
        </ul>
      </label>
    </body>
  );
}
