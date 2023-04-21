import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./MovieCard.module.css";

export default function MovieCard() {
  const url = "https://image.tmdb.org/t/p/original/";
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr&include_adult=false&append_to_response=credits`
      )
      .then((response) => setMovie(response.data))
      .catch((err) => console.error(err));
  }, []);

  if (!movie) return null;
  return (
    <div className={styles.page}>
      <div
        style={{
          backgroundImage: `url(${url}${movie.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundSize: "cover",
        }}
      >
        <div className={styles.containerDetails}>
          <div className={styles.containerMovieCard}>
            <div className={styles.title}>
              <h2>
                {movie.title}, {movie.release_date.slice(0, 4)}{" "}
              </h2>
            </div>
            <div className={styles.movieGenres}>
              <p>
                {" "}
                {movie.genres[0].name}
                {movie.genres[1] === undefined
                  ? null
                  : `/${movie.genres[1].name}`}
                {movie.genres[2] === undefined
                  ? null
                  : `/${movie.genres[2].name}`}
              </p>
            </div>
            <div className={styles.movieCredits}>
              <h4>
                <div className={styles.creditsName}>
                  Director : {movie.credits.crew[1].name}
                </div>
              </h4>
              <h4>
                <div className={styles.creditsName}>
                  Actor : {movie.credits.cast[0].name},{" "}
                  {movie.credits.cast[2].name}
                </div>
              </h4>
            </div>
            <div className={styles.titleSynopsis}>
              <h5>Synopsis</h5>
            </div>
            <div className={styles.overview}>
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
