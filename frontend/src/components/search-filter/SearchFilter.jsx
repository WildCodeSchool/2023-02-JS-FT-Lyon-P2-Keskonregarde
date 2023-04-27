import React, { useContext, useEffect } from "react";
import Dropdown from "react-dropdown";
import GenreFilterContext from "../../contexts/GenreFilter";
import styles from "./SearchFilter.module.css";
import "react-dropdown/style.css";

export default function SearchFilter() {
  const { fetchGenres, genres } = useContext(GenreFilterContext);

  useEffect(() => {
    fetchGenres();
  }, []);

  const optionsYears = [
    "Récent",
    "2010-2020",
    "2000-2010",
    "1990-2000",
    "1980-1990",
    "1960-1980",
    "Avant 1960",
  ];
  // if (!genre) return null;
  return (
    <div className={styles.searchFilterBar}>
      <Dropdown
        className={styles.buttonSearchFilter}
        controlClassName={styles.controlMenu}
        placeholderClassName={styles.placeholderMenu}
        arrowClassName={styles.arrowMenu}
        menuClassName={styles.buttonMenu}
        options={optionsYears}
        placeholder="Années"
      />{" "}
      {genres.map((genre) => (
        <Dropdown placeholder="Genre" options={genre} value={fetchGenres} />
      ))}
    </div>
  );
}
