import axios from "axios";
import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResultsCardMovie from "../components/results-card/ResultsCard";
import SwitchButton from "../components/switch_button/SwitchButton";
import FilterBar from "../components/filter_bar/FilterBar";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function TopRated() {
  const [requestType, setRequestType] = useState("movie");
  const [requestedData, setRequestedData] = useState(null);
  const [movies, setMovies] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    if (pageNumber === 1)
      axios
        .get(
          `https://api.themoviedb.org/3/${requestType}/top_rated?api_key=${API_KEY}&language=fr&page=${pageNumber}`
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
  }, [requestType, movies, pageNumber]);

  if (!requestedData || !requestType) return null;
  return (
    <>
      <SwitchButton requestType={requestType} setRequestType={setRequestType} />
      <h5 className="results-number">
        Résultats trouvés : {requestedData.total_results}
      </h5>
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        requestType={requestType}
      />
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
