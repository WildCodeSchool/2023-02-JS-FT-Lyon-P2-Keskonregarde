import "../App.css";
import SearchBar from "../components/search-bar/SearchBar";
import RandomMoviePhoto from "../components/random_movie_photo/RandomMoviePhoto";

export default function Home() {
  return (
    <div>
      <header>
        <img
          src="./src/assets/Keskonregarde.gif"
          alt="logo"
          className="logo-pic"
        />
        <SearchBar />
      </header>
      <RandomMoviePhoto />
    </div>
  );
}
