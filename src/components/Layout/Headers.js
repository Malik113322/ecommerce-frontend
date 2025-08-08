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
      setAuth({
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink to={"/"} className="navbar-brand">
              🛒 eCommerce
            </NavLink>
            <div className="w-75 mx-2">
          <SearchInput />
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center justify-content-center w-50 ">
              
              <li className="nav-item small">

                <NavLink
                  to={"/"}
                  className="nav-link active"
                  aria-current="page"
                >

                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown small">
                <Link to={`/category`} className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
                </Link>
                <ul className="dropdown-menu">
                  {
                    category.map((c) => (

                      <li key={c._id}><Link to={`/category/${c.slug}`} className="dropdown-item" >{c.name}</Link></li>
                    ))
                  }

                </ul>
              </li>


              {!auth.user ? (
                <>
                  <li className="nav-item small">
                    <NavLink
                      to={"/register"}
                      className="nav-link active"
                      aria-current="page"
                    >
                      Register
                    </NavLink>
                  </li>

                  <li className="nav-item small">
                    <NavLink
                      to={"/login"}
                      className="nav-link active"
                      aria-current="page"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown small">
                    <NavLink
                      to={""}
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <NavLink
                          to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"
                            }`}
                          className="nav-link active"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li className="nav-item small">
                        <NavLink
                          to={"/login"}
                          className="nav-link active"
                          onClick={handleLogout}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item small">
                <NavLink to={"/cart"} className="nav-link active">
                  <Badge count={cart.length} showZero>
                    <p className="nav-item color">🛒</p>
                  </Badge>
                </NavLink>
              </li>
            </ul>

            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Headers;
