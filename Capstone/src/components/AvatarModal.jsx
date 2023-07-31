import React, { useState } from "react";
import Avatar1 from "../assets/Avatars/Avatar1.png";
import Avatar2 from "../assets/Avatars/Avatar2.png";
import Avatar3 from "../assets/Avatars/Avatar3.png";
import Avatar4 from "../assets/Avatars/Avatar4.png";
import Avatar5 from "../assets/Avatars/Avatar5.png";
import Avatar6 from "../assets/Avatars/Avatar6.png";
import Avatar7 from "../assets/Avatars/Avatar7.png";
import Avatar8 from "../assets/Avatars/Avatar8.png";
import Avatar9 from "../assets/Avatars/Avatar9.png";
import Avatar10 from "../assets/Avatars/Avatar10.png";
import Avatar11 from "../assets/Avatars/Avatar11.png";
import Avatar12 from "../assets/Avatars/Avatar12.png";

const avatarOptions = [
  { value: "Avatar1", label: "option 1", image: Avatar1 },
  { value: "Avatar2", label: "option 2", image: Avatar2 },
  { value: "Avatar3", label: "option 3", image: Avatar3 },
  { value: "Avatar4", label: "option 4", image: Avatar4 },
  { value: "Avatar5", label: "option 5", image: Avatar5 },
  { value: "Avatar6", label: "option 6", image: Avatar6 },
  { value: "Avatar7", label: "option 7", image: Avatar7 },
  { value: "Avatar8", label: "option 8", image: Avatar8 },
  { value: "Avatar9", label: "option 9", image: Avatar9 },
  { value: "Avatar10", label: "option 10", image: Avatar10 },
  { value: "Avatar11", label: "option 11", image: Avatar11 },
  { value: "Avatar12", label: "option 12", image: Avatar12 },
];

const AvatarModal = ({ onClose, onSave }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleAvatarChange = (selectedOption) => {
    setSelectedAvatar(selectedOption);
  };

  const handleSaveAvatar = () => {
    onSave(selectedAvatar);
    onClose();
  };

  return (
    <div className="avatar-modal">
      <h2>Choose Your Avatar</h2>
      <div className="avatar-options">
        {avatarOptions.map((option) => (
          <div
            key={option.value}
            className={`avatar-option ${
              selectedAvatar === option ? "selected" : ""
            }`}
            onClick={() => handleAvatarChange(option)}
          >
            <img src={option.image} alt={option.label} />
            <span>{option.label}</span>
          </div>
        ))}
      </div>
      <div className="modal-buttons">
        <button onClick={onClose}>Cancel</button>
        <button disabled={!selectedAvatar} onClick={handleSaveAvatar}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AvatarModal;