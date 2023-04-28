import axios from "axios";
import "../App.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ResultsCardMovie from "../components/results-card-movie/ResultsCardMovie";
import ResultsCardTv from "../components/results-card-tv/ResultsCardTv";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Search() {
  const [results] = useSearchParams();

  const [requestType, setRequestType] = useState("movie");
  const [requestedData, setRequestedData] = useState(null);
  const [movies, setMovies] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  console.log(requestType);

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
            console.log("then");
            setRequestedData(data);
            setMovies(data.results);
          } else navigate("/search/no-results");
        })
        .catch((err) =>
          err.response.status === 404 ? navigate("/not-found") : null
        );
    return () => {};
  }, [results, pageNumber, location, location.search, location.state]);

  if (!requestedData || !requestType) return null;
  return (
    <>
      <div className="switch-type-container">
        <button
          type="button"
          className={
            requestType === "movie"
              ? "button-select-type-enabled"
              : "button-select-type"
          }
          onClick={() => {
            setRequestType("movie");
          }}
        >
          Films
        </button>
        <button
          type="button"
          className={
            requestType === "tv"
              ? "button-select-type-enabled"
              : "button-select-type"
          }
          onClick={() => {
            setRequestType("tv");
          }}
        >
          Séries TV
        </button>
      </div>
      <h5 className="results-number">
        Résultats trouvés : {requestedData.total_results}
      </h5>
      {requestType === "movie" && movies && (
        <ResultsCardMovie
          movies={movies}
          setMovies={setMovies}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      )}
      {requestType === "tv" && movies && (
        <ResultsCardTv
          movies={movies}
          setMovies={setMovies}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      )}
    </>
  );
}
