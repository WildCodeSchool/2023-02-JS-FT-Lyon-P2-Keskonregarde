import React from "react";
import PropTypes from "prop-types";
import styles from "./SwitchButton.module.css";

export default function SwitchButton({ requestType, setRequestType }) {
  return (
    <div className={styles.switchTypeContainer}>
      <button
        type="button"
        className={`${
          requestType === "movie"
            ? styles.buttonSelectTypeEnabled
            : styles.buttonSelectType
        }`}
        onClick={() => {
          setRequestType("movie");
        }}
      >
        Films
      </button>
      <button
        type="button"
        className={`${
          requestType === "tv"
            ? styles.buttonSelectTypeEnabled
            : styles.buttonSelectType
        }`}
        onClick={() => {
          setRequestType("tv");
        }}
      >
        Séries TV
      </button>
    </div>
  );
}
SwitchButton.propTypes = {
  requestType: PropTypes.string.isRequired,
  setRequestType: PropTypes.func.isRequired,
};
