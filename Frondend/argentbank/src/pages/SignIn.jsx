// src/pages/SignIn.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchUserProfile } from "../store/user";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Login
      const loginResult = await dispatch(loginUser({ email: username, password })).unwrap();
      console.log("Login réussi :", loginResult);

      // Fetch profil
      const profileResult = await dispatch(fetchUserProfile()).unwrap();
      console.log("Profil récupéré :", profileResult);

      console.log("État du store après login :", { userInfo });

      // Redirection vers Profile
      navigate("/profile");
    } catch (err) {
      console.error("Erreur login/fetch profil :", err);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button" disabled={loading}>
            Sign In
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </section>
    </main>
  );
}

export default SignIn;










