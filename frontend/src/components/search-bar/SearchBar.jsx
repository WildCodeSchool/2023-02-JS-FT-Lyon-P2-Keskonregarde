import React, { useState } from "react";
import {Link} from 'react-router-dom'
import PropTypes from "prop-types";
import styles from "./SearchBar.module.css";

export default function SearchBar({ setQuery }) {
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
}

SearchBar.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

{/* <Link to={`/search?query=`}></Link> */}