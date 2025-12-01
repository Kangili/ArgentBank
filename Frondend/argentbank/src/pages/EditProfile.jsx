import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserName } from "../store/user";
import axios from "axios";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, userInfo } = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState(userInfo?.firstName || "");
  const [lastName, setLastName] = useState(userInfo?.lastName || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 🔥 Appel PUT pour mettre à jour le nom sur le serveur
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { firstName, lastName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 🔥 Met à jour Redux store
      dispatch(updateUserName({ firstName, lastName }));

      setMessage("Nom mis à jour !");

      // 🔥 Redirection après 1,5 s
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la mise à jour du nom.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="edit-profile-content">
        <h1>Edit Name</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <button type="submit" className="edit-button" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </section>
    </main>
  );
}

export default EditProfile;
