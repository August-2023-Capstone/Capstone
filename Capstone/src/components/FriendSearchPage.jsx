import React from "react";

const GameDetails = () => (
  <div className="flex-none w-1/4 bg-gray-800 text-white mt-2 ml-2 mb-2">
    <div className="p-4">
      <img
        src="path_to_your_game_poster_image"
        alt="Game Poster"
        className="w-full max-w-md"
      />
    </div>
    <div className="p-4 border-t border-gray-300">
      <h3 className="text-lg font-semibold">Game Details</h3>
      <p>Details about the game go here...</p>
    </div>
  </div>
);

const GamerList = () => {
  const gamerInfoList = [
    { name: "Gamer 1", status: "Online" },
    { name: "Gamer 2", status: "Offline" },
  ];

  return (
    <div className="flex-auto bg-gray-800 text-white m-2 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Gamer Info List</h2>
      <ul>
        {gamerInfoList.map((gamer, index) => (
          <li key={index} className="mb-2 text-gray-800">
            <strong>{gamer.name}</strong> - {gamer.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

const FriendSearchPage = () => (
  <div className="flex min-h-screen">
    <GameDetails />
    <GamerList />
  </div>
);

export default FriendSearchPage;
