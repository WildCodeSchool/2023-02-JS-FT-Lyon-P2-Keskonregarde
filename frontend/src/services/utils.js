/* Set Color based on Score value */
export function setScoreColor(score) {
  if (score <= 3.99) return "#FF0D0D";
  if (score >= 4 && score <= 6.99) return "#FAB733";
  if (score >= 7 && score <= 8.49) return "#92E000";
  if (score >= 8.4) return "#2AA10F";
  return null;
}

/* Set Date FR format */
export function setLocaleDate(date) {
  const releaseDate = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return releaseDate.toLocaleDateString("fr-FR", options);
}

/* Generate genre name based on genre id */
export function getGenreName(ids, genres) {
  const results = [];
  for (let i = 0; i < genres.length; i++) {
    if (ids.includes(genres[i].id)) results.push(genres[i].name);
  }
  return results.join(" / ");
}

/* Get director name based on index */
export function getDirectorName(crew) {
  for(let i = 0; i < crew.length; i++) {
    if (crew[i].job === "Director") return crew[i].name
  }
}
