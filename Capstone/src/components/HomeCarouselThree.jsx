import React, { useEffect, useState } from "react";
import TestHomeGameCard from "./TestHomeGameCard";
import supabase from "../../supabase";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

const HomeCarouselOne = () => {
  const [gameArray, setGameArray] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(6);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API request
        const response = await fetch(
          "https://api.rawg.io/api/games?key=708a4757c9d748448c87455a3ecd365c&ordering=-added&dates=2023-05-01,2023-08-10&tags=multiplayer&page_size=24"
        );
        const jsonData = await response.json();

        setGameArray(jsonData.results);
        setSlidesToShow(Math.min(jsonData.results.length, 6));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []);
  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <button
        className={`${className} custom-prev-arrow`}
        style={{ ...style, left: "40px" }}
        onClick={onClick}
      >
        Previous
      </button>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <button
        className={`${className} custom-next-arrow`}
        style={{ ...style, right: "1px" }}
        onClick={onClick}
      >
        Next
      </button>
    );
  };
  const settings = {
    className: "HomeCarouselContainer",
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1, // Scroll one card at a time
    speed: 500,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(gameArray.length, 2),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {gameArray.map((game) => (
          <div key={game.name}>
            <TestHomeGameCard game={game} session={session} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeCarouselOne;
