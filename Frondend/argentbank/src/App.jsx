import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Error404 from "./pages/Error404";
import PrivateRoute from "./components/PrivateRoute"; // <- Protection des routes
import "./assets/css/main.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          {/* Page d'accueil accessible à tous */}
          <Route path="/" element={<Home />} />

          {/* Page de connexion accessible à tous */}
          <Route path="/sign-in" element={<SignIn />} />

          {/* Page de profil protégée par PrivateRoute */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* Page 404 */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;





