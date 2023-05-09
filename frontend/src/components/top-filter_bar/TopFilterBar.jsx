import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import styles from "./TopFilterBar.module.css";
import MovieGenresContext from "../../contexts/MovieGenresContext";
import TvGenresContext from "../../contexts/TvGenresContext";

export default function TopFilterBar({
  genreSelected,
  setGenreSelected,
  languageSelected,
  setLanguageSelected,
  setGenreFilter,
  setLanguageFilter,
  requestType,
}) {
  const { movieGenres } = useContext(MovieGenresContext);
  const { tvGenres } = useContext(TvGenresContext);

  const [isActive, setIsActive] = useState(false);

  function handleFilterSearch() {
    setIsActive(false);
    setGenreFilter(genreSelected);
    setLanguageFilter(languageSelected);
  }

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
                genreSelected === "all"
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setGenreSelected("all")}
            >
              Tout
            </button>
            {requestType === "movie" &&
              movieGenres.map((genre) => (
                <button
                  key={genre.id}
                  type="button"
                  className={`${
                    genreSelected === `${genre.id}`
                      ? styles.buttonSelectTypeEnabled
                      : styles.buttonSelectType
                  }`}
                  onClick={() => setGenreSelected(`${genre.id}`)}
                >
                  {genre.name}
                </button>
              ))}
            {requestType === "tv" &&
              tvGenres.map((genre) => (
                <button
                  key={genre.id}
                  type="button"
                  className={`${
                    genreSelected === `${genre.id}`
                      ? styles.buttonSelectTypeEnabled
                      : styles.buttonSelectType
                  }`}
                  onClick={() => setGenreSelected(`${genre.id}`)}
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
                languageSelected === ""
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setLanguageSelected("")}
            >
              Tout
            </button>
            <button
              type="button"
              className={`${
                languageSelected === "en"
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setLanguageSelected("en")}
            >
              Anglais
            </button>
            <button
              type="button"
              className={`${
                languageSelected === "ko"
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setLanguageSelected("ko")}
            >
              Corée
            </button>
            <button
              type="button"
              className={`${
                languageSelected === "ja"
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setLanguageSelected("ja")}
            >
              Japon
            </button>
            <button
              type="button"
              className={`${
                languageSelected === "fr"
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setLanguageSelected("fr")}
            >
              Français
            </button>

            <button
              type="button"
              className={styles.buttonSearchFilter}
              onClick={() => handleFilterSearch()}
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
  genreSelected: PropTypes.string.isRequired,
  setGenreSelected: PropTypes.func.isRequired,
  languageSelected: PropTypes.string.isRequired,
  setLanguageSelected: PropTypes.func.isRequired,
  setGenreFilter: PropTypes.func.isRequired,
  setLanguageFilter: PropTypes.func.isRequired,
  requestType: PropTypes.string.isRequired,
};
