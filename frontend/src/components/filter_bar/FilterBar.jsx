import React from "react";
import styles from "./FilterBar.module.css";

export default function FilterBar({ filter, setFilter }) {
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
      <button
        type="button"
        className={`${
          filter === "action"
            ? styles.buttonSelectTypeEnabled
            : styles.buttonSelectType
        }`}
        onClick={() => setFilter("action")}
      >
        Action
      </button>
      <button
        type="button"
        className={`${
          filter === "animation"
            ? styles.buttonSelectTypeEnabled
            : styles.buttonSelectType
        }`}
        onClick={() => setFilter("animation")}
      >
        Animation
      </button>
      <button
        type="button"
        className={`${
          filter === "score"
            ? styles.buttonSelectTypeEnabled
            : styles.buttonSelectType
        }`}
        onClick={() => setFilter("score")}
      >
        Score +7
      </button>
    </div>
  );
}
