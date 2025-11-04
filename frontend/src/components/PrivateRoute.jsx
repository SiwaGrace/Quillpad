import { Navigate, useOutletContext } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useOutletContext(); // get user from Root context

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
