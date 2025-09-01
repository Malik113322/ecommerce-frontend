import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BiEnvelope, BiFootball, BiLock } from "react-icons/bi";

const ForgetPassword = () => {
  const [answer, setAns] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // reset password handler
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/auth/forget-password`,
        { email, answer, newPassword }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      toast.error("Email or password wrong");
    }
  };

  return (
    <Layout title={"Reset password"}>
      <div className="d-flex justify-content-center align-items-center vh-100 mx-5">
        <div className="card shadow p-4" style={{ width: "380px" }}>
          <h3 className="text-center mb-4">🔑 Reset Password</h3>

          <form onSubmit={handleReset}>
            {/* Email */}
            <div className="input-group mb-3">
              <span className="input-group-text bg-white">
                <BiEnvelope />
              </span>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Security Answer */}
            <div className="input-group mb-3">
              <span className="input-group-text bg-white">
                <BiFootball />
              </span>
              <input
                type="text"
                placeholder="Favorite sport"
                className="form-control"
                required
                value={answer}
                onChange={(e) => setAns(e.target.value)}
              />
            </div>

            {/* New Password */}
            <div className="input-group mb-4">
              <span className="input-group-text bg-white">
                <BiLock />
              </span>
              <input
                type="password"
                placeholder="Enter new password"
                className="form-control"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-dark w-100">
              Reset Password
            </button>

            <p className="text-center mt-3 mb-0">
              Remember password?{" "}
              <span
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgetPassword;
