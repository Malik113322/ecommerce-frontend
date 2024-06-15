import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "../../Spinner";
import axios from "axios";

export default function PrivateRout() {
  const [auth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${process.env.REACT_APP_URL}/api/v1/auth/user-auth`);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth.token) authCheck();
  }, [auth.token]);

  return ok ? <Outlet /> : <Spinner />;
}
