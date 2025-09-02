import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Offcanvas } from "bootstrap";

const MobileMenu = ({ auth, handleLogout, category }) => {
  const handleCloseMenu = () => {
    const offcanvasElement = document.getElementById("mobileMenu");
    const offcanvas = Offcanvas.getInstance(offcanvasElement);
    if (offcanvas) offcanvas.hide();
  };

  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="mobileMenu"
      aria-labelledby="mobileMenuLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="mobileMenuLabel">
          Menu
        </h5>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleCloseMenu} // ✅ close manually
        ></button>
      </div>

      <div className="offcanvas-body">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={handleCloseMenu}>
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/categories" className="nav-link" onClick={handleCloseMenu}>
              Categories
            </Link>
            <ul className="list-unstyled ms-3">
              {/* Example categories list */}
              {category &&
                category.map((c) => (
                  <li key={c._id}>
                    <Link
                      to={`/category/${c.slug}`}
                      className="nav-link"
                      onClick={handleCloseMenu}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </li>

          {!auth.user ? (
            <>
              <li className="nav-item">
                <NavLink
                  to="/register"
                  className="nav-link"
                  onClick={handleCloseMenu}
                >
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className="nav-link"
                  onClick={handleCloseMenu}
                >
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink
                  to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}
                  className="nav-link"
                  onClick={handleCloseMenu}
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className="nav-link"
                  onClick={() => {
                    handleLogout();
                    handleCloseMenu();
                  }}
                >
                  Logout
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
