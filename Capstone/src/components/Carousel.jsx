import React from "react";
import GameCard from "./GameCard";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
const usersCurrentGames = [
  {
    name: "League Of Legends",
    poster: "https://images.igdb.com/igdb/image/upload/t_cover_big/co49wj.png",
    genre: "MOBA",
    platform: "Mac or PC",
  },
  {
    name: "The Legend Of Zelda",
    poster: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.png",
    genre: "Adventure",
    platform: "Nintendo Switch",
  },
  {
    name: "Final Fantasy XVI",
    poster: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5w3k.png",
    genre: "RPG",
    platform: "Playstation5 or PC",
  },
  {
    name: "The Outlast Trials",
    poster: "https://images.igdb.com/igdb/image/upload/t_cover_big/co29og.png",
    genre: "Adventure",
    platform: "PC",
  },
  {
    name: "Age Of Wonders 4",
    poster: "https://images.igdb.com/igdb/image/upload/t_cover_big/co612o.png",
    genre: "Strategy/TBS",
    platform: "Playstation5,PC,Xbox",
  },
];
const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};
const Carousel = () => {
  return (
    <div className="carouselContainer">
      <AliceCarousel
        mouseTracking
        items={usersCurrentGames.map((game) => (
          <GameCard key={game.name} game={game} />
        ))}
        responsive={responsive}
        controlsStrategy="alternate"
      />
    </div>
  );
};

export default Carousel;
