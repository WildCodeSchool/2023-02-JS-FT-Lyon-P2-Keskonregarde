import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./RandomMoviePhoto.module.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function RandomMoviePhoto() {
  const [movie, setMovie] = useState("");

  const navigate = useNavigate();

  const url = "https://image.tmdb.org/t/p/original";
  const randomMoviesNumber = [
    "299536",
    "438631",
    "157336",
    "19995",
    "862",
    "120467",
    "129",
    "8587",
    "101",
    "458156",
    "278",
    "1667",
  ];
  useEffect(() => {
    const randomPhoto = Math.floor(Math.random() * 12);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${randomMoviesNumber[randomPhoto]}?api_key=${API_KEY}&language=fr&include_adult=false`
      )
      .then((data) => {
        setMovie(data.data);
      })
      .catch((err) =>
        err.response.status === 404 ? navigate("/not-found") : null
      );
  }, []);
  if (!movie) return null;
  return (
    <div
      className={styles.moviePhoto}
      style={{
        backgroundImage: `url(${url}${movie.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
    >
      <div className={styles.titleMoviePhoto}>
        <Link key={movie.id} to={`/movie/${movie.id}`}>
          <button className={styles.buttonMovieCard} type="button">
            Détails
          </button>
        </Link>
        <h2>
          {movie.title}, {movie.release_date.slice(0, 4)}
        </h2>
      </div>
    </div>
  );
}
