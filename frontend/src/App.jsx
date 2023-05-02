import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Header from "./components/Header";
import MovieCard from "./components/movie-card/MovieCard";
import NotFound from "./pages/NotFound";
import NoResults from "./pages/NoResults";
import TopRated from "./pages/TopRated";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/movie" element={<MovieCard />} />
        <Route path="/movie/:id" element={<MovieCard />} />
        {/* <Route path="/tv" element={<TvCard />} />
        <Route path="/tv/:id" element={<TvCard />} /> */}
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/search/no-results" element={<NoResults />} />
      </Routes>
    </>
  );
}
