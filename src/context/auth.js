import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const Authcontext = createContext();

const Authprovider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });


  // login data show
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);

  //default axios auth
  axios.defaults.headers.common["Authorization"] = auth?.token;

  return (
    <Authcontext.Provider value={[auth, setAuth]}>
      {children}
    </Authcontext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(Authcontext);

export { useAuth, Authprovider };
