import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [queries] = useSearchParams();
  const [searchParam, setSearchParam] = useState(queries.get("query") || "");
  const navigate = useNavigate();

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
        onClick={() => {
          navigate(`/search?query=${searchParam}`);
        }}
      />
    </div>
  );
}
