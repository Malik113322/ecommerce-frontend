import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MESSAGES } from "../../constants/index";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      const { name, email, address } = auth.user;
      setName(name || "");
      setEmail(email || "");
      setAddress(address || "");
    }
  }, [auth?.user]);

  // update details
  const updateDetails = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_URL}/api/v1/auth/update-details`,
        { name, email, password, address }
      );
      if (data.success) {
        setAuth({ ...auth, user: data.updateUser });
        toast.success(MESSAGES.AUTH.PROFILE_UPDATE_SUCCESS);
        navigate("/dashboard/user/profile");

        // update localStorage
        let ls = localStorage.getItem("auth");
        if (ls) {
          ls = JSON.parse(ls);
          ls.user = data.updateUser;
          localStorage.setItem("auth", JSON.stringify(ls));
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(MESSAGES.AUTH.PROFILE_UPDATE_ERROR);
    }
  };

  return (
    <Layout title="My Profile">
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-md-4 col-lg-3">
            <UserMenu />
          </div>

          <div className="col-12 col-md-8 col-lg-9">
            <div className="card shadow-sm border-0 rounded-4 p-4 p-md-5 bg-white">
              <h2 className="fw-bold mb-4 text-dark border-bottom pb-3">
                👤 My Profile
              </h2>

              <form onSubmit={updateDetails}>
                {/* Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control bg-light"
                    placeholder="Enter email"
                    value={email}
                    disabled
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Address */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Address</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg rounded-3">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
