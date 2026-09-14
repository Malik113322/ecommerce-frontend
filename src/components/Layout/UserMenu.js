import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaBox, FaTachometerAlt } from "react-icons/fa";

const UserMenu = () => {
  return (
    <div className="bg-white shadow-sm border rounded-4 p-3 mb-4 sticky-top" style={{ top: "90px", zIndex: 10 }}>
      <h5 className="fw-bold text-center mb-3 text-dark">👤 User Dashboard</h5>
      <div className="list-group list-group-flush gap-1">
        <NavLink
          to="/dashboard/user"
          end
          className="list-group-item list-group-item-action rounded-3 border-0 d-flex align-items-center gap-2 py-2"
        >
          <FaTachometerAlt /> Dashboard
        </NavLink>
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action rounded-3 border-0 d-flex align-items-center gap-2 py-2"
        >
          <FaUser /> Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="list-group-item list-group-item-action rounded-3 border-0 d-flex align-items-center gap-2 py-2"
        >
          <FaBox /> Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
