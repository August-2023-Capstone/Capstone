import React, { useState } from "react";
import supabase from "../../supabase";

const TestLogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logInSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error logging in:", error.message);
      } else {
        console.log("User logged in successfully:", user);
        // Optionally, you can redirect the user to a different page after successful sign-up.
        // Example: window.location.href = '/login';
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <form onSubmit={logInSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  );
};

export default TestLogIn;
