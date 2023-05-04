import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setLocaleDate } from "../../services/utils";
import styles from "./TvCard.module.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function TvCard() {
  const { id } = useParams();
  const [tv, setTv] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=fr&include_adult=false&append_to_response=credits,watch/providers,videos`
      )
      .then((response) => setTv(response.data))
      .catch((err) =>
        err.response.status === 404 ? navigate("/not-found") : null
      );
  }, []);

  const url = "https://image.tmdb.org/t/p/original";
  const urlYt = "https://www.youtube.com/embed/";

  const provider = [
    { name: "Apple TV", link: "https://tv.apple.com/" },
    {
      name: "Google Play Movies",
      link: "https://play.google.com/store/movies?hl=fr&gl=US",
    },
    { name: "Netflix", link: "https://www.netflix.com/fr/" },
    {
      name: "Amazon Prime Video",
      link: "https://www.primevideo.com/offers/nonprimehomepage/ref=atv_nb_sf_hm",
    },
    { name: "Disney Plus", link: "https://www.disneyplus.com/fr-fr" },
    { name: "Canal+", link: "https://boutique.canalplus.com/" },
    { name: "Paramount Plus", link: "https://www.paramountplus.com/fr/" },
    {
      name: "Pass Warner Amazon Channel",
      link: "https://www.primevideo.com/offers/nonprimehomepage/ref=atv_nb_sf_hm",
    },
  ];

  function getPlatformLink(platformName) {
    for (let i = 0; i < provider.length; i += 1) {
      if (platformName === provider[i].name) return provider[i].link;
    }
    return null;
  }

  if (!tv) return null;
  return (
    <div className={styles.tvCardPage}>
      <section
        style={{
          backgroundImage: `url(${
            tv?.backdrop_path === null ? null : `${url}${tv?.backdrop_path}`
          })`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundSize: "cover",
          boxShadow: "0px 0px 5px var(--darkGrey)",
        }}
        className={styles.mobileTvCard}
      >
        <div className={styles.containerTvCard}>
          <div>
            <h2 className={styles.tvTitle}>
              {tv.name}, {tv.first_air_date.slice(0, 4)}{" "}
            </h2>
            <h5 className={styles.tvGenres}>
              {" "}
              {tv.genres[0] === undefined ? null : `${tv.genres[0].name}`}
              {tv.genres[1] === undefined ? null : `/${tv.genres[1].name}`}
              {tv.genres[2] === undefined ? null : `/${tv.genres[2].name}`}
            </h5>
            <div className={styles.tvCredits}>
              <h3>
                Réalisateur :{" "}
                {tv.created_by[0]?.name ? `${tv.created_by[0].name}` : null}
              </h3>
              <h3>
                Acteurs :{" "}
                {tv.credits?.cast[0]?.name
                  ? `${tv.credits.cast[0].name}`
                  : null}
                {tv.credits?.cast[1]?.name
                  ? `, ${tv.credits.cast[1].name}`
                  : null}
                ...
              </h3>
            </div>
          </div>
          <div>
            <div className={styles.tvFeatures}>
              <div>
                {tv["watch/providers"].results?.FR?.flatrate ||
                tv["watch/providers"].results?.FR?.buy ? (
                  <a
                    href={getPlatformLink(
                      tv["watch/providers"].results?.FR?.flatrate
                        ? tv["watch/providers"].results?.FR?.flatrate[0]
                            ?.provider_name
                        : tv["watch/providers"].results?.FR?.buy[0]
                            .provider_name
                    )}
                  >
                    <img
                      src={
                        tv["watch/providers"].results.FR.flatrate
                          ? `${url}${tv["watch/providers"].results.FR.flatrate[0].logo_path}`
                          : `${url}${tv["watch/providers"].results.FR.buy[0].logo_path}`
                      }
                      alt={tv.provider_name}
                      className={styles.logoPlatform}
                    />
                  </a>
                ) : null}
                {tv["watch/providers"].results?.FR?.flatrate ||
                tv["watch/providers"].results?.FR?.buy ? (
                  <a
                    href={getPlatformLink(
                      tv["watch/providers"].results?.FR?.buy
                        ? tv["watch/providers"].results?.FR?.flatrate[1]
                            ?.provider_name
                        : tv["watch/providers"].results?.FR?.flatrate[0]
                            .provider_name
                    )}
                  >
                    <img
                      src={
                        tv["watch/providers"].results.FR.buy
                          ? `${url}${tv["watch/providers"].results.FR.buy[1]?.logo_path}`
                          : `${url}${tv["watch/providers"].results.FR.flatrate[0].logo_path}`
                      }
                      alt={tv.provider_name}
                      className={styles.logoPlatform}
                    />
                  </a>
                ) : null}
              </div>
              {tv.videos?.results[0]?.key ? (
                <button type="button" className={styles.buttonTrailer}>
                  <a
                    type="button"
                    target="__blank"
                    href={
                      tv?.videos?.results
                        ? `${urlYt}${tv?.videos.results[0].key}`
                        : null
                    }
                  >
                    Trailer
                  </a>
                </button>
              ) : null}
            </div>
            <div className={styles.containerSynopsis}>
              <h2 className={styles.titleSynopsis}>Synopsis</h2>
              <p className={styles.tvSynopsis}>{tv.overview}</p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.desktopTvCard}>
        <img
          src={`${url}${tv.poster_path}`}
          alt={tv.name}
          className={styles.tvPoster}
        />
        <div className={styles.containerTvCard}>
          <div>
            <h2 className={styles.tvTitle}>{tv.name}</h2>
            <h5 className={styles.tvGenres}>
              {tv.genres[0] === undefined ? null : `${tv.genres[0].name}`}
              {tv.genres[1] === undefined ? null : ` / ${tv.genres[1].name}`}
              {tv.genres[2] === undefined ? null : ` / ${tv.genres[2].name}`}
            </h5>
            <p className={styles.tvDates}>
              {`Première diffusion : ${setLocaleDate(tv.first_air_date)}`}
            </p>
            <div className={styles.tvCredits}>
              <h3>
                Réalisateur :{" "}
                {tv.created_by[0]?.name ? `${tv.created_by[0].name}` : null}
              </h3>
              <h3>
                Acteurs :{" "}
                {tv.credits?.cast[0]?.name
                  ? `${tv.credits.cast[0].name}`
                  : null}
                {tv.credits?.cast[1]?.name
                  ? `, ${tv.credits.cast[1].name}`
                  : null}
                ...
              </h3>
            </div>
          </div>
          <div className={styles.reverseCard}>
            <div className={styles.tvFeatures}>
              <div>
                {tv["watch/providers"].results?.FR?.flatrate ||
                tv["watch/providers"].results?.FR?.buy ? (
                  <a
                    href={getPlatformLink(
                      tv["watch/providers"].results?.FR?.flatrate
                        ? tv["watch/providers"].results?.FR?.flatrate[0]
                            ?.provider_name
                        : tv["watch/providers"].results?.FR?.buy[0]
                            .provider_name
                    )}
                  >
                    <img
                      src={
                        tv["watch/providers"].results.FR.flatrate
                          ? `${url}${tv["watch/providers"].results.FR.flatrate[0].logo_path}`
                          : `${url}${tv["watch/providers"].results.FR.buy[0].logo_path}`
                      }
                      alt={tv.provider_name}
                      className={styles.logoPlatform}
                    />
                  </a>
                ) : null}
                {tv["watch/providers"].results?.FR?.flatrate ||
                tv["watch/providers"].results?.FR?.buy ? (
                  <a
                    href={getPlatformLink(
                      tv["watch/providers"].results?.FR?.buy
                        ? tv["watch/providers"].results?.FR?.buy[1]
                            ?.provider_name
                        : tv["watch/providers"].results?.FR?.flatrate[0]
                            .provider_name
                    )}
                  >
                    <img
                      src={
                        tv["watch/providers"].results.FR.buy
                          ? `${url}${tv["watch/providers"].results.FR.buy[1]?.logo_path}`
                          : `${url}${tv["watch/providers"].results.FR.flatrate[0].logo_path}`
                      }
                      alt={tv.provider_name}
                      className={styles.logoPlatform}
                    />
                  </a>
                ) : null}
              </div>
              {tv.videos?.results[0]?.key ? (
                <button type="button" className={styles.buttonTrailer}>
                  <a
                    type="button"
                    target="__blank"
                    href={
                      tv?.videos?.results
                        ? `${urlYt}${tv?.videos.results[0].key}`
                        : null
                    }
                  >
                    Trailer
                  </a>
                </button>
              ) : null}
            </div>
            <div className={styles.containerSynopsis}>
              <h2 className={styles.titleSynopsis}>Synopsis</h2>
              <p className={styles.tvSynopsis}>{tv.overview}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
