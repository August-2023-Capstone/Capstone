import React from "react";

const GamePlayers = ({ linkedUsersProfiles, gameName }) => {
  return (
    <div className="text-white">
      <div className="max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          {gameName} Players
        </h1>
        <ul>
          {linkedUsersProfiles.map((profile) => (
            <li key={profile.id} className="bg-[#444444] text-white rounded">
              <div>
                <p>Gamertag: {profile.gamertag}</p>
                <p>Timezone: {profile.timezone}</p>
                <p>Platform: {profile.platform}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GamePlayers;
