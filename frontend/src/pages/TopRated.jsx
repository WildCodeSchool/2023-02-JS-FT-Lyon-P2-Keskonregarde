import axios from "axios";
import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopResultsCard from "../components/top-results-card/TopResultsCard";
import SwitchButton from "../components/switch_button/SwitchButton";
import TopFilterBar from "../components/top-filter_bar/TopFilterBar";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function TopRated() {
  const [requestType, setRequestType] = useState("movie");
  const [requestedData, setRequestedData] = useState(null);
  const [movies, setMovies] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [genreFilter, setGenreFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (pageNumber === 1)
      axios
        .get(
          `https://api.themoviedb.org/3/${requestType}/top_rated?api_key=${API_KEY}&language=fr&page=${pageNumber}&with_genres=${genreFilter}&with_original_language=${languageFilter}`
        )
        .then(({ data }) => {
          if (data.total_results > 0) {
            setRequestedData(data);
            setMovies(data.results);
          } else navigate("/search/no-results");
        })
        .catch((err) =>
          err.response.status === 404 ? navigate("/not-found") : null
        );
    return () => {};
  }, [requestType, pageNumber, genreFilter, languageFilter]);

  if (!requestedData || !requestType) return null;
  return (
    <>
      <SwitchButton requestType={requestType} setRequestType={setRequestType} />
      <h5 className="results-number">
        Résultats trouvés : {requestedData.total_results}
      </h5>
      <TopFilterBar
        genreFilter={genreFilter}
        setGenreFilter={setGenreFilter}
        languageFilter={languageFilter}
        setLanguageFilter={setLanguageFilter}
        requestType={requestType}
      />
      {requestType && movies && (
        <TopResultsCard
          requestType={requestType}
          movies={movies}
          setMovies={setMovies}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          genreFilter={genreFilter}
          languageFilter={languageFilter}
        />
      )}
    </>
  );
}
