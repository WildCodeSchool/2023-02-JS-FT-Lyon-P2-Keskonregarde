import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./SearchFilterBar.module.css";

export default function SearchFilterBar({ scoreFilter, setScoreFilter }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.navIcon}>
        <button
          type="button"
          className={
            isActive ? styles.hamburgerIconIsActive : styles.hamburgerIcon
          }
          onClick={() => setIsActive(!isActive)}
        >
          <div className={isActive ? styles.barIsActive : styles.bar} />
        </button>
      </div>
      <div className={isActive ? styles.navListIsActive : styles.navList}>
        <ul className={styles.switchTypeContainer}>
          <h5>Trier par score</h5>
          <li>
            <button
              type="button"
              className={`${
                scoreFilter === "all"
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setScoreFilter("all")}
            >
              Tout
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`${
                scoreFilter === "2"
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setScoreFilter("2")}
            >
              Noté +2
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`${
                scoreFilter === "4"
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setScoreFilter("4")}
            >
              Noté +4
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`${
                scoreFilter === "6"
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setScoreFilter("6")}
            >
              Noté +6
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`${
                scoreFilter === "8"
                  ? styles.buttonSelectTypeEnabled
                  : styles.buttonSelectType
              }`}
              onClick={() => setScoreFilter("8")}
            >
              Noté +8
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

SearchFilterBar.propTypes = {
  scoreFilter: PropTypes.string.isRequired,
  setScoreFilter: PropTypes.func.isRequired,
};
