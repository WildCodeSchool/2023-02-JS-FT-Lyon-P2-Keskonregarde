import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useMemo, useState } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Header from "./components/Header";
import MovieCard from "./components/movie-card/MovieCard";
import GenreFilterContext from "./contexts/GenreFilter";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function App() {
  const { genres, setGenres } = useState([]);
  const fetchGenres = useMemo(() => {
    axios
      .get(
        ` https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=fr&include_adult=false`
      )
      .then(({ data }) => {
        setGenres(data.genres.id);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <GenreFilterContext.Provider value={{ genres, setGenres, fetchGenres }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie" element={<MovieCard />} />
        <Route path="/movie/:id" element={<MovieCard />} />
      </Routes>
    </GenreFilterContext.Provider>
  );
}
