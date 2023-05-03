import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useState } from "react";

const TvGenresContext = createContext();

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default TvGenresContext;

export function TvGenres({ children }) {
  const [genres, setGenres] = useState([]);
  const getGenres = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=fr-FR`
      )
      .then(({ data }) => {
        setGenres(data.genres);
      })
      .catch((err) => console.error(err));
  };
  const tvGenresObj = useMemo(() => {
    return {
      genres,
    };
  }, [genres]);
  useEffect(getGenres, []);

  return (
    <TvGenresContext.Provider value={tvGenresObj}>
      {children}
    </TvGenresContext.Provider>
  );
}
TvGenres.propTypes = {
  children: PropTypes.shape().isRequired,
};
