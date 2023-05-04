import React from "react";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "./search-bar/SearchBar";

export default function Header() {
  return (
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
  );
}
