import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Success icon
import Layout from "../components/Layout/Layout";

const Success = () => {
  return (
    <Layout title={'Payment'}>
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg border-0 text-center p-4"
        style={{ borderRadius: "20px", maxWidth: "450px", width: "100%" }}
      >
        <div className="card-body">
          {/* Success Icon */}
          <div className="mb-3">
            <FaCheckCircle size={90} className="text-success" />
          </div>

          {/* Title */}
          <h2 className="fw-bold text-success">Payment Successful!</h2>

          {/* Description */}
          <p className="text-muted mt-3 mb-4">
            Thank you for your payment. <br />
            We’ll contact you with more details shortly.
          </p>

          {/* Button */}
          <Link to="/">
            <button className="btn btn-success btn-lg px-4 rounded-pill shadow-sm">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Success;
