/** @format */

import React, { useState } from "react";
import Select from "react-select";
import PlatformSelect from "./PlatformSelect";

import supabase from "../../../supabase";
import Css from "../App.css";

import AvatarModal from "./AvatarModal";
import AddGameModal from "./AddGameModal";
const timezones = [
  "Eastern (UTC-5)",
  "Central (UTC-6)",
  "Mountain (UTC-7)",
  "Pacific (UTC-8)",
];
const platforms = ["PC", "Playstation", "Xbox", "Nintendo Switch"];
const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    platform: [],
    gamertag: "",
    timezone: "",
  });
  //Modal stuff
  const [showModal, setShowModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveAvatar = (avatar) => {
    setSelectedAvatar(avatar);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const [showGameModal, setShowGameModal] = useState(false);
  const openModal = () => {
    setShowGameModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowGameModal(false);
  };
  const handleLogin = async () => {
    try {
      const { email, password } = formData;
      const supabase = createClient(
        supabaseConfig.supabaseUrl,
        supabaseConfig.supabaseKey
      );
      const { user, error } = await supabase.auth.signIn({ email, password });

      if (error) {
        console.error("Login error:", error.message);
        // Handle error, show an error message, etc.
      } else {
        console.log("Logged in user:", user);
        // Handle successful login, redirect to another page, etc.
      }
    } catch (error) {
      console.error("Login error:", error.message);
      // Handle error, show an error message, etc.
    }
  };

  const handleUpdateUser = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({
          platform: formData.platform,
          gamertag: formData.gamertag,
          timezone: formData.timezone,
        })
        .match({ id: userId }); // Replace 'userId' with the unique identifier of the user you want to update

      if (error) {
        console.error("Error updating user data:", error);
        // Handle error, show an error message, etc.
      } else {
        console.log("User data updated successfully:", data);
        // Handle success, show a success message, or navigate to a different page
      }
    } catch (error) {
      console.error("Error updating user data:", error.message);
      // Handle error, show an error message, etc.
    }
  };

  const handleDeleteUser = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .delete()
        .match({ id: userId }); // Replace 'userId' with the unique identifier of the user you want to delete

      if (error) {
        console.error("Error deleting user:", error);
        // Handle error, show an error message, etc.
      } else {
        console.log("User deleted successfully:", data);
        // Handle success, show a success message, or navigate to a different page
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
      // Handle error, show an error message, etc.
    }
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      // Send a POST request to your backend route
      const { data, error } = await supabase.from("users").insert([
        {
          email: formData.email,
          username: formData.username,
          password: formData.password,
          platform: formData.platform,
          gamertag: formData.gamertag,
          timezone: formData.timezone,
        },
      ]);
      console.log(data);
      console.log(error);
      // Handle success, show a success message, or navigate to a different page
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error, show an error message, etc.
    }
  };
  const platformOptions = [
    { value: "PC", label: "PC" },
    { value: "Playstation", label: "Playstation" },
    { value: "Xbox", label: "Xbox" },
    { value: "Nintendo Switch", label: "Nintendo Switch" },
  ];
  const selectedPlatformOptions = platformOptions.filter((option) =>
    formData.platform.includes(option.value)
  );

  const handlePlatformChange = (selectedValues) => {
    setFormData((prevData) => ({
      ...prevData,
      platform: selectedValues.map((option) => option.value),
    }));
  };
  return (
    <form className="createUserForm">
      <div>
        <label>Platform:</label>
        <Select
          options={platformOptions}
          isMulti
          value={selectedPlatformOptions}
          onChange={handlePlatformChange}
          components={{ Option: PlatformSelect }}
        />
      </div>
      <br />
      <label>Timezone:</label>
      <select name="timezone" value={formData.timezone} onChange={handleChange}>
        <option value="">Choose your timezone</option>
        {timezones.map((timezone) => (
          <option key={timezone} value={timezone}>
            {timezone}
          </option>
        ))}
      </select>
      <button className="OpenModalButton" type="button" onClick={openModal}>
        Add Games
      </button>

      {/* Show the AddGameModal when showModal is true */}
      {showGameModal && <AddGameModal closeModal={closeModal} />}
      <br />
      <label>Choose your avatar:</label>
      <div className="selected-avatar">
        {selectedAvatar && (
          <img
            src={selectedAvatar.image}
            alt={selectedAvatar.label}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        )}
      </div>

      <button className="AvatarButton" type="button" onClick={handleOpenModal}>
        Select Avatar
      </button>
      {/* Show the AvatarModal when showModal is true */}
      {showModal && (
        <div className="modal-overlay">
          <AvatarModal onClose={handleCloseModal} onSave={handleSaveAvatar} />
        </div>
      )}
      <br />
      <button
        className="CreateAccountButton"
        type="button"
        onClick={handleSubmit}
      >
        Create User
      </button>
    </form>
  );
};

export default CreateUserForm;
