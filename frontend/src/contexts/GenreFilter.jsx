/*
import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useMemo, useState } from "react";

const GenreFilterContext = createContext();

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default GenreFilterContext;

export function GenreFilter({ children }) {
  const [genres, setGenres] = useState([]);
  const fetchGenres = useMemo(() => {
    axios
      .get(
        ` https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=fr&include_adult=false`
      )
      .then(({ data }) => {
        console.log(data);

        setGenres(data.genres.id);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <GenreFilterContext.Provider value={{ genres, fetchGenres }}>
      {children}
    </GenreFilterContext.Provider>
  );
}
GenreFilter.propTypes = {
  children: PropTypes.shape().isRequired,
};
*/
