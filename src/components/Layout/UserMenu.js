import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="list-group w-100" style={{ maxWidth: "300px" }}>
        <NavLink
          to={"/dashboard/user/profile"}
          className="list-group-item list-group-item-action text-center"
        >
          Profile
        </NavLink>
        <NavLink
          to={"/dashboard/user/orders"}
          className="list-group-item list-group-item-action text-center"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
