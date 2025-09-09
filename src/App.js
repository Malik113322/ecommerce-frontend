import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Auth/Register";
import "./App.css";
import Login from "./pages/Auth/Login";
import Categories from "./pages/Categories";
import Policy from "./pages/Policy";
import Pagenot from "./pages/Pagenot";
import Cart from "./pages/Cart";
import Dashboard from "./pages/user/Dashboard";
import PrivateRout from "./components/Routes/Private";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import AmdinPrivatRoute from "./components/Routes/PrivateAdmin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import SearchedProducts from "./pages/SearchedProducts";
import ProductDetails from "./pages/ProductDetails";
import CategoryProduct from "./pages/CategoryProduct";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Success from "./stripe-pages/Success";
import Cancel from "./stripe-pages/Cancel";
import MyOrders from "./pages/MyOrders";



const App = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<PrivateRout />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/orders" element={<Orders />} />
      </Route>

      <Route path="/dashboard" element={<AmdinPrivatRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/update-product/:slug" element={<UpdateProduct />} />
        <Route path="admin/users" element={<Users />} />
      </Route>

      <Route path="/" element={<Home />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/category/:slug" element={<CategoryProduct />} />
      <Route path="/searched/products" element={<SearchedProducts />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/myorders" element={<MyOrders />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/success" element={<Success/>}/>
      <Route path="/cancel" element={<Cancel/>}/>
      <Route path="*" element={<Pagenot />} />
    </Routes>
  );
};

export default App;
