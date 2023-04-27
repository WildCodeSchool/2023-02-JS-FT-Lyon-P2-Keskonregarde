import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./MovieCard.module.css";


export default function MovieCard() {
  const url = "https://image.tmdb.org/t/p/original";
  const urlYt = "https://www.youtube.com/embed/";
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const navigate = useNavigate();

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr&include_adult=false&append_to_response=credits,watch/providers,videos`
      )
      .then((response) => setMovie(response.data))
      .catch((err) =>
        err.response.status === 404 ? navigate("/not-found") : null
      );
  }, []);

  if (!movie) return null;

  return (
    <div className={styles.movieCardPage}>
      <section
        style={{
          backgroundImage: `url(${
            movie?.backdrop_path === null
              ? null
              : `${url}${movie?.backdrop_path}`
          })`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundSize: "cover",
          boxShadow: "0px 0px 5px var(--darkGrey)",
        }}
        className={styles.mobileMovieCard}
      >
        <div className={styles.containerMovieCard}>
          <div>
            <h2 className={styles.movieTitle}>
              {movie.title}, {movie.release_date.slice(0, 4)}{" "}
            </h2>
            <h5 className={styles.movieGenres}>
              {" "}
              {movie.genres[0] === undefined ? null : `${movie.genres[0].name}`}
              {movie.genres[1] === undefined
                ? null
                : `/${movie.genres[1].name}`}
              {movie.genres[2] === undefined
                ? null
                : `/${movie.genres[2].name}`}
            </h5>
            <div className={styles.movieCredits}>
              <h3>
                Réalisateur :{" "}
                {movie.credits?.crew[0]?.name
                  ? `${movie.credits.crew[1].name}`
                  : null}
              </h3>
              <h3>
                Acteurs :{" "}
                {movie.credits?.cast[0]?.name
                  ? `${movie.credits.cast[0].name}`
                  : null}
                {movie.credits?.cast[1]?.name
                  ? `, ${movie.credits.cast[1].name}`
                  : null}
                ...
              </h3>
            </div>
          </div>
          <div>
            <div className={styles.movieFeatures}>
              <div>
                {movie["watch/providers"].results?.FR?.flatrate ||
                movie["watch/providers"].results?.FR?.buy ? (
                  <img
                    src={
                      movie["watch/providers"].results.FR.flatrate
                        ? `${url}${movie["watch/providers"].results.FR.flatrate[0].logo_path}`
                        : `${url}${movie["watch/providers"].results.FR.buy[0].logo_path}`
                    }
                    alt={movie.provider_name}
                    className={styles.logoPlatform}
                  />
                ) : null}
                {movie["watch/providers"].results?.FR?.flatrate ||
                movie["watch/providers"].results?.FR?.buy ? (
                  <img
                    src={
                      movie["watch/providers"].results.FR.flatrate
                        ? `${url}${movie["watch/providers"].results.FR.flatrate[1]?.logo_path}`
                        : `${url}${movie["watch/providers"].results.FR.buy[1].logo_path}`
                    }
                    alt={movie.provider_name}
                    className={styles.logoPlatform}
                  />
                ) : null}
              </div>
              {movie.videos?.results[0]?.key ? (
                <button type="button" className={styles.buttonTrailer}>
                  <a
                    type="button"
                    target="__blank"
                    href={
                      movie?.videos?.results
                        ? `${urlYt}${movie?.videos.results[0].key}`
                        : null
                    }
                  >
                    Trailer
                  </a>
                </button>
              ) : null}
            </div>
          </div>
          <div className={styles.containerSynopsis}>
            <h2 className={styles.titleSynopsis}>Synopsis</h2>
            <p className={styles.movieSynopsis}>{movie.overview}</p>
          </div>
        </div>
      </section>
      <section className={styles.desktopMovieCard}>
        <img
          src={`${url}${movie.poster_path}`}
          alt={movie.orginal_title}
          className={styles.moviePoster}
        />
        <div className={styles.containerMovieCard}>
          <div>
            <h2 className={styles.movieTitle}>
              {movie.title}, {movie.release_date.slice(0, 4)}
            </h2>
            <h5 className={styles.movieGenres}>
              {movie.genres[0] === undefined ? null : `${movie.genres[0].name}`}
              {movie.genres[1] === undefined
                ? null
                : `/${movie.genres[1].name}`}
              {movie.genres[2] === undefined
                ? null
                : `/${movie.genres[2].name}`}
            </h5>
            <div className={styles.movieCredits}>
              <h3>
                Réalisateur :{" "}
                {movie.credits?.crew[0]?.name
                  ? `${movie.credits.crew[1].name}`
                  : null}
              </h3>
              <h3>
                Acteurs :{" "}
                {movie.credits?.cast[0]?.name
                  ? `${movie.credits.cast[0].name}`
                  : null}
                {movie.credits?.cast[1]?.name
                  ? `, ${movie.credits.cast[1].name}`
                  : null}
                ...
              </h3>
            </div>
          </div>
          <div className={styles.reverseCard}>
            <div className={styles.movieFeatures}>
              <div>
                {movie["watch/providers"].results?.FR?.flatrate ||
                movie["watch/providers"].results?.FR?.buy ? (
                  <img
                    src={
                      movie["watch/providers"].results.FR.flatrate
                        ? `${url}${movie["watch/providers"].results.FR.flatrate[0].logo_path}`
                        : `${url}${movie["watch/providers"].results.FR.buy[0].logo_path}`
                    }
                    alt={movie.provider_name}
                    className={styles.logoPlatform}
                  />
                ) : null}
                {movie["watch/providers"].results?.FR?.flatrate ||
                movie["watch/providers"].results?.FR?.buy ? (
                  <img
                    src={
                      movie["watch/providers"].results.FR.flatrate
                        ? `${url}${movie["watch/providers"].results.FR.flatrate[1]?.logo_path}`
                        : `${url}${movie["watch/providers"].results.FR.buy[1].logo_path}`
                    }
                    alt={movie.provider_name}
                    className={styles.logoPlatform}
                  />
                ) : null}
              </div>
              {movie.videos?.results[0]?.key ? (
                <button type="button" className={styles.buttonTrailer}>
                  <a
                    type="button"
                    target="__blank"
                    href={
                      movie?.videos?.results
                        ? `${urlYt}${movie?.videos.results[0].key}`
                        : null
                    }
                  >
                    Trailer
                  </a>
                </button>
              ) : null}
            </div>
            <div className={styles.containerSynopsis}>
              <h2 className={styles.titleSynopsis}>Synopsis</h2>
              <p className={styles.movieSynopsis}>{movie.overview}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
