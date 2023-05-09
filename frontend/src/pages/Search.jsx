import axios from "axios";
import "../App.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SwitchButton from "../components/switch_button/SwitchButton";
import SearchFilterBar from "../components/search-filter-bar/SearchFilterBar";
import SearchResultsCard from "../components/search-results-card/SearchResultsCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Search() {
  const [results] = useSearchParams();

  const [requestType, setRequestType] = useState("movie");
  const [requestedData, setRequestedData] = useState(null);
  const [movies, setMovies] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scoreSelected, setScoreSelected] = useState("all");
  const [scoreFilter, setScoreFilter] = useState(scoreSelected);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = results.get("query") || "";
    if (pageNumber === 1)
      axios
        .get(
          `https://api.themoviedb.org/3/search/${requestType}?api_key=${API_KEY}&language=fr&query=${query}&page=${pageNumber}&include_adult=false`
        )
        .then(({ data }) => {
          if (data.total_results > 0) {
            setRequestedData(data);
            setMovies(data.results);
          } else navigate("/no-results");
        })
        .catch((err) =>
          err.response.status === 404 ? navigate("/not-found") : null
        );
    return () => {};
  }, [
    results,
    requestType,
    pageNumber,
    location,
    location.search,
    location.state,
    scoreFilter,
  ]);

  if (!requestedData || !requestType) return null;
  return (
    <>
      <SwitchButton requestType={requestType} setRequestType={setRequestType} />
      <h5 className="results-number">
        Résultats trouvés : {requestedData.total_results}
      </h5>
      <SearchFilterBar
        scoreSelected={scoreSelected}
        setScoreSelected={setScoreSelected}
        setScoreFilter={setScoreFilter}
      />
      {requestType && movies && (
        <SearchResultsCard
          requestType={requestType}
          movies={movies}
          setMovies={setMovies}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          scoreFilter={scoreFilter}
        />
      )}
    </>
  );
}
