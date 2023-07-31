import React from "react";

const FriendsList = () => {
  const friendsList = [
    {
      username: "kimWells00",
      avatar:
        "https://cdn3.iconfinder.com/data/icons/imote-of-people-s-emotions/512/Mocking-512.png",
    },
    {
      username: "maxWell123",
      avatar:
        "https://cdn3.iconfinder.com/data/icons/imote-of-people-s-emotions/512/Mocking-512.png",
    },
    {
      username: "danBaron1",
      avatar:
        "https://cdn3.iconfinder.com/data/icons/imote-of-people-s-emotions/512/Mocking-512.png",
    },
    {
      username: "dustinBeck23",
      avatar:
        "https://cdn3.iconfinder.com/data/icons/imote-of-people-s-emotions/512/Mocking-512.png",
    },
    {
      username: "justinAnz00",
      avatar:
        "https://cdn3.iconfinder.com/data/icons/imote-of-people-s-emotions/512/Mocking-512.png",
    },
    {
      username: "cam12300",
      avatar:
        "https://cdn3.iconfinder.com/data/icons/imote-of-people-s-emotions/512/Mocking-512.png",
    },
  ];
  return (
    <div className="friendsList">
      {/* Display friends list */}
      <h2>Friends List</h2>
      <ul>
        {friendsList.map((friend, index) => (
          <li key={index}>{friend.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
