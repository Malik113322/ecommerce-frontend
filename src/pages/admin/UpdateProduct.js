import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import Adminmenu from "../../components/Layout/Adminmenu";
import { Select } from "antd";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
const { Option } = Select;

const UpdateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [id, setId] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    // get single product 
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/single-product/${params.slug}`);
            if (data.success) {

                setCategory(data.product[0].category);
                setName(data.product[0].name);
                setDescription(data.product[0].description);
                setPrice(data.product[0].price);
                setQuantity(data.product[0].quantity);
                setShipping(data.product[0].shipping);
                setImage(data.product[0].image);
                setId(data.product[0]._id);
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProduct();
        // eslint-disable-next-line
    }, [])

    const getCategories = async () => {
        try {
            const { data } = await axios.get(${process.env.REACT_APP_URL}/api/v1/category/categories`);
            if (data.success) {
                setCategories(data.category)
            }
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        getCategories();
    }, [])

    // update product details 
    const updateHandle = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_URL}/api/v1/product/update-product/${id}`, {
                name,
                description,
                price,
                shipping,
                quantity,
                category
            });
            if (data.success) {
                toast.success("Successfully Update ");
                setTimeout(() => {
                    navigate("/dashboard/admin/products")
                }, 2000);
            }


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout title={'Product update page'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <Adminmenu />
                    </div>
                    <div className='col-md-9'>
                        <h1> Product Update</h1>
                        <div className='mb-3 col-md-9'>
                            <form>
                                <Select
                                    size='large'
                                    showSearch
                                    className='form-select mb-3'
                                    bordered={false}
                                    onChange={(value) => setCategory(value)}
                                    placeholder="select category"
                                    value={category}
                                >
                                    {
                                        categories.map((c) => (
                                            <Option key={c._id} value={c._id}
                                            >
                                                {c.name}
                                            </Option>
                                        ))
                                    }
                                </Select>

                                <div className='mb-3 text-center'>
                                    <label className='btn  col-md-9'>
                                        {image ? image.name : "UPLOAD"}
                                        <img src={image} alt={image} width={"300px"} height={"300px"} />

                                    </label>
                                </div>

                                <div className='mb-3'>
                                    <input
                                        type="text"
                                        className='form-select'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='enter name'
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <input
                                        type='text'
                                        className='form-select'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder='enter description'
                                        required
                                    />
                                </div>

                                <div className='mb-3'>
                                    <input
                                        type='text'
                                        className='form-select'
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder='enter price'
                                    />
                                </div>

                                <div className='mb-3'>
                                    <input
                                        type='text'
                                        className='form-select'
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        placeholder='enter quantity'
                                        required
                                    />
                                </div>

                                <div className='mb-3'>
                                    <Select
                                        showSearch
                                        size='large'
                                        className='form-select'
                                        bordered={false}
                                        onChange={(value) => setShipping(value)}
                                        placeholder="shipping"
                                        value={shipping ? "Yes" : "No"}
                                    >
                                        <Option value="0"> No</Option>
                                        <Option value="1">Yes</Option>
                                    </Select>
                                </div>
                                <button className='btn btn-primary' type='submit' onClick={updateHandle}> Update Product</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default UpdateProduct;
