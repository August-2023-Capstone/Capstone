import React from "react";
import Avatar1 from "../assets/Avatars/avatarImage1.png";

const SignUp = () => {
  const avatarOptions = [
    { value: Avatar1, label: "Avatar 1" },

    // Add other avatar options as needed...
  ];
  return (
    <div>
      <form action="crud route will go here" method="post">
        <h1 className="signupHeader">Sign Up</h1>
        <br />
        <br />
        <input type="text" name="username" placeholder="username" /> <br />
        <br />
        <input type="text" name="email" placeholder="email" /> <br />
        <br />
        <input type="password" name="password" placeholder="password" /> <br />
        <br />
        <label htmlFor="avatar">Choose an Avatar:</label>
        <select name="avatar" id="avatar" className="avatarSelect">
          {avatarOptions.map((option) => (
            <option
              key={option.label}
              value={option.value}
              style={{ backgroundImage: `url(${option.value})` }}
            >
              {option.label}
            </option>
          ))}
        </select>
        {/* <input type="submit" value="Sign Up" className="signupButton" /> */}
      </form>
    </div>
  );
};

export default SignUp;
