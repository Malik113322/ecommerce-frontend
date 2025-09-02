import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { HiOutlineMenu } from "react-icons/hi";
import { AiFillHome, AiOutlineUser } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";

const Headers = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const category = useCategory();
  const [cart] = useCart();

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
      {/* Upper Navbar */}
      <nav
        className="navbar navbar-expand-lg px-3 py-3 shadow-sm"
        style={{ background: "linear-gradient(90deg, #4b6cb7, #182848)" }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between">

          {/* Mobile: Hamburger + Brand + Cart */}
          <div className="d-flex align-items-center d-lg-none w-100 justify-content-between">
           <MobileMenu auth={auth} handleLogout={handleLogout} category={category} />

            <NavLink to="/" className="navbar-brand text-white fw-bold fs-2 ">
              🛒 eCommerce
            </NavLink>

            <NavLink to="/cart" className="nav-link text-white position-relative">
              <Badge count={cart.length} showZero>
                <BsCart3 size={24} />
              </Badge>
            </NavLink>
          </div>

          {/* Desktop Navbar */}
          <div className="d-none d-lg-flex align-items-center w-100 justify-content-between">
            {/* Left links */}
             <NavLink to="/" className="navbar-brand text-white fw-bold fs-3 d-flex mb-2 ">
              🛒 eCommerce
            </NavLink>
            <ul className="navbar-nav d-flex align-items-center gap-3">
              <li className="nav-item">
                <NavLink to="/" className="nav-link text-white">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link text-white">About</NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  to="/category"
                  className="nav-link dropdown-toggle text-white"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Categories
                </NavLink>
                <ul className="dropdown-menu">
                  {category.map((c) => (
                    <li key={c._id}>
                      <Link to={`/category/${c.slug}`} className="dropdown-item">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            {/* Center search */}
            <div className="mx-auto w-50">
              <SearchInput />
            </div>

            {/* Right links */}
            <ul className="navbar-nav d-flex align-items-center gap-3">
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link text-white">Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link text-white">Login</NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <NavLink to="" className="nav-link dropdown-toggle text-white" role="button" data-bs-toggle="dropdown">
                    {auth.user.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`} className="dropdown-item">
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/login" className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}

              <li className="nav-item">
                <NavLink to="/cart" className="nav-link text-white position-relative">
                  <Badge count={cart.length} showZero>
                    <BsCart3 size={24}/>
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="d-lg-none fixed-bottom bg-white shadow-sm border-top">
        <div className="d-flex justify-content-around py-2">
          <NavLink to="/" className="text-center text-dark">
            <AiFillHome size={24} />
            <div className="small">Home</div>
          </NavLink>

          <NavLink to="/categories" className="text-center text-dark">
            <BiCategory size={24} />
            <div className="small">Category</div>
          </NavLink>

          <NavLink to="/cart" className="text-center text-dark position-relative">
            <Badge count={cart.length} showZero>
              <BsCart3 size={24} />
            </Badge>
            <div className="small">Cart</div>
          </NavLink>

          <NavLink to={auth.user ? `/dashboard/${auth.user.role === 1 ? "admin" : "user"}` : "/login"} className="text-center text-dark">
            <AiOutlineUser size={24} />
            <div className="small">{auth.user ? "Profile" : "Login"}</div>
          </NavLink>
        </div>
      </div>

      {/* Offcanvas Menu */}
      
    </>
  );
};

export default Headers;
