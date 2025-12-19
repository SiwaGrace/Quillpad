import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./features/authSlices";
import MultiColorSpinner from "./components/Dashboard/MultiColorSpinner";

const Root = () => {
  const dispatch = useDispatch();
  const { user, token, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        dispatch(fetchUser());
      }, 100);
    }
  }, [dispatch, user]);

  if (loading) return <MultiColorSpinner />;

  return <Outlet context={{ user }} />; // pass user down
};

export default Root;
