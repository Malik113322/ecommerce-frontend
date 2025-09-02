import React from "react";
import Layout from "../../components/Layout/Layout";
import Adminmenu from "../../components/Layout/Adminmenu";
import Profile from "../user/Profile";

const Users = () => {
  return (
    <Layout title={"Dashboard - Users"}>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-9">
           
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
