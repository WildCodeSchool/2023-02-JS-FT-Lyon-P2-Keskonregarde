import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./SearchFilterBar.module.css";

export default function SearchFilterBar({
  scoreSelected,
  setScoreSelected,
  setScoreFilter,
}) {
  const [isActive, setIsActive] = useState(false);

  function handleScoreSearch() {
    setIsActive(false);
    setScoreFilter(scoreSelected);
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
          <h5 className={styles.navListSubTitle}>Scores</h5>
          <div className={styles.switchTypeContainer}>
            <button
              type="button"
              className={`${
                scoreSelected === "all"
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setScoreSelected("all")}
            >
              Tout
            </button>
            <button
              type="button"
              className={`${
                scoreSelected === "2"
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setScoreSelected("2")}
            >
              Noté +2
            </button>
            <button
              type="button"
              className={`${
                scoreSelected === "4"
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setScoreSelected("4")}
            >
              Noté +4
            </button>
            <button
              type="button"
              className={`${
                scoreSelected === "6"
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setScoreSelected("6")}
            >
              Noté +6
            </button>
            <button
              type="button"
              className={`${
                scoreSelected === "8"
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setScoreSelected("8")}
            >
              Noté +8
            </button>
            <button
              type="button"
              className={styles.buttonSearchFilter}
              onClick={() => handleScoreSearch()}
            >
              RECHERCHER
            </button>
          </div>
        </div>
      </section>
    </nav>
  );
}

SearchFilterBar.propTypes = {
  scoreSelected: PropTypes.string.isRequired,
  setScoreSelected: PropTypes.func.isRequired,
  setScoreFilter: PropTypes.func.isRequired,
};
