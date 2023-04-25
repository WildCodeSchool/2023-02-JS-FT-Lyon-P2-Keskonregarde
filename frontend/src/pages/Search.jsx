import axios from "axios";
import "../App.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ResultsCard from "../components/results-card/ResultsCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Search() {
  const [results] = useSearchParams();

  const [requestedData, setRequestedData] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const query = results.get("query") || "";
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr&query=${query}&page=${page}&include_adult=false`
      )
      .then(({ data }) => {
        setRequestedData(data);
      });
  }, [results, page]);

  if (!requestedData) return null;
  return (
    <>
      <h5 className="results-number">
        Résultats trouvés : {requestedData.total_results}
      </h5>
      {requestedData && (
        <ResultsCard data={requestedData} page={page} setPage={setPage} />
      )}
    </>
  );
}
