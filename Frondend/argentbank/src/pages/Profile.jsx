import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, logout, updateUsername } from "../store/user";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, userInfo } = useSelector((state) => state.user);

  // 🔥 On récupère le profil depuis l'API si le token existe
  useEffect(() => {
    if (token && !userInfo) {
      dispatch(fetchUserProfile())
        .unwrap()
        .catch((err) => console.error("Erreur fetch profil :", err));
    }
  }, [dispatch, token, userInfo]);

  // ✅ État local pour gérer l'affichage du formulaire d'édition
  const [isEditing, setIsEditing] = useState(false);

  // ✅ États pour User Name
  const [username, setUsername] = useState(userInfo?.userName || "");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in");
  };

  // 🔹 handleSave : sauvegarde du username via l'API + Redux
  const handleSave = () => {
    if (!username) return; // éviter d'envoyer vide

    dispatch(updateUsername(username))
      .unwrap()
      .then(() => {
        console.log("Username mis à jour !");
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Erreur mise à jour username :", err);
        alert("Impossible de mettre à jour le username.");
      });
  };

  if (!userInfo) {
    return <p>Chargement du profil...</p>;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userInfo.firstName} {userInfo.lastName}!
        </h1>

        {/* 🔽 Affichage conditionnel : bouton OU formulaire */}
        {!isEditing ? (
          // --- MODE NON-ÉDITION ---
          <button onClick={() => setIsEditing(true)} className="edit-button">
            Edit Name
          </button>
        ) : (
          // --- MODE ÉDITION ---
          <div className="edit-user-box">
            <div className="edit-field">
              <label htmlFor="username">User Name:</label>
              <input
                id="username"
                type="text"
                className="user-name-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="edit-field">
              <label htmlFor="firstName">First Name:</label>
              <input
                id="firstName"
                type="text"
                className="grayed-input"
                value={userInfo.firstName}
                readOnly
              />
            </div>

            <div className="edit-field">
              <label htmlFor="lastName">Last Name:</label>
              <input
                id="lastName"
                type="text"
                className="grayed-input"
                value={userInfo.lastName}
                readOnly
              />
            </div>

            <div className="edit-btns">
              <button className="edit-button" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>

      {/* --- Tes sections de comptes (inchangées) --- */}
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export default Profile;

















