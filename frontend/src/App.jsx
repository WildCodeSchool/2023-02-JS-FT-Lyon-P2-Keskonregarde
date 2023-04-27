import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Header from "./components/Header";
import MovieCard from "./components/movie-card/MovieCard";
import NotFound from "./pages/NotFound";
import NoResults from "./pages/NoResults";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie" element={<MovieCard />} />
        <Route path="/movie/:id" element={<MovieCard />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/search/no-results" element={<NoResults />} />
      </Routes>
    </>
  );
}

export default App;
