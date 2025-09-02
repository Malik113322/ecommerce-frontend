import React from "react";
import { NavLink } from "react-router-dom";
import { FaPlusCircle, FaBoxOpen, FaUsers, FaThList } from "react-icons/fa";

const Adminmenu = () => {
  return (
    <div className="bg-white shadow rounded p-3">
      <h5 className="fw-bold text-center mb-4">⚙️ Admin Panel</h5>

      <div className="list-group">
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action d-flex align-items-center gap-2"
        >
          <FaThList /> Create Category
        </NavLink>

        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action d-flex align-items-center gap-2"
        >
          <FaPlusCircle /> Create Product
        </NavLink>

        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action d-flex align-items-center gap-2"
        >
          <FaBoxOpen /> Products
        </NavLink>

        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action d-flex align-items-center gap-2"
        >
          <FaUsers /> Users
        </NavLink>
      </div>
    </div>
  );
};

export default Adminmenu;
