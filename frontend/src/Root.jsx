import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getMe } from "./api/auth";
import MultiColorSpinner from "./components/Dashboard/MultiColorSpinner";

const Root = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <MultiColorSpinner />;

  return <Outlet context={{ user }} />; // pass user down
};

export default Root;
