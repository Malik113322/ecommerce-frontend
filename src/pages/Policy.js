import React from "react";
import { FaShieldAlt, FaUndoAlt, FaShippingFast, FaLock } from "react-icons/fa";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={'Policy'}>
    <div className="container py-5">
      <h1 className="text-center mb-5" style={{ fontWeight: "700" }}>
        Our Policies
      </h1>

      {/* Privacy Policy */}
      <div className="card mb-4 shadow-sm border-0 rounded-4">
        <div className="card-body d-flex align-items-start">
          <FaShieldAlt size={40} className="me-3 text-primary" />
          <div>
            <h3 className="card-title mb-2">Privacy Policy</h3>
            <p className="card-text text-muted">
              We respect your privacy and are committed to protecting your personal data. 
              Your information will never be shared with third parties without your consent.
            </p>
          </div>
        </div>
      </div>

      {/* Return Policy */}
      <div className="card mb-4 shadow-sm border-0 rounded-4">
        <div className="card-body d-flex align-items-start">
          <FaUndoAlt size={40} className="me-3 text-success" />
          <div>
            <h3 className="card-title mb-2">Return Policy</h3>
            <p className="card-text text-muted">
              Returns are accepted within 15 days of delivery. The product must be in its original condition 
              and packaging. Refunds will be processed within 5-7 business days after we receive your return.
            </p>
          </div>
        </div>
      </div>

      {/* Shipping Policy */}
      <div className="card mb-4 shadow-sm border-0 rounded-4">
        <div className="card-body d-flex align-items-start">
          <FaShippingFast size={40} className="me-3 text-warning" />
          <div>
            <h3 className="card-title mb-2">Shipping Policy</h3>
            <p className="card-text text-muted">
              We offer free shipping on orders over $50. Standard delivery takes 3-7 business days, 
              while express delivery is available for faster shipping.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Security */}
      <div className="card mb-4 shadow-sm border-0 rounded-4">
        <div className="card-body d-flex align-items-start">
          <FaLock size={40} className="me-3 text-danger" />
          <div>
            <h3 className="card-title mb-2">Payment Security</h3>
            <p className="card-text text-muted">
              All payments are secured with SSL encryption. Your financial information is safe with us, 
              ensuring a secure checkout every time.
            </p>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Policy;
