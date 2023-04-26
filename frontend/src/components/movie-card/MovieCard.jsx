import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./MovieCard.module.css";

export default function MovieCard() {
  const url = "https://image.tmdb.org/t/p/original";
  const urlYT = "https://www.youtube.com/embed/";
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr&include_adult=false&append_to_response=credits,watch/providers,videos`
      )
      .then((response) => setMovie(response.data))
      .catch((err) => console.error(err));
  }, []);

  if (!movie) return null;

  return (
    <div className={styles.page}>
      <div
        style={{
          backgroundImage: `url(${
            movie?.backdrop_path === null
              ? null
              : `${url}${movie?.backdrop_path}`
          })`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundSize: "cover",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        className={styles.backdrop}
      >
        {" "}
      </div>
      <div className={styles.containerDetails}>
        <div className={styles.containerMovieCard}>
          <img
            src={`${url}${movie.poster_path}`}
            alt={movie.orginal_title}
            className={styles.moviePoster}
          />
          <div className={styles.movieInfos}>
            <div className={styles.title}>
              <h2>
                {movie.title}, {movie.release_date.slice(0, 4)}{" "}
              </h2>
            </div>
            <div className={styles.movieGenres}>
              <p>
                {" "}
                {movie.genres[0] === undefined
                  ? null
                  : `${movie.genres[0].name}`}
                {movie.genres[1] === undefined
                  ? null
                  : `/${movie.genres[1].name}`}
                {movie.genres[2] === undefined
                  ? null
                  : `/${movie.genres[2].name}`}
              </p>
            </div>
            <div className={styles.movieCredits}>
              <h3>
                <div className={styles.creditsName}>
                  Director :{" "}
                  {movie.credits?.crew[0]?.name
                    ? `${movie.credits.crew[1].name}`
                    : null}
                </div>
              </h3>
              <h3>
                <div className={styles.creditsName}>
                  Actor :
                  {movie.credits?.cast[0]?.name
                    ? `${movie.credits.cast[0].name}`
                    : null}
                  {movie.credits?.cast[1]?.name
                    ? `, ${movie.credits.cast[1].name}`
                    : null}
                </div>
              </h3>
            </div>
            <div className={styles.reverseDesktop}>
              <div className={styles.platformTrailer}>
                <div className="platforms">
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
                  <div className={styles.buttonTrailer}>
                    <a
                      type="button"
                      target="__blank"
                      href={
                        movie?.videos?.results
                          ? `${urlYT}${movie?.videos.results[0].key}`
                          : null
                      }
                    >
                      Bande-Annonce
                    </a>
                  </div>
                ) : null}
              </div>
              <div className={styles.overall}>
                <div className={styles.titleSynopsis}>
                  <h4>Synopsis</h4>
                </div>
                <div className={styles.overview}>
                  <p>{movie.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
