import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import styles from "./TopFilterBar.module.css";
import MovieGenresContext from "../../contexts/MovieGenresContext";
import TvGenresContext from "../../contexts/TvGenresContext";

export default function TopFilterBar({
  genreFilter,
  setGenreFilter,
  languageFilter,
  setLanguageFilter,
  requestType,
}) {
  const { movieGenres } = useContext(MovieGenresContext);
  const { tvGenres } = useContext(TvGenresContext);

  const [isActive, setIsActive] = useState(false);

  return (
    <nav className={styles.nav}>
      <section className={styles.navIcon}>
        <button
          type="button"
          className={
            isActive ? styles.hamburgerIconIsActive : styles.hamburgerIcon
          }
          onClick={() => setIsActive(!isActive)}
        >
          <div className={isActive ? styles.barIsActive : styles.bar} />
        </button>
      </section>
      <section>
        <div className={isActive ? styles.navListIsActive : styles.navList}>
          <h3 className={styles.navListTitle}>Trier par</h3>
          <h5 className={styles.navListSubTitle}>Genres</h5>
          <div className={styles.filterContainer}>
            <button
              type="button"
              className={`${
                genreFilter === "all"
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setGenreFilter("all")}
            >
              Tout
            </button>
            {requestType === "movie" &&
              movieGenres.map((genre) => (
                <button
                  key={genre.id}
                  type="button"
                  className={`${
                    genreFilter === `${genre.id}`
                      ? styles.buttonSelectTypeEnabled
                      : styles.buttonSelectType
                  }`}
                  onClick={() => setGenreFilter(`${genre.id}`)}
                >
                  {genre.name}
                </button>
              ))}
            {requestType === "tv" &&
              tvGenres.map((genre) => (
                <button
                  type="button"
                  className={`${
                    genreFilter === `${genre.id}`
                      ? styles.buttonSelectTypeEnabled
                      : styles.buttonSelectType
                  }`}
                  onClick={() => setGenreFilter(`${genre.id}`)}
                >
                  {genre.name}
                </button>
              ))}
          </div>
          <h5 className={styles.navListSubTitle}>Pays d'origine</h5>
          <div className={styles.filterContainer}>
            <button
              type="button"
              className={`${
                languageFilter === ""
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setLanguageFilter("")}
            >
              Tout
            </button>
            <button
              type="button"
              className={`${
                languageFilter === "en"
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setLanguageFilter("en")}
            >
              Anglais
            </button>
            <button
              type="button"
              className={`${
                languageFilter === "ko"
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setLanguageFilter("ko")}
            >
              Corée
            </button>
            <button
              type="button"
              className={`${
                languageFilter === "ja"
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setLanguageFilter("ja")}
            >
              Japon
            </button>
            <button
              type="button"
              className={`${
                languageFilter === "fr"
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setLanguageFilter("fr")}
            >
              Français
            </button>

            <button
              type="button"
              className={styles.buttonSearchFilter}
              onClick={() => setIsActive(!isActive)}
            >
              RECHERCHER
            </button>
          </div>
        </div>
      </section>
    </nav>
  );
}

TopFilterBar.propTypes = {
  genreFilter: PropTypes.string.isRequired,
  setGenreFilter: PropTypes.func.isRequired,
  languageFilter: PropTypes.string.isRequired,
  setLanguageFilter: PropTypes.func.isRequired,
  requestType: PropTypes.string.isRequired,
};
