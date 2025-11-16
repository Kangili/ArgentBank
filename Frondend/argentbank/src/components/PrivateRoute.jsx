import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Composant pour protéger les routes (ex: Profile)
// Si token existe => affiche les enfants
// Sinon => redirige vers /sign-in
function PrivateRoute({ children }) {
  const token = useSelector((state) => state.user.token);
  return token ? children : <Navigate to="/sign-in" />;
}

export default PrivateRoute;

