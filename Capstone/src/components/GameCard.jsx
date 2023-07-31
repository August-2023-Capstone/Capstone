import React from "react";

const GameCard = ({ game }) => {
  //   const game = {
  //     name: "League Of Legends",
  //     poster: "https://images.igdb.com/igdb/image/upload/t_cover_big/co49wj.png",
  //     genre: "MOBA",
  //     platform: "Mac or PC",
  //   };
  return (
    <div className="gameCard">
      <img src={game.poster} alt={game.name} />

      <h2>{game.name}</h2>
      <p>Genre: {game.genre}</p>
      <p>Platform: {game.platform}</p>
      <button className="gameCardButton">+</button>
    </div>
  );
};

export default GameCard;
