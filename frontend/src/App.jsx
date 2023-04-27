import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Header from "./components/Header";
import MovieCard from "./components/movie-card/MovieCard";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie" element={<MovieCard />} />
        <Route path="/movie/:id" element={<MovieCard />} />
      </Routes>
    </>
  );
}
