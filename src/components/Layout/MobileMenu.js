import React from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { Offcanvas } from "bootstrap";

const MobileMenu = ({ auth, handleLogout, category }) => {
  // Open offcanvas programmatically
  const openMenu = () => {
    const el = document.getElementById("mobileMenu");
    const offcanvas = new Offcanvas(el);
    offcanvas.show();
  };

  // Close offcanvas programmatically
  const closeMenu = () => {
    const el = document.getElementById("mobileMenu");
    const offcanvas = Offcanvas.getInstance(el);
    if (offcanvas) offcanvas.hide();
  };

  return (
    <>
      {/* Trigger button with HiOutlineMenu */}
      <button
        className="btn text-white d-lg-none"
        type="button"
        onClick={openMenu} // ✅ Programmatic open
      >
        <HiOutlineMenu size={26} />
      </button>

      {/* Offcanvas */}
      <div
        className="offcanvas offcanvas-start"
        id="mobileMenu"
        tabIndex="-1"
        aria-labelledby="mobileMenuLabel"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mobileMenuLabel">Menu</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={closeMenu}
          />
        </div>

        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/categories" className="nav-link" onClick={closeMenu}>Categories</Link>
              <ul className="list-unstyled ms-3">
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
              <ul className="list-unstyled ms-3">
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
              <ul className="list-unstyled ms-3">
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/policy" className="nav-link" onClick={closeMenu}>Policy</Link>
              <ul className="list-unstyled ms-3">
              </ul>
            </li>

            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link" onClick={closeMenu}>Register</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link" onClick={closeMenu}>Login</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}
                    className="nav-link"
                    onClick={closeMenu}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
