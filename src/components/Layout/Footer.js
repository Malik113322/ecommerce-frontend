import React from "react";
import { useNavigate } from "react-router-dom";
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
                  type="button"
                  onClick={() => handleNavigation("/about")}
                  className="btn p-0 text-light text-decoration-none hover-link bg-transparent border-0"
                >
                  About Us
                </button>
              </li>
              <li className="mb-2">
                <button
                  type="button"
                  onClick={() => handleNavigation("/contact")}
                  className="btn p-0 text-light text-decoration-none hover-link bg-transparent border-0"
                >
                  Contact
                </button>
              </li>
              <li className="mb-2">
                <button
                  type="button"
                  onClick={() => handleNavigation("/policy")}
                  className="btn p-0 text-light text-decoration-none hover-link bg-transparent border-0"
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
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-light hover-link" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-light hover-link" aria-label="Twitter"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-light hover-link" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-light hover-link" aria-label="LinkedIn"><FaLinkedinIn /></a>
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
    </footer>
  );
};

export default Footer;
