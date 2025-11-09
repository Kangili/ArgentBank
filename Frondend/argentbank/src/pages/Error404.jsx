// src/pages/Error404.jsx
import React from "react";
import Home from "./Home"; // <-- importer la page Home

function Error404() {
  return <Home />; // <-- afficher Home à la place de 404
}

export default Error404;
