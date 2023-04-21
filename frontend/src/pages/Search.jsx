import axios from "axios";
import "../App.css";
import { useEffect, useState } from "react";
import ResultsCard from "@components/results-card/ResultsCard";
import { useSearchParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Search() {
  const [results, setResults] = useSearchParams();

  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const query = results.get("query") || "";
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr&query=${query}&page=${page}&include_adult=false`
      )
      .then(({ data }) => {
        setData(data);
      });
  }, [results, page]);

  if (!data) return null;
  return (
    <>
      <h5 className="results-number">
        Résultats trouvés : {data.total_results}
      </h5>
      {data && <ResultsCard data={data} page={page} setPage={setPage} />}
    </>
  );
}
