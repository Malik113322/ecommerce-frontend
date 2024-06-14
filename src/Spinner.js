import React, { useEffect, useState } from "react";
import Layout from "./components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <Layout>
      <div
        className="d-flex justify-content-center hight align-items-center "
        style={{ height: "70vh" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h1 className="Text-center">
          &nbsp;redirecting to you in {count} seconds...
        </h1>
      </div>
    </Layout>
  );
};

export default Spinner;
