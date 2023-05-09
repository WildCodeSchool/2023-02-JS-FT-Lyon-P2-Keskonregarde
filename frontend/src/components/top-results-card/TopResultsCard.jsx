import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import MovieGenresContext from "../../contexts/MovieGenresContext";
import TvGenresContext from "../../contexts/TvGenresContext";
import styles from "./TopResultsCard.module.css";
import {
  setScoreColor,
  setLocaleDate,
  getGenreName,
} from "../../services/utils";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function TopResultsCard({
  requestType,
  movies,
  setMovies,
  pageNumber,
  setPageNumber,
  genreFilter,
  languageFilter,
}) {
  const [hasMore, setHasMore] = useState(true);
  const { movieGenres } = useContext(MovieGenresContext);
  const { tvGenres } = useContext(TvGenresContext);

  const navigate = useNavigate();

  /* Re-fetch data each page for Infinite Scroll */
  const fetchMoreData = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/${requestType}/top_rated?api_key=${API_KEY}&language=fr&page=${pageNumber}&with_genres=${genreFilter}&with_original_language=${languageFilter}`
      )
      .then(({ data }) => {
        if (data.page !== data.total_pages) {
          setMovies([...movies, ...data.results]);
        } else setHasMore(false);
      })
      .catch((err) =>
        err.response.status === 404 ? navigate("/not-found") : null
      );
  };

  useEffect(() => {
    if (pageNumber !== 1) fetchMoreData();
  }, [pageNumber]);

  const posterUrl = "https://image.tmdb.org/t/p/w200";

  return (
    <div className={styles.infiniteScrollBox} id="scroll-box">
      <InfiniteScroll
        dataLength={movies.length}
        next={() => setPageNumber(pageNumber + 1)}
        hasMore={hasMore}
        loader={<p className="results-number">Chargement...</p>}
        endMessage={
          <p className="results-number">Il n'y a pas plus de résultats.</p>
        }
        scrollableTarget="scroll-box"
      >
        <div className={styles.searchResults}>
          <div className={styles.searchCard}>
            {movies
              .filter((movie) =>
                requestType === "movie" && languageFilter === ""
                  ? movie.vote_count > 5000
                  : movie
              )
              .map((movie) => (
                <Link
                  key={movie.id}
                  to={
                    requestType === "movie"
                      ? `/movie/${movie.id}`
                      : `/tv/${movie.id}`
                  }
                >
                  <div className={styles.cardContainer}>
                    <div className={styles.posterContainer}>
                      <img
                        src={
                          movie.poster_path
                            ? `${posterUrl}${movie.poster_path}`
                            : null
                        }
                        alt={
                          requestType === "movie"
                            ? movie.orginal_title
                            : movie.orginal_name
                        }
                        className={styles.poster}
                      />
                    </div>
                    <div className={styles.infoContainer}>
                      <div className={styles.movieHeader}>
                        <div>
                          <h4 className={styles.movieTitle}>
                            {requestType === "movie" ? movie.title : movie.name}
                          </h4>
                          <h5 className={styles.movieGenre}>
                            {requestType === "movie"
                              ? getGenreName(movie.genre_ids, movieGenres)
                              : null}
                            {requestType === "tv"
                              ? getGenreName(movie.genre_ids, tvGenres)
                              : null}
                          </h5>
                          <p className={styles.movieDate}>
                            {movie.release_date
                              ? setLocaleDate(movie.release_date)
                              : null}
                            {movie.first_air_date
                              ? setLocaleDate(movie.first_air_date)
                              : null}
                          </p>
                        </div>
                        <p
                          className={styles.movieScore}
                          style={{ color: setScoreColor(movie.vote_average) }}
                        >
                          {movie.vote_average.toFixed(1)}
                        </p>
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

TopResultsCard.propTypes = {
  requestType: PropTypes.string.isRequired,
  movies: PropTypes.shape().isRequired,
  setMovies: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  genreFilter: PropTypes.string.isRequired,
  languageFilter: PropTypes.string.isRequired,
};
