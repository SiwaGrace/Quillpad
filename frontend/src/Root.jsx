import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./features/authSlices";
import MultiColorSpinner from "./components/Dashboard/MultiColorSpinner";

const Root = () => {
  const dispatch = useDispatch();
  const { user, loading, authChecked } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (!user && !loading) {
  //     dispatch(fetchUser());
  //   }
  // }, [dispatch, user, loading]);
  useEffect(() => {
    if (!authChecked) {
      dispatch(fetchUser());
    }
  }, [dispatch, authChecked]);

  // if (loading) return <MultiColorSpinner />;

  return <Outlet context={{ user, loading }} />; // pass user down
};

export default Root;
