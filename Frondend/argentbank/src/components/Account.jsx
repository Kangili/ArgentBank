// On importe React pour pouvoir créer un composant React
import React from "react";

/**
 * Composant Account
 * -----------------
 * Ce composant sert à afficher UN compte bancaire.
 * Il est réutilisable : on peut l'utiliser plusieurs fois
 * avec des données différentes (titre, montant, description).
 *
 * @param {Object} props - Les propriétés passées au composant
 * @param {string} props.title - Le nom du compte (ex: Checking, Savings...)
 * @param {string} props.amount - Le montant affiché
 * @param {string} props.description - Description du solde (Available Balance, etc.)
 */
function Account({ title, amount, description }) {
  // Le composant retourne du JSX (HTML + JavaScript)
  return (
    // Section principale représentant un compte
    <section className="account">
      
      {/* Partie gauche : informations du compte */}
      <div className="account-content-wrapper">
        
        {/* Titre du compte */}
        <h3 className="account-title">{title}</h3>

        {/* Montant du compte */}
        <p className="account-amount">{amount}</p>

        {/* Description du montant */}
        <p className="account-amount-description">
          {description}
        </p>
      </div>

      {/* Partie droite : bouton d'action */}
      <div className="account-content-wrapper cta">
        
        {/* Bouton pour accéder aux transactions */}
        <button className="transaction-button">
          View transactions
        </button>
      </div>
    </section>
  );
}

// On exporte le composant pour pouvoir l'utiliser ailleurs (Profile.js)
export default Account;
