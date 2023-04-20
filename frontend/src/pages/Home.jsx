import axios from "axios";
import "../App.css";
import { useEffect, useState } from "react";
import SearchBar from "../components/search-bar/SearchBar";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Home() {
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr&query=${query}&page=1&include_adult=false`
      )
      .then(({ data }) => {
        setMovies(data.results);
      });
  }, [query]);

  if (!movies) return null;
  return (
    <div>
      <header>
        <img
          src="./src/assets/Keskonregarde.gif"
          alt="logo"
          className="logo-pic"
        />
        <SearchBar query={query} setQuery={setQuery} />
      </header>
    </div>
  );
}
