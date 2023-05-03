import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useState } from "react";

const MovieGenresContext = createContext();

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default MovieGenresContext;

export function MovieGenres({ children }) {
  const [genres, setGenres] = useState([]);
  const getGenres = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=fr`
      )
      .then(({ data }) => {
        setGenres(data);
      })
      .catch((err) => console.error(err));
  };
  const genresObj = useMemo(() => {
    return {
      genres,
    };
  }, [genres]);
  useEffect(getGenres, []);

  return (
    <MovieGenresContext.Provider value={genresObj}>
      {children}
    </MovieGenresContext.Provider>
  );
}
MovieGenres.propTypes = {
  children: PropTypes.shape().isRequired,
};
