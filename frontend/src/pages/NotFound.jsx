import React from "react";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h3>404 : Not Found.</h3>
      <img
        src="https://media.giphy.com/media/d10dMmzqCYqQ0/giphy-downsized-large.gif"
        alt="error 404"
      />
      <p>Votre requête n'a pas abouti.</p>
    </div>
  );
}
