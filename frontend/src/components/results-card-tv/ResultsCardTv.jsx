import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import styles from "./ResultsCardTv.module.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function ResultsCardTv({
  movies,
  setMovies,
  pageNumber,
  setPageNumber,
}) {
  const [results] = useSearchParams();
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMoreData();
  }, [pageNumber]);

  const fetchMoreData = () => {
    const query = results.get("query") || "";
    axios
      .get(
        `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=fr&query=${query}&page=${pageNumber}&include_adult=false`
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
            {movies.map((movie) => (
              <Link key={movie.id} to={`/tv/${movie.id}`}>
                <div className={styles.cardContainer}>
                  <div className={styles.posterContainer}>
                    <img
                      src={
                        movie.poster_path
                          ? `${posterUrl}${movie.poster_path}`
                          : null
                      }
                      alt={movie.orginal_name}
                      className={styles.poster}
                    />
                  </div>
                  <div className={styles.infoContainer}>
                    <div>
                      <h4 className={styles.movieTitle}>{movie.name}</h4>
                      <h6 className={styles.movieDate}>
                        {movie.first_air_date}
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

ResultsCardTv.propTypes = {
  movies: PropTypes.shape().isRequired,
  setMovies: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
};