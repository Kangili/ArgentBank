import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/user";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, userInfo } = useSelector((state) => state.user);

  // Redirection vers SignIn si non connecté
  if (!token) {
    navigate("/signin");
    return null;
  }

  const accounts = [
    { title: "Argent Bank Checking (x8349)", amount: "$2,082.79", description: "Available Balance" },
    { title: "Argent Bank Savings (x6712)", amount: "$10,928.42", description: "Available Balance" },
    { title: "Argent Bank Credit Card (x8349)", amount: "$184.30", description: "Current Balance" },
  ];

  return (
    <>
      {/* Navigation */}
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <span className="main-nav-item">{userInfo.name}</span>
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
            {userInfo.name}!
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



