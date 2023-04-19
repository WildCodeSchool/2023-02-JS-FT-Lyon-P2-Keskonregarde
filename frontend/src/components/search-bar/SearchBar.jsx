import React, { useState } from "react";
import styles from "./SearchBar.module.css";

export const SearchBar = ({ setQuery }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSumbit = (e) => {
    e.preventDefault();
    setQuery(searchInput);
  };

  return (
    <form onSubmit={handleSumbit} className={styles.searchBarBox}>
      <input
        type="text"
        placeholder="On regarde quoi ?"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className={styles.searchBar}
      />
      <input type="submit" value="RECHERCHER" className={styles.searchButton} />
    </form>
  );
};
