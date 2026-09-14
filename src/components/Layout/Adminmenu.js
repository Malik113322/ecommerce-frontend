import React from "react";
import { NavLink } from "react-router-dom";
import { FaPlusCircle, FaBoxOpen, FaUsers, FaThList } from "react-icons/fa";

const Adminmenu = () => {
  return (
    <div className="bg-white shadow-sm border rounded-4 p-3 mb-4 sticky-top" style={{ top: "90px", zIndex: 10 }}>
      <h5 className="fw-bold text-center mb-3 text-dark">⚙️ Admin Panel</h5>

      <div className="list-group list-group-flush gap-1">
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action rounded-3 border-0 d-flex align-items-center gap-2 py-2"
        >
          <FaThList /> Create Category
        </NavLink>

        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action rounded-3 border-0 d-flex align-items-center gap-2 py-2"
        >
          <FaPlusCircle /> Create Product
        </NavLink>

        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action rounded-3 border-0 d-flex align-items-center gap-2 py-2"
        >
          <FaBoxOpen /> Products
        </NavLink>

        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action rounded-3 border-0 d-flex align-items-center gap-2 py-2"
        >
          <FaUsers /> Users
        </NavLink>
      </div>
    </div>
  );
};

export default Adminmenu;
