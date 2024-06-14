import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        // get data from auth context 
        const { name, email, address } = auth.user;
        setName(name);
        setEmail(email);
        setAddress(address);
    }, [auth.user]);

    // update details 
    const updateDetails = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_URL}/api/v1/auth/update-details`, {
                name,
                email,
                password,
                address
            });
            if (data.success) {
                setAuth({ ...auth, user: data.updateUser });
                toast.success("successfully update");
                navigate("/dashboard/user/profile")
            };
            // save data in storage 
            let ls = localStorage.getItem("auth");
            ls = JSON.parse(ls);
            ls.user = data.updateUser;
            localStorage.setItem("auth", JSON.stringify(ls));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout title={"My Profile"}>
            <div className='container-fluid p-3 m-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='login text-center'>
                            <form className='text-center' onSubmit={updateDetails}>
                                <h1>My Profile</h1>
                                <input type='text' placeholder='ENTER NAME' value={name} onChange={(e) => setName(e.target.value)} />
                                <input type='text' placeholder='ENTER EMAIL' value={email} disabled />
                                <input type='text' placeholder='ENTER PASSWORD' value={password} onChange={(e) => setPassword(e.target.value)} />
                                <input type='text' placeholder='ENTER ADDRESS' className='mb-4' value={address} onChange={(e) => setAddress(e.target.value)} />
                                <button className='btn btn-primary'>Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile;