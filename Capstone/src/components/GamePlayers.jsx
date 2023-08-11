import React from "react";

const GamePlayers = ({ linkedUsersProfiles, gameName }) => {
  return (
    <div className="text-white">
      <div className="max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          {gameName} Players
        </h1>
        <ul className="grid grid-cols-1 gap-4">
          {linkedUsersProfiles.map((profile) => (
            <li
              key={profile.id}
              className="bg-[#444444] text-white rounded p-4"
            >
              <p>
                {profile.gamertag} | Timezone: {profile.timezone} | Platform:{" "}
                {profile.platform}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GamePlayers;
