import React, { useEffect, useState } from 'react';
import Layout from "../components/Layout/Layout";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from "../context/cart";
import toast from 'react-hot-toast';


const ProductDetails = () => {
    const [product, setProduct] = useState([]);
    const [similarProduct, setSimilarProduct] = useState([]);
    const [cart, setCart] = useCart();


    const params = useParams();

    useEffect(() => {
        if (params.slug) getProductDetails();
    }, [params.slug])

    const getProductDetails = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/single-product/${params.slug}`);
            setProduct(data.product);
            // console.log(data.product[0]);
            // console.log(data.product[0]._id, data.product[0].category)
            getSimilarProducts(data.product[0]._id, data.product[0].category);
            // console.log(data.product[0]._id, data.product[0].category)
        } catch (error) {
            console.log(error)
        }
    }

    // get similar products 
    const getSimilarProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/similar-products/${pid}/${cid}`);
            setSimilarProduct(data);
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <Layout title={"Product Details"}>
            <div className='container-fluid m-3 p-3 mb-5'>
                {
                    product.map((p) => (

                        <div key={p._id} className='row  m-5'>
                            <div className='col-md-4 mb-5 m-5'>

                                <img src={p.image} alt='product' width={"300px"} height={"300px"} />
                            </div>

                            <div className='col-md-6 mb-5 border-start px-5'>
                                <h4>Name : {p.name}</h4>
                                <h4>Price : ${p.price}</h4>
                                <h4 className='mb-5'>Description: {p.description}</h4>
                                <button className='btn btn-primary px-4' onClick={
                                    () => {
                                        setCart([...cart, p]); toast.success("Added To Cart Successfully");
                                        localStorage.setItem("cart", JSON.stringify([...cart, p]))
                                    }

                                }>Add to Cart</button>

                            </div>
                        </div>
                    ))
                }

                {
                    similarProduct.length ? (

                        <div className='mt-5'>
                            <h1> Similar Products</h1>
                            {
                                similarProduct.map((p) => (
                                    <div key={p._id} className='row border-bottom m-5'>
                                        <div className='col-md-4 border-end m-5  '>
                                            <img className='img img-responsive m-5' src={p.image} alt='similar' width="200px" height="200px" />
                                        </div>
                                        <div className='col-md-6  m-5'>
                                            <h5>Name: {p.name}</h5>
                                            <h5>Price: {p.price}</h5>
                                            <h5>Description: {p.description}</h5>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : "NOT ANY SIMILAR PRODUCTS"
                }


            </div>
        </Layout>

    )
}

export default ProductDetails;