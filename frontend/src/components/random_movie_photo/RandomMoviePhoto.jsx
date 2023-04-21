import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./RandomMoviePhoto.module.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function RandomMoviePhoto() {
  const [movies, setMovies] = useState("");

  const url = "https://image.tmdb.org/t/p/original";
  const randomMovies = [
    `https://api.themoviedb.org/3/movie/640146?api_key=${API_KEY}&language=fr&include_adult=false`,
    `https://api.themoviedb.org/3/movie/438631?api_key=${API_KEY}&language=fr&include_adult=false`,
    `https://api.themoviedb.org/3/movie/157336?api_key=${API_KEY}&language=fr&include_adult=false`,
    `https://api.themoviedb.org/3/movie/19995?api_key=${API_KEY}&language=fr&include_adult=false`,
    `https://api.themoviedb.org/3/movie/862?api_key=${API_KEY}&language=fr&include_adult=false`,
    `https://api.themoviedb.org/3/movie/680?api_key=${API_KEY}&language=fr&include_adult=false`,
    `https://api.themoviedb.org/3/movie/129?api_key=${API_KEY}&language=fr&include_adult=false`,
    `https://api.themoviedb.org/3/movie/8587?api_key=${API_KEY}&language=fr&include_adult=false`,
    `https://api.themoviedb.org/3/movie/700391?api_key=${API_KEY}&language=fr&include_adult=false`,
    `https://api.themoviedb.org/3/movie/458156?api_key=${API_KEY}&language=fr&include_adult=false`,
    `https://api.themoviedb.org/3/movie/278?api_key=${API_KEY}&language=fr&include_adult=false`,
    `https://api.themoviedb.org/3/movie/274?api_key=${API_KEY}&language=fr&include_adult=false`,
  ];
  useEffect(() => {
    axios
      .all(randomMovies.map((randomPhoto) => axios.get(randomPhoto)))
      .then((data) => {
        const randomPhoto = Math.floor(Math.random() * 12);
        setMovies(data[randomPhoto].data);
      });
  }, []);

  return (
    <div
      className={styles.moviePhoto}
      style={{
        backgroundImage: `url(${url}${movies.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
    >
      <div>
        <div>
          <h2 className={styles.titleMoviePhoto}>{movies.title}</h2>
          <h3 className={styles.dateMoviePhoto}>{movies.release_date}</h3>
        </div>
      </div>
    </div>
  );
}
