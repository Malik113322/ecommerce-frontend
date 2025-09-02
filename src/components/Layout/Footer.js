import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  // Scroll to top and navigate
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-dark text-light pt-5 pb-5 mt-5 position-relative">
      <div className="container">
        <div className="row">

          {/* Company Info */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <h5 className="fw-bold">Malik Store</h5>
            <p className="small">
              The best online store for all your tech and lifestyle needs. 
              Quality products, fast delivery, and great support.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <button
                  onClick={() => handleNavigation("/about")}
                  className="btn p-0 text-light text-decoration-none hover-link"
                >
                  About Us
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => handleNavigation("/contact")}
                  className="btn p-0 text-light text-decoration-none hover-link"
                >
                  Contact
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => handleNavigation("/policy")}
                  className="btn p-0 text-light text-decoration-none hover-link"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold">Follow Us</h5>
            <div className="d-flex gap-3 mt-2">
              <a href="#" className="text-light hover-link"><FaFacebookF /></a>
              <a href="#" className="text-light hover-link"><FaTwitter /></a>
              <a href="#" className="text-light hover-link"><FaInstagram /></a>
              <a href="#" className="text-light hover-link"><FaLinkedinIn /></a>
            </div>
          </div>

        </div>

        <hr className="bg-light mt-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
          <p className="mb-2 mb-md-0">&copy; {new Date().getFullYear()} Malik Store. All Rights Reserved.</p>
          <p className="mb-0 small">Designed with ❤️ by Malik</p>
        </div>
      </div>

      {/* Extra padding for mobile bottom nav */}
      <div className="d-block d-md-none" style={{ height: "80px" }}></div>

      <style jsx>{`
        .hover-link:hover {
          color: #ffc107;
          transition: color 0.3s;
        }

        /* Remove button styles for footer links */
        button {
          background: none;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
