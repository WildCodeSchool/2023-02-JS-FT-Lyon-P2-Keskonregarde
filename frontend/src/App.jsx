import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import "./App.css";
=======
import Home from "@pages/Home";
import Search from "@pages/Search";
import Header from "@components/Header";
>>>>>>> 78d64f83e7fc63f7904d0129a395e95dca4f1a06

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/:id" element={<Movie />} />
=======
        <Route path="/search" element={<Search />} />
        <Route path="/movies" />
>>>>>>> 78d64f83e7fc63f7904d0129a395e95dca4f1a06
      </Routes>
    </>
  );
}

export default App;
