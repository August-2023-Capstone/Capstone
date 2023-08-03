import React from "react";
import NintendoSwitch from "../assets/Logos/NintendoSwitchLogo.png";
import Playstation from "../assets/Logos/PlaystationLogo.png";
import Windows from "../assets/Logos/WindowsLogo.png";
import Xbox from "../assets/Logos/XboxLogo.png";
import iOS from "../assets/Logos/AppleLogo.png";

const HomeGameCard = ({ game }) => {
  const platformImages = {
    PC: Windows,
    Xbox: Xbox,
    "Xbox One": Xbox,
    "Xbox Series S/X": Xbox,
    Playstation: Playstation,
    "PlayStation 4": Playstation,
    "PlayStation 5": Playstation,
    "Nintendo Switch": NintendoSwitch,
    iOS: iOS,
  };
  return (
    <div className="HomeGameCard">
      <img
        className="w-full h-full object-cover"
        src={game.background_image}
        alt={game.name}
      />

      <h2 className="HomeGameCardTitle">{game.name}</h2>
      <div className="HomeGameCardInfo">
        <p>
          {game.platforms.map((platform) => (
            <img
              className="PlatformLogos"
              key={platform.platform.id}
              src={`${platformImages[platform.platform.name]}`}
              alt={platform.platform.name}
            />
          ))}
        </p>
        <p>
          {game.genres.map((genre) => (
            <span key={genre.id}>{genre.name}, </span>
          ))}
        </p>
      </div>
      <button className="HomeGameCardButton">+</button>
    </div>
  );
};

export default HomeGameCard;
