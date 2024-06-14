import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [answer, setAns] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // reset pass
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/auth/forget-password`, {
        email,
        answer,
        newPassword,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setInterval(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error("email or password wrong");
    }
  };

  return (
    <Layout title={"reset password"}>
      <div>
        <form onSubmit={handleReset} className="mt-5 login">
          <h1 className="text-center mb-5"> Reset Password</h1>

          <div className="mb-3 ">
            <input
              type="text"
              placeholder="Enter your email"
              style={{ width: "300px" }}
              className=" text-center"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              placeholder="favorite sport"
              style={{ width: "300px" }}
              className=" text-center mb-4"
              required
              value={answer}
              onChange={(e) => setAns(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Enter new password"
              style={{ width: "300px" }}
              className=" text-center mb-4"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-dark">
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgetPassword;
