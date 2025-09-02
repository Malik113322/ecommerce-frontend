import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { BiShow, BiHide } from "react-icons/bi"; // Eye icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/api/v1/auth/login`,
        { email, password }
      );

      if (res.data) {
        toast.success("Successfully logged in!");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          navigate(location.state || "/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    }
  };

  return (
    <Layout title={"eCommerce Login"}>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <form
          onSubmit={handleLogin}
          className="p-4 p-md-5 shadow rounded mx-3"
          style={{ minWidth: "320px", maxWidth: "400px", width: "100%" }}
        >
          <h2 className="mb-4 text-center">Login</h2>

          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-text">We'll never share your email with anyone else.</div>
          </div>

          {/* Password Input with Eye Toggle */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BiHide /> : <BiShow />}
              </button>
            </div>
            <div className="form-text">Use at least 8 characters.</div>
          </div>

          {/* Buttons */}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-dark btn-block">
              Login
            </button>
            <button
              type="button"
              className="btn btn-outline-dark btn-block"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              type="button"
              className="btn btn-link text-decoration-none"
              onClick={() => navigate("/forget-password")}
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
