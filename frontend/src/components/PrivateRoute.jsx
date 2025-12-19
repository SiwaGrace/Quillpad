import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import MultiColorSpinner from "./Dashboard/MultiColorSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) return <MultiColorSpinner />; // or spinner

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
