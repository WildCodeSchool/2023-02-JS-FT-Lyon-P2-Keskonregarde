import { Link } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import styles from "./ResultsCard.module.css";

export default function ResultsCard({ data, page, setPage }) {
  const posterUrl = "https://image.tmdb.org/t/p/w200";

  return (
    <div className={styles.searchResults}>
      <div className={styles.searchCard}>
        {data.results.map((movie) => (
          <Link key={movie.id} to="/movie/:id">
            <div className={styles.cardContainer}>
              <div className={styles.posterContainer}>
                <img
                  src={`${posterUrl}${movie.poster_path}`}
                  alt={movie.orginal_title}
                  className={styles.poster}
                />
              </div>
              <div className={styles.infoContainer}>
                <div>
                  <h4 className={styles.movieTitle}>{movie.title}</h4>
                  <h6 className={styles.movieDate}>
                    {movie.release_date.slice(0, 4)}
                  </h6>
                </div>
                <p className={styles.movieSynopsis}>
                  {`${movie.overview.slice(0, 75)}...`}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button
          type="submit"
          onClick={() => setPage(page - 1)}
          className={styles.prevButton}
        >
          Previous
        </button>
        <button
          type="submit"
          onClick={() => setPage(page + 1)}
          className={styles.prevButton}
        >
          Next
        </button>
      </div>
    </div>
  );
}

ResultsCard.propTypes = {
  data: PropTypes.shape().isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
