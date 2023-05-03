import axios from "axios";
import "../App.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ResultsCardMovie from "../components/results-card/ResultsCard";
import SwitchButton from "../components/switch_button/SwitchButton";
import FilterBar from "../components/filter_bar/FilterBar";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Search() {
  const [results] = useSearchParams();

  const [requestType, setRequestType] = useState("movie");
  const [requestedData, setRequestedData] = useState(null);
  const [movies, setMovies] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [filter, setFilter] = useState("all");

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
          } else navigate("/search/no-results");
        })
        .catch((err) =>
          err.response.status === 404 ? navigate("/not-found") : null
        );
    return () => {};
  }, [results, movies, pageNumber, location, location.search, location.state]);

  if (!requestedData || !requestType) return null;
  return (
    <>
      <SwitchButton requestType={requestType} setRequestType={setRequestType} />
      <h5 className="results-number">
        Résultats trouvés : {requestedData.total_results}
      </h5>
      <FilterBar filter={filter} setFilter={setFilter} />
      {requestType && movies && (
        <ResultsCardMovie
          requestType={requestType}
          movies={movies}
          setMovies={setMovies}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          filter={filter}
        />
      )}
    </>
  );
}
