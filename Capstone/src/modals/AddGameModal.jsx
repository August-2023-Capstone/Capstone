import React from "react";

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

const AddGameModal = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-gray-800 text-white w-96 p-4 rounded-lg shadow-lg">
        <div className="relative">
          <input
            type="text"
            placeholder="Search 300+ Games"
            className="w-full py-2 pl-10 pr-4 rounded-md bg-gray-700"
          />
          <div className="absolute top-1/2 left-3 transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 13.293a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L11 10.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3zM7 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          {usersCurrentGames.map((game) => (
            <div key={game.name} className="flex items-center space-x-4">
              <img
                src={game.poster}
                alt={game.name}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="flex-grow">
                <p className="text-lg font-medium">{game.name}</p>
                <p className="text-gray-400 text-sm">{game.platform}</p>
              </div>
              <button className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-200 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.293 13.293a1 1 0 0 1-1.414 0L4 10.414l-.707.707a1 1 0 1 1-1.414-1.414l2-2a1 1 0 0 1 1.414 0L9 9.586l4.293-4.293a1 1 0 1 1 1.414 1.414L9.414 13.293a1 1 0 0 1-1.121.182z"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddGameModal;
