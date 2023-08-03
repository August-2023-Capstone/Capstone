import React from "react";
import PlaystationLogo from "../assets/Logos/PlaystationLogo.png";
import XboxLogo from "../assets/Logos/XboxLogo.png";
import WindowsLogo from "../assets/Logos/WindowsLogo.png";

const GameCard = ({ game }) => {
  const platformIcons = {
    PC: WindowsLogo,
    Playstation: PlaystationLogo,
  };

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
