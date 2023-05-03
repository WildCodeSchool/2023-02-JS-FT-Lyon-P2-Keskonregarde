import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useState } from "react";

const MovieGenresContext = createContext();

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default MovieGenresContext;

export function MovieGenres({ children }) {
  const [movieGenres, setMovieGenres] = useState([]);
  const getGenres = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=fr-FR`
      )
      .then(({ data }) => {
        setMovieGenres(data.genres);
      })
      .catch((err) => console.error(err));
  };
  const movieGenresObj = useMemo(() => {
    return {
      movieGenres,
    };
  }, [movieGenres]);
  useEffect(getGenres, []);

  return (
    <MovieGenresContext.Provider value={movieGenresObj}>
      {children}
    </MovieGenresContext.Provider>
  );
}
MovieGenres.propTypes = {
  children: PropTypes.shape().isRequired,
};
