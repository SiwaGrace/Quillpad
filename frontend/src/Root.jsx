import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./features/authSlices";
import SplashScreen from "./components/Dashboard/SplashScreen";
import { useState } from "react";

const Root = () => {
  const dispatch = useDispatch();
  const { user, loading, authChecked } = useSelector((state) => state.auth);

  // Local state to prevent "stuck" splash screens on slow networks
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (!authChecked) {
      dispatch(fetchUser());
    }
    // Fail-safe: If the request takes more than 3 seconds,
    // allow the app to attempt rendering (adjust time as needed)
    const timer = setTimeout(() => {
      setTimedOut(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch, authChecked]);

  const showSplash = (!authChecked || loading) && !user && !timedOut;
  // do NOT render the Outlet. Stay on the Spinner.
  if (showSplash) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background-light">
        <SplashScreen />
      </div>
    );
  }

  return <Outlet context={{ user, loading }} />; // pass user down
};

export default Root;
