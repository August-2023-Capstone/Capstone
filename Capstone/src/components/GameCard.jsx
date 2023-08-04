import React from "react";

const GameCard = ({ game }) => {
  return (
    <div className="gameCard">
      <img
        className="w-full h-full object-cover"
        src={game.background_image}
        alt={game.name}
      />

      <h2>{game.name}</h2>
      <p>
        Genre:{" "}
        {game.genres.map((genre) => (
          <span key={genre.id}>{genre.name}, </span>
        ))}
      </p>
      <p>
        Platform:{" "}
        {game.platforms.map((platform) => (
          <span key={platform.platform.id}>{platform.platform.name}, </span>
        ))}
      </p>
      <button className="gameCardButton">+</button>
    </div>
  );
};

export default GameCard;
