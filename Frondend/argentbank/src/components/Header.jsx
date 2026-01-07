import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/icons/argentBankLogo.webp";

// ⭐ AJOUT : import correct du logout depuis ton store
import { logout } from "../store/user";

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();   // ⭐ AJOUT
  const navigate = useNavigate();   // ⭐ AJOUT

  const { userInfo } = useSelector((state) => state.user); 
  // remplace par le vrai nom de l'utilisateur connecté UTILISER USERSALECTOR

  // on affiche Sign In uniquement sur / et /sign-in
  const isAuthPage = location.pathname === "/" || location.pathname === "/sign-in";

  // ⭐ AJOUT : fonction logout qui vide Redux + redirige
  const handleLogout = () => {
    dispatch(logout());        // ⭐ AJOUT : envoie au store la déconnexion
    navigate("/");      // correction redirection vers accueil 
  };

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
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

            {/* ⭐ AJOUT : affichage du username venant du store Redux */}
            <span className="main-nav-username">{userInfo?.userName}</span>

            {/* ⭐ AJOUT : bouton logout fonctionnel */}
            <button className="main-nav-signout" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;







