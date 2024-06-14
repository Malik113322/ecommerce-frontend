import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from "../components/Layout/Layout";

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/category-product/${params.slug}`);
            setCategory(data.category);
            setProducts(data.product);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData();
    }, [params.slug])

    return (
        <Layout title={"Category Product"}>
            {
                category ? (

                    <>
                        <h1 className='text-center mt-2'>{category.name} ({products.length}) </h1>
                    </>
                ) : <h1 className='text-center mt-2'>Not Found</h1>
            }
            <div className="d-flex flex-wrap text-center">
                {
                    products.map((p) => (
                        <div key={p._id} className='d-flex flex-wrap mx-2 '>
                            <div className="card d-flex justify-content-between text-center  m-2" style={{ width: '16rem' }}>
                                <div>
                                    <img src={p.image} className="m-auto mt-2" alt="product" style={{ width: "100px", height: "100px" }} />
                                    <div className="card-body" style={{ height: "12rem" }}>
                                        <h5 className="card-title">{p.name}</h5>
                                        <h6 className="card-title">${p.price}</h6>
                                        <h6 className="card-text">{`${p.description.substring(0, 40)}...`}</h6>
                                        <button className="btn btn-success px-1 mx-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                        <button className='btn btn-primary px-2 '>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Layout>


    )
}

export default CategoryProduct;