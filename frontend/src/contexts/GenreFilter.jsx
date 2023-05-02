import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useState } from "react";

const GenreFilterContext = createContext();

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default GenreFilterContext;

export function GenreFilter({ children }) {
  const [genres, setGenres] = useState([]);

  const getGenres = () => {
    axios
      .get(
        ` https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=fr&include_adult=false`
      )
      .then(({ data }) => {
        setGenres(data.genres.id);
      })
      .catch((err) => console.error(err));
  };
  const genresObj = useMemo(() => {
    return {
      genres,
      getGenres,
    };
  }, [genres]);
  useEffect(getGenres, []);

  return (
    <GenreFilterContext.Provider value={genresObj}>
      {children}
    </GenreFilterContext.Provider>
  );
}
GenreFilter.propTypes = {
  children: PropTypes.shape().isRequired,
};
