import React, { useEffect, useState } from 'react'
import Adminmenu from '../../components/Layout/Adminmenu';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // display products 
    const getProuductsHandle = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/get-products`);
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProuductsHandle();
    }, [])

    // delete a product 
    const deleteHandle = async (id) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_URL}/api/v1/product/delete-product/${id}`);
            if (data.success) {
                toast.success("Successfully deleted");
                getProuductsHandle();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout title='All Products'>

            <div className="container-fluid p-3 m-3">
                <div className="row">
                    <div className="col-md-3">
                        <Adminmenu />
                    </div>

                    <div className="col-md-9 text-center">

                        <h1>Products</h1>

                        {
                            products ? (<div className='mb-3 d-flex p-3 justify-space-between flex-wrap'>
                                {
                                    products.map((p) => (
                                        <div key={p._id} className='d-flex '>
                                            <div className="card d-flex justify-content-between text-center  m-1" style={{ width: '16rem' }}>

                                                <div>
                                                    <img src={p.image} className="card-img-top mt-2" alt="product" style={{ width: "150px", height: "150px" }} />
                                                    <div className="card-body" style={{ height: "11rem" }}>
                                                        <h6 className="card-title">{p.name}</h6>
                                                        <h6 className="card-title">${p.price}</h6>
                                                        <p className="card-text">{`${p.description.substring(0, 18)}...`}</p>
                                                        <button className='btn btn-primary px-4 mx-2' onClick={() => navigate(`/dashboard/admin/update-product/${p.slug}`)}>Edit</button>
                                                        <button className='btn btn-danger  px-3' onClick={() => deleteHandle(p._id)}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>) : ("NOT PRODUCT YET")
                        }

                    </div>
                </div>
            </div>
        </Layout >

    )
}

export default Products;
