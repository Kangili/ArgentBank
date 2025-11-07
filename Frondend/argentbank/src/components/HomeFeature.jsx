import React from "react";

/**
 * Composant pour afficher une feature sur la page d'accueil
 *
 * @param {string} img - Le chemin de l'image
 * @param {string} title - Le titre de la feature
 * @param {string} text - La description
 */
function HomeFeature({ img, title, text }) {
  return (
    <div className="feature-item">
          <img
            src={img}
            alt="Chat Icon"
            className="feature-icon"
          />
          <h3 className="feature-item-title">{title}</h3>
          <p>
            {text}
          </p>
        </div>
  );
}

export default HomeFeature;
