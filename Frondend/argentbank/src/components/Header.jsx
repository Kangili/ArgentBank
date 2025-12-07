import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const {user} = useSelector ((state) => state.userInfo); // remplace par le vrai nom de l'utilisateur connecté UTILISER USERSALECTOR

  // on affiche Sign In uniquement sur / et /sign-in
  const isAuthPage = location.pathname === "/" || location.pathname === "/sign-in";

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src="/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        {isAuthPage ? (
          <div>
            <Link className="main-nav-item" to="/sign-in">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          </div>
        ) : (
          <div className="main-nav-user">
            <i className="fa fa-user-circle"></i>
            <span className="main-nav-username">{user.username}</span>
            <button className="main-nav-signout">Sign Out</button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;






