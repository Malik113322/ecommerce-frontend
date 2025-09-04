import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BiFootball,
  BiHide,
  BiUser,
  BiEnvelope,
  BiPhone,
  BiHome,
  BiShowAlt,
} from "react-icons/bi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );

      if (res.data) {
        toast.success("Registered successfully!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error("Error in registration!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layout title={"eCommerce Registration"}>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light overflow-scroll py-5">
        <form
          onSubmit={handleSubmit}
          className="p-4 p-md-5 bg-white shadow-lg rounded-4 mx-3"
          style={{ minWidth: "320px", maxWidth: "450px", width: "100%" }}
        >
          <h2 className="mb-4 text-center fw-bold">Create Account</h2>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <div className="input-group">
              <span className="input-group-text bg-dark text-white">
                <BiUser />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-dark text-white">
                <BiEnvelope />
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-dark text-white">
                <BiHide />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BiHide /> : <BiShowAlt />}
              </button>
            </div>
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Phone</label>
            <div className="input-group">
              <span className="input-group-text bg-dark text-white">
                <BiPhone />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter phone number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Address</label>
            <div className="input-group">
              <span className="input-group-text bg-dark text-white">
                <BiHome />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          {/* Security Question */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Favorite Sport</label>
            <div className="input-group">
              <span className="input-group-text bg-dark text-white">
                <BiFootball />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Football"
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="d-grid gap-2 mt-4">
            <button type="submit" className="btn btn-dark fw-semibold">
              Register
            </button>
            <button
              type="button"
              className="btn btn-outline-dark fw-semibold"
              onClick={() => navigate("/login")}
            >
              Already have an account? Login
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
