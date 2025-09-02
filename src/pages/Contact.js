import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Layout from "../components/Layout/Layout";

const Contact = () => {
  return (
    <Layout title={"Contact"}>
    <div className="container py-5">
      <h1 className="text-center mb-5" style={{ fontWeight: "700" }}>
        Contact Us
      </h1>

      <div className="row">
        {/* Contact Info */}
        <div className="col-md-5 mb-4">
          <div className="card shadow-sm border-0 rounded-4 p-4 h-100">
            <h3 className="mb-4">Get in Touch</h3>
            
            <div className="d-flex align-items-center mb-3">
              <FaPhoneAlt size={25} className="me-3 text-primary" />
              <div>
                <h6 className="mb-0">Phone</h6>
                <p className="mb-0 text-muted">+91 7906613318</p>
              </div>
            </div>

            <div className="d-flex align-items-center mb-3">
              <FaEnvelope size={25} className="me-3 text-success" />
              <div>
                <h6 className="mb-0">Email</h6>
                <p className="mb-0 text-muted">danishyt96@gmail.com</p>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <FaMapMarkerAlt size={25} className="me-3 text-danger" />
              <div>
                <h6 className="mb-0">Address</h6>
                <p className="mb-0 text-muted">Saharanpur, india</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-md-7">
          <div className="card shadow-sm border-0 rounded-4 p-4">
            <h3 className="mb-4">Send Us a Message</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="name" placeholder="Your Name" />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Your Email" />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" rows="5" placeholder="Your Message"></textarea>
              </div>

              <button type="submit" className="btn btn-primary rounded-pill px-4">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Contact;
