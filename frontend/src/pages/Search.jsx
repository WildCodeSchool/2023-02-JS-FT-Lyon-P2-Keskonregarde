import axios from "axios";
import "../App.css";
import { useEffect, useState } from "react";
import ResultsCard from "@components/results-card/ResultsCard";
import SearchBar from "../components/search-bar/SearchBar";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Search() {
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr&query=${query}&page=${page}&include_adult=false`
      )
      .then(({ data }) => {
        setMovies(data.results);
      });
  }, [query, page]);

  if (!movies) return null;
  return (
    <div>
      <header>
        <img
          src="../src/assets/Keskonregarde.gif"
          alt="logo"
          className="logo-pic"
        />
        <SearchBar setQuery={setQuery} />
      </header>
      <div>
        {query && <ResultsCard movies={movies} page={page} setPage={setPage} />}
      </div>
    </div>
  );
}
