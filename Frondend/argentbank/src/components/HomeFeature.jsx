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
    <div className="feature-item" style={{ textAlign: "center", margin: "20px" }}>
      <img src={img} alt={title} style={{ width: "80px", marginBottom: "10px" }} />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default HomeFeature;
