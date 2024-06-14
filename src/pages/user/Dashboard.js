import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout title={"Dashboard"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 w-75">
              <h1 className="text-center">{auth.user.name}</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
