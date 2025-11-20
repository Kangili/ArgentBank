import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import '../assets/css/main.css';

function Profile() {
  const { userInfo } = useSelector((state) => state.user);
// affichage connexion avec Tony 
  const [userName, setUserName] = useState("Ben_hg");
  const [lastName] = useState("Hong");
  const [isEditing, setIsEditing] = useState(true);
console.log (userInfo)
  const accounts = [
    { 
      title: "Argent Bank Checking (x3448)", 
      amount: "$2,082.79", 
      description: "Available Balance" 
      // ⭐ À MODIFIER : les valeurs et le texte doivent être harmonisés avec la maquette (48,098.43 / available balance)
    },
    { 
      title: "Argent Bank Savings (x6712)", 
      amount: "$10,928.42", 
      description: "Available Balance" 
      // ⭐ Dans la maquette, les 3 comptes affichent la même structure (titre + 48,098.43)
    },
    { 
      title: "Argent Bank Credit Card (x8349)", 
      amount: "$184.30", 
      description: "Current Balance" 
      // ⭐ Le design maquette utilise des cartes uniformisées : même couleur noir, même typo
    },
  ];

  const handleSave = () => {
    alert("Nom mis à jour (simulation). API update à faire ensuite.");
    setIsEditing(false);
  };

  return (
    <>
      {/* Navigation simplifiée */}
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
      </nav>

      {/* Main */}
      <main className="main bg-dark">
        {/* ⭐ À MODIFIER : bg-dark doit devenir bg-light (fond blanc) pour coller au design */}
        <div className="header">
          <h1 className="edit-color">Welcome Back</h1>
          {/* ⭐ Dans la maquette : "Edit user info" (tout en minuscules sauf Edit) */}

          <div className="edit-user-box">
            {/* ⭐ La structure est bonne, il faut juste ajuster le style CSS pour ressembler à la maquette */}

            <label>User Name:</label>
            {/* ⭐ Dans la maquette : "User name:" (casse différente) */}
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={!isEditing}
            />

            <label>First Name:</label>
            {/* ⭐ Dans la maquette : "First name:" */}
            <input
              type="text"
              value={userInfo.fisrtName}
              disabled
            />

            <label>Last Name:</label>
            {/* ⭐ Dans la maquette : "Last name:" */}
            <input
              type="text"
              value={lastName}
              disabled
            />

            <div className="edit-btns">
              {isEditing ? (
                <>
                  {/* ⭐ Bouton OK mais couleur, largeur et font doivent matcher la maquette */}
                  <button className="edit-button" onClick={handleSave}>Save</button>
                  <button className="edit-button" onClick={() => setIsEditing(false)}>Cancel</button>
                </>
              ) : (
                <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
              )}
            </div>
          </div>
        </div>

        {/* Accounts */}
        {accounts.map((account, index) => (
          <section className="account" key={index}>
            {/* ⭐ Cette section doit être transformée en "carte noire" 
                → arrière-plan #2c2c2c
                → texte blanc
                → montant en grand (32px)
                → flèche à droite (">") 
                comme sur la maquette
            */}

            <div className="account-content-wrapper">
              <h3 className="account-title">{account.title}</h3>
              <p className="account-amount">{account.amount}</p>
              <p className="account-amount-description">{account.description}</p>
            </div>

            <div className="account-content-wrapper cta">
              {/* ⭐ À MODIFIER : remplacer ce bouton par une flèche ">" style maquette */}
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}

export default Profile;









