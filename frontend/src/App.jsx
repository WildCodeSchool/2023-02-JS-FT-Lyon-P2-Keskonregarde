import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Search from "@pages/Search";
import Header from "@components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movies" />
      </Routes>
    </>
  );
}

export default App;
