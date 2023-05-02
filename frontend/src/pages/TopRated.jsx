import axios from "axios";
import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResultsCardMovie from "../components/results-card-movie/ResultsCardMovie";
import ResultsCardTv from "../components/results-card-tv/ResultsCardTv";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function TopRated() {
  const [requestType, setRequestType] = useState("movie");
  const [requestedData, setRequestedData] = useState(null);
  const [movies, setMovies] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

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
  }, [movies, pageNumber]);

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
