import React from "react";
import Layout from "../../components/Layout/Layout";
import Adminmenu from "../../components/Layout/Adminmenu";
import { FaUsers } from "react-icons/fa";

const Users = () => {
  return (
    <Layout title={"Dashboard - Users"}>
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-md-4 col-lg-3">
            <Adminmenu />
          </div>
          <div className="col-12 col-md-8 col-lg-9">
            <div className="card shadow-sm border-0 rounded-4 p-4">
              <div className="d-flex align-items-center gap-2 border-bottom pb-3 mb-4">
                <FaUsers className="text-danger fs-3" />
                <h3 className="fw-bold mb-0 text-danger">All Users</h3>
              </div>
              <p className="text-muted">User accounts and permissions are synced and managed securely.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
