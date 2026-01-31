import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./features/authSlices";
import SplashScreen from "./components/Dashboard/SplashScreen";

const Root = () => {
  const dispatch = useDispatch();
  const { user, loading, authChecked } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!authChecked) {
      dispatch(fetchUser());
    }
  }, [dispatch, authChecked]);

  // do NOT render the Outlet. Stay on the Spinner.
  if (!authChecked || loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background-light dark:bg-background-dark">
        <SplashScreen />
      </div>
    );
  }

  return <Outlet context={{ user, loading }} />; // pass user down
};

export default Root;
