import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [queries] = useSearchParams();
  const [searchParam, setSearchParam] = useState(queries.get("query") || "");
  const navigate = useNavigate();

  const handleSumbit = (e) => {
    navigate(`/search?query=${searchParam}`);
  };

  return (
    <div className={styles.searchBarBox}>
      <input
        type="text"
        placeholder="On regarde quoi ?"
        value={searchParam}
        onChange={(e) => setSearchParam(e.target.value)}
        className={styles.searchBar}
      />
      <input
        type="button"
        value="RECHERCHER"
        className={styles.searchButton}
        onClick={handleSumbit}
      />
    </div>
  );
}

SearchBar.propTypes = {
  setQuery: PropTypes.func.isRequired,
};
