import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, { email, password });
      if (res.data) {
        toast.success("successfully login!");
        setTimeout(() => {
          navigate("/" || location.state);
        }, 2000);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem("auth", JSON.stringify(res.data));
      }
    } catch (error) {
      console.log(error);
      toast.error("invalid email or password");
    }
  };

  return (
    <Layout title={"eCommerce Login"}>
      <form onSubmit={handleLogin} className="mt-5 login">
        <h1 className="mb-5"> Login Form</h1>
        <div className="mb-3 ">
          <input
            type="text"
            placeholder="Enter your email"
            style={{ width: "300px" }}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            placeholder="Enter your password"
            style={{ width: "300px" }}
            className="mb-4"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Login
        </button>
        &nbsp;
        <button
          type="submit"
          className="btn btn-dark"
          onClick={() => navigate("/forget-password")}
        >
          Forget Password
        </button>
      </form>
    </Layout>
  );
};

export default Login;
