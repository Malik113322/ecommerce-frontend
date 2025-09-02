import React from "react";
import Layout from "../components/Layout/Layout"; // Assuming you have a Layout component
import { FaShippingFast, FaHeadset, FaLock, FaStore } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout title="About Us - Malik Store">
      <div className="container py-5 text-center d-flex flex-column justify-content-center align-items-center">

        {/* Brand Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5">eCommerce Store</h1>
          <p className="lead text-muted">
            Your one-stop online shop for all your tech and lifestyle needs.
          </p>
        </div>

        {/* About Section */}
        <div className="row align-items-center mb-5 d-flex justify-content-center ">
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <FaStore
              size={200} // size of the icon
              className="text-primary shadow-sm p-4 rounded-4"
              style={{ backgroundColor: "#f8f9fa" }} // optional background like an image placeholder
            />
          </div>
            <h4 className="text-center mt-4">About Us</h4>
        </div>
        <div className="col-md-6 mt-4 mt-md-0 text-center">
          <h2 className="fw-bold mb-3">Who We Are</h2>
          <p className="text-muted">
            Malik Store is a modern e-commerce platform dedicated to providing
            high-quality products, fast delivery, and excellent customer service.
            We believe in making online shopping simple, safe, and enjoyable for
            everyone.
          </p>
          <p className="text-muted">
            Our team carefully curates products to ensure you get the best
            value and the latest trends. Join thousands of satisfied customers
            and experience hassle-free shopping with Malik Store.
          </p>
        </div>
      </div>

      {/* Mission & Features */}
      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <FaShippingFast size={40} className="text-primary mb-3" />
          <h5 className="fw-bold">Fast Delivery</h5>
          <p className="text-muted">
            We ensure your orders reach you quickly and safely.
          </p>
        </div>
        <div className="col-md-4 mb-4">
          <FaHeadset size={40} className="text-primary mb-3" />
          <h5 className="fw-bold">24/7 Support</h5>
          <p className="text-muted">
            Our support team is always ready to assist you.
          </p>
        </div>
        <div className="col-md-4 mb-4">
          <FaLock size={40} className="text-primary mb-3" />
          <h5 className="fw-bold">Secure Payment</h5>
          <p className="text-muted">
            Your transactions are safe with top-notch encryption.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-5">
        <h3 className="fw-bold mb-3">Join Us Today!</h3>
        <p className="text-muted mb-4">
          Explore our products and enjoy a seamless shopping experience.
        </p>
       <Link to={'/'}> <button className="btn btn-primary btn-lg">Shop Now</button></Link>
      </div>

    </Layout >
  );
};

export default About;
