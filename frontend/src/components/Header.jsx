import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./search-bar/SearchBar";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <img
          src="../src/assets/Keskonregarde.gif"
          alt="logo"
          className="logo-pic"
        />
      </Link>
      <SearchBar />
    </header>
  );
}
