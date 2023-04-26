import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";
import PropTypes from "prop-types";
import styles from "./ResultsCard.module.css";

export default function ResultsCard({ movies, hasMore, fetchMoreData }) {
  const posterUrl = "https://image.tmdb.org/t/p/w200";

  return (
    <div className={styles.infiniteScrollBox} id="scroll-box">
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p className="results-number">Chargement...</p>}
        endMessage={
          <p className="results-number">Il n'y a pas plus de résultats.</p>
        }
        scrollableTarget="scroll-box"
      >
        <div className={styles.searchResults}>
          <div className={styles.searchCard}>
            {movies.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <div className={styles.cardContainer}>
                  <div className={styles.posterContainer}>
                    <img
                      src={
                        movie.poster_path
                          ? `${posterUrl}${movie.poster_path}`
                          : null
                      }
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
        </div>
      </InfiniteScroll>
    </div>
  );
}

ResultsCard.propTypes = {
  movies: PropTypes.array.isRequired,
  hasMore: PropTypes.bool,
  fetchMoreData: PropTypes.func,
};
