import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/user";
import { Link } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user); // On n'a plus besoin de token ici, PrivateRoute s'en charge

  // Exemple de comptes
  const accounts = [
    { title: "Argent Bank Checking (x3448)", amount: "$48,098.43", description: "Available Balance" },
    { title: "Argent Bank Checking (x6712)", amount: "$48,098.43", description: "Available Balance" },
    { title: "Argent Bank Checking (x8349)", amount: "$48,098.43", description: "Current Balance" },
  ];

  return (
    <>
      {/* Navigation */}
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <span className="main-nav-item">{userInfo.email}</span> {/* <- MODIF: affichage email */}
          <button
            className="main-nav-item"
            onClick={() => dispatch(logout())}
            style={{ background: "none", border: "none", cursor: "pointer", color: "white" }}
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="main bg-dark">
        <div className="header" style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1>
            Welcome back
            <br />
            {userInfo.email}!
          </h1>
        </div>

        {accounts.map((account, index) => (
          <section className="account" key={index} style={{ marginBottom: "30px" }}>
            <div className="account-content-wrapper">
              <h3 className="account-title">{account.title}</h3>
              <p className="account-amount">{account.amount}</p>
              <p className="account-amount-description">{account.description}</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}

export default Profile;





