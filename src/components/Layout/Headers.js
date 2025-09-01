import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Headers = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const category = useCategory();
  const [cart] = useCart();

  // logout
  const handleLogout = (e) => {
    e.preventDefault();
    toast.success("Successfully Logout");
    setTimeout(() => {
      setAuth({ user: null, token: "" });
      localStorage.removeItem("auth");
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary px-3">
        {/* Hamburger for mobile */}
        <button
          className="btn btn-outline-dark d-lg-none me-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileMenu"
          aria-controls="mobileMenu"
        >
          <i className="bi bi-list"></i>
        </button>

        {/* Brand */}
        <NavLink to={"/"} className="navbar-brand">
          🛒 eCommerce
        </NavLink>
        

        {/* Search Centered */}
        <div className="mx-auto w-50 d-none d-lg-block">
          <SearchInput />
        </div>

        {/* Cart Always Right */}
        <div className="ms-auto d-flex align-items-center">
          <NavLink to={"/cart"} className="nav-link">
            <Badge count={cart.length} showZero>
              <i className="bi bi-cart3 fs-5"></i>
            </Badge>
          </NavLink>
        </div>
      </nav>

      {/* Search visible in mobile center */}
      <div className="d-lg-none px-3 my-2">
        <SearchInput />
      </div>

      {/* Offcanvas Menu (from left side) */}
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
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={"/"} className="nav-link" data-bs-dismiss="offcanvas">
                Home
              </NavLink>
            </li>

            {/* Category Dropdown */}
            <li className="nav-item">
              <Link
                to={`/category`}
                className="nav-link"
                data-bs-dismiss="offcanvas"
              >
                Categories
              </Link>
              <ul className="list-unstyled ms-3">
                {category.map((c) => (
                  <li key={c._id}>
                    <Link
                      to={`/category/${c.slug}`}
                      className="nav-link"
                      data-bs-dismiss="offcanvas"
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
                    to={"/register"}
                    className="nav-link"
                    data-bs-dismiss="offcanvas"
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"/login"}
                    className="nav-link"
                    data-bs-dismiss="offcanvas"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to={`/dashboard/${
                      auth.user.role === 1 ? "admin" : "user"
                    }`}
                    className="nav-link"
                    data-bs-dismiss="offcanvas"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"/login"}
                    className="nav-link"
                    onClick={handleLogout}
                    data-bs-dismiss="offcanvas"
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

export default Headers;
