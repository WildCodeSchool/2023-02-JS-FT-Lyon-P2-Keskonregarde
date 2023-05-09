import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Header from "./components/Header";
import MovieCard from "./components/movie-card/MovieCard";
import TvCard from "./components/tv-card/TvCard";
import NotFound from "./pages/NotFound";
import NoResults from "./pages/NoResults";
import TopRated from "./pages/TopRated";
import { MovieGenres } from "./contexts/MovieGenresContext";
import { TvGenres } from "./contexts/TvGenresContext";

export default function App() {
  return (
    <>
      <Header />
      <MovieGenres>
        <TvGenres>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/top-rated" element={<TopRated />} />
            <Route path="/movie/:id" element={<MovieCard />} />
            <Route path="/tv/:id" element={<TvCard />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/no-results" element={<NoResults />} />
          </Routes>
        </TvGenres>
      </MovieGenres>
    </>
  );
}
