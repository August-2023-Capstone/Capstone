import React from "react";

const UserGameCards = ({ game }) => {
  return (
    <div className="ProfileGameCard">
      <img className="ProfileGameCardImage" src={game.poster} alt={game.name} />

      <h2 className="ProfileGameCardTitle">{game.name}</h2>
      <div className="ProfileGameCardInfo">
        <p>Genre: {game.genre}</p>
        <p>Platform: {game.platform}</p>
      </div>
      <button className="ProfileGameCardButton">-</button>
    </div>
  );
};

export default UserGameCards;
