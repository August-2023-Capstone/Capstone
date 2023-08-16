import { useState, useEffect } from "react";
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
import supabase from "../../supabase";

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

  const handleSaveAvatar = async (event) => {
    event.preventDefault(); // Prevent form submission
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Update the 'avatar' column in the 'profiles' table
    try {
      if (user.id && selectedAvatar) {
        const { error } = await supabase
          .from("profiles")
          .update({ avatar: selectedAvatar.value })
          .eq("id", user.id);

        if (error) {
          console.error("Error updating avatar:", error);
        } else {
          onSave(selectedAvatar);
          onClose();
        }
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  return (
    <div className="avatar-modal bg-[#373737] text-white">
      <h2 className="text-center pb-2">Choose Your Avatar</h2>
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
          </div>
        ))}
      </div>
      <div className="flex justify-center modal-buttons">
        <button
          onClick={onClose}
          className="mr-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          disabled={!selectedAvatar}
          onClick={handleSaveAvatar}
          className="ml-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AvatarModal;
