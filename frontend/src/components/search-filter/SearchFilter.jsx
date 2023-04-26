import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./SearchFilter.module.css";

export default function SearchFilter() {
  const [genre, setGenre] = useState("");
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    axios
      .get(
        `  https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=fr`
      )
      .then((data) => setGenre(data.genres.name))
      .catch((err) => console.error(err));
  }, []);

  if (!genre) return null;
  return (
    <div className={styles.searchFilter}>
      <div>
        <button type="button" className={styles.buttonSearchFilter}>
          Genres
        </button>
        <button type="button" className={styles.buttonSearchFilter}>
          Années
        </button>
        <button type="button" className={styles.buttonSearchFilter}>
          Autre
        </button>
        <button type="button" className={styles.buttonSearchFilter}>
          Autre
        </button>
        <button type="button" className={styles.buttonSearchFilter}>
          Autre
        </button>
      </div>
    </div>
  );
}
