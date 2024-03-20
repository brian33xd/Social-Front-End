import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
export const Logout = () => {
  const { setAuth, setCounters } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();

    setAuth({});
    setCounters({});

    navigate("/");
  });

  return <h1>Logging out...</h1>;
};
