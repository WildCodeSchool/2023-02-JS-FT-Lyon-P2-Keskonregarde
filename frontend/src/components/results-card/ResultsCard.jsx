import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import styles from "./ResultsCard.module.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function ResultsCardMovie({
  requestType,
  movies,
  setMovies,
  pageNumber,
  setPageNumber,
  filter,
}) {
  const [results] = useSearchParams();
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const fetchMoreData = () => {
    const query = results.get("query") || "";
    axios
      .get(
        `https://api.themoviedb.org/3/search/${requestType}?api_key=${API_KEY}&language=fr&query=${query}&page=${pageNumber}&include_adult=false`
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
    fetchMoreData();
  }, [pageNumber]);

  function getFilter() {
    if (filter === "all") return movies;
    if (filter === "action")
      return movies.filter((movie) => movie.genre_ids.includes(28));
    if (filter === "animation")
      return movies.filter((movie) => movie.genre_ids.includes(16));
    if (filter === "score")
      return movies.filter((movie) => movie.vote_average >= 7);
    return null;
  }

  const filteredMovies = useMemo(
    () => getFilter(movies, filter),
    [movies, filter]
  );

  function getScoreColor(movie) {
    if (movie.vote_average <= 3.99) return "#FF0D0D";
    if (movie.vote_average >= 4 && movie.vote_average <= 6.99) return "#FAB733";
    if (movie.vote_average >= 7 && movie.vote_average <= 8.49) return "#92E000";
    if (movie.vote_average >= 8.4 && movie.vote_average <= 10) return "#2AA10F";
    return null;
  }

  function setLocaleDate(movie) {
    if (requestType === "movie") {
      const releaseDate = new Date(movie.release_date);
      const options = {
        year: "numeric",
        month: "numeric",
      };
      return releaseDate.toLocaleDateString("fr-FR", options);
    }
    if (requestType === "tv") {
      const releaseDate = new Date(movie.first_air_date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return releaseDate.toLocaleDateString("fr-FR", options);
    }
    return null;
  }

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
            {filteredMovies.map((movie) => (
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
                        <h6 className={styles.movieDate}>
                          {movie.release_date || movie.first_air_date
                            ? setLocaleDate(movie)
                            : null}
                        </h6>
                      </div>
                      <p
                        className={styles.movieScore}
                        style={{ color: getScoreColor(movie) }}
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

ResultsCardMovie.propTypes = {
  requestType: PropTypes.string.isRequired,
  movies: PropTypes.shape().isRequired,
  setMovies: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
