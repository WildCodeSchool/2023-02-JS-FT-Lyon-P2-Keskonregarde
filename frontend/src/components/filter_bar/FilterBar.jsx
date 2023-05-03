import React, { useContext } from "react";
import PropTypes from "prop-types";
import styles from "./FilterBar.module.css";
import MovieGenresContext from "../../contexts/MovieGenresContext";
import TvGenresContext from "../../contexts/TvGenresContext";

export default function FilterBar({ filter, setFilter, requestType }) {
  const { movieGenres } = useContext(MovieGenresContext);
  const { tvGenres } = useContext(TvGenresContext);

  return (
    <div className={styles.switchTypeContainer}>
      <button
        type="button"
        className={`${
          filter === "all"
            ? styles.buttonSelectTypeEnabled
            : styles.buttonSelectType
        }`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      {requestType === "movie" &&
        movieGenres.map((genre) => (
          <button
            key={genre.id}
            type="button"
            className={`${
              filter === `${genre.name}`
                ? styles.buttonSelectTypeEnabled
                : styles.buttonSelectType
            }`}
            onClick={() => setFilter(`${genre.name}`)}
          >
            {genre.name}
          </button>
        ))}
      {requestType === "tv" &&
        tvGenres.map((genre) => (
          <button
            type="button"
            className={`${
              filter === `${genre.name}`
                ? styles.buttonSelectTypeEnabled
                : styles.buttonSelectType
            }`}
            onClick={() => setFilter(`${genre.name}`)}
          >
            {genre.name}
          </button>
        ))}
      <button
        type="button"
        className={`${
          filter === "score"
            ? styles.buttonSelectTypeEnabled
            : styles.buttonSelectType
        }`}
        onClick={() => setFilter("score")}
      >
        Note +7
      </button>
    </div>
  );
}

FilterBar.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  requestType: PropTypes.string.isRequired,
};
