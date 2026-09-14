import React from "react";
import Layout from "../../components/Layout/Layout";
import Adminmenu from "../../components/Layout/Adminmenu";
import { useAuth } from "../../context/auth";
import { FaUserShield, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Admin Panel - Dashboard"}>
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-md-4 col-lg-3">
            <Adminmenu />
          </div>

          <div className="col-12 col-md-8 col-lg-9">
            <div className="card shadow-sm border-0 rounded-4 p-4 p-md-5 bg-white">
              <div className="d-flex align-items-center gap-3 border-bottom pb-4 mb-4">
                <div
                  className="bg-danger-subtle text-danger rounded-circle p-3 d-flex align-items-center justify-content-center"
                  style={{ width: "64px", height: "64px", fontSize: "1.8rem" }}
                >
                  <FaUserShield />
                </div>
                <div>
                  <h3 className="fw-bold mb-1">{auth?.user?.name || "Admin"}</h3>
                  <span className="badge bg-danger rounded-pill px-3 py-1">Administrator</span>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-sm-6">
                  <div className="p-3 bg-light rounded-3 d-flex align-items-center gap-3">
                    <FaEnvelope className="text-primary fs-4" />
                    <div>
                      <small className="text-muted d-block">Email Address</small>
                      <span className="fw-semibold">{auth?.user?.email}</span>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="p-3 bg-light rounded-3 d-flex align-items-center gap-3">
                    <FaPhone className="text-success fs-4" />
                    <div>
                      <small className="text-muted d-block">Phone</small>
                      <span className="fw-semibold">{auth?.user?.phone || "N/A"}</span>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="p-3 bg-light rounded-3 d-flex align-items-center gap-3">
                    <FaMapMarkerAlt className="text-danger fs-4" />
                    <div>
                      <small className="text-muted d-block">Address</small>
                      <span className="fw-semibold">{auth?.user?.address || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
