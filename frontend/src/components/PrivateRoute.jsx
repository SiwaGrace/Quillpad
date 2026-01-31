import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SplashScreen from "./Dashboard/SplashScreen";

const PrivateRoute = ({ children }) => {
  const { user, loading, authChecked } = useSelector((state) => state.auth);
  const location = useLocation();

  // If Root.jsx is working correctly, authChecked will already be true here.
  // But am keeping this check as a safety net.
  if (loading || !authChecked) {
    return <SplashScreen />;
  } // or spinner

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
