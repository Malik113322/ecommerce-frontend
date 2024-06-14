import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <div>
            <div className="list-group text-center">
                {/* <h1 className='text-center'>User Menu</h1> */}
                <NavLink to={"/dashboard/user/profile"} className="list-group-item list-group-item-action" >
                    Profile
                </NavLink>
                <NavLink to={"/dashboard/user/orders"} className="list-group-item list-group-item-action" >
                    Orders</NavLink>
            </div>

        </div>
    )
}

export default UserMenu