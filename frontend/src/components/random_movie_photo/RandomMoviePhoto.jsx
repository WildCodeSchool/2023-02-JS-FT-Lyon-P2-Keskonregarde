import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./RandomMoviePhoto.module.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function RandomMoviePhoto() {
  const [randomMovies, setRandomMovies] = useState("");

  const url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/438631?api_key=${API_KEY}&language=fr&include_adult=false`
      )
      .then(({ data }) => {
        setRandomMovies(data);
      });
  }, []);

  return (
    <div
      className={styles.moviePhoto}
      style={{
        backgroundImage: `url(${url}${randomMovies.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
    >
      <div>
        <div>
          <h2 className={styles.titleMoviePhoto}>
            {randomMovies.original_title}
          </h2>
          <h3 className={styles.dateMoviePhoto}>{randomMovies.release_date}</h3>
        </div>
      </div>
    </div>
  );
}
