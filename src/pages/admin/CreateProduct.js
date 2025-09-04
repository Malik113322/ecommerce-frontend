import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Adminmenu from "../../components/Layout/Adminmenu";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate();

  // create product 

  const createProduct = async (e) => {
    e.preventDefault();
    const productForm = new FormData();
    productForm.append("name", name)
    productForm.append("image", image)
    productForm.append("description", description)
    productForm.append("price", price)
    productForm.append("category", category)
    productForm.append("quantity", quantity)
    productForm.append("shipping", shipping)
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/v1/product/create-product`, productForm);
      if (data.success) {
        toast.success("successfully created product")
        setTimeout(() => {
          navigate("/dashboard/admin/products")
        })
      } else {
        toast.error("Error while creating a product")
      }
    } catch (error) {
      console.log(error)
    }
  }


  // get categories 
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/category/categories`);
<<<<<<< HEAD
      setCategories(data.categories)
=======
     
        setCategories(data.categories)
      
>>>>>>> 10a888f25188130e33a41986320e26e9e4811363
    } catch (error) {
      console.log(error)
    }
  }

  useState(() => {
    getCategories()
  }, []);

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
         <div className="col-md-9">
  <div className="card shadow-lg border-0 rounded-4 p-4">
    <h2 className="fw-bold text-center mb-4">✨ Create Product</h2>

    {/* Category */}
    <div className="mb-3">
      <label className="form-label fw-semibold">Category</label>
      <Select
        bordered={true}
        placeholder="Select category"
        showSearch
        onChange={(value) => setCategory(value)}
        size="large"
        className="w-100"
      >
        {categories && categories.map((c) => (
          <Option key={c._id} value={c._id}>
            {c.name}
          </Option>
        ))}
      </Select>
    </div>

    {/* Image Upload */}
    <div className="mb-3">
      <label className="form-label fw-semibold">Upload Image</label>
      <label className="btn btn-outline-primary w-100">
        {image ? image.name : "📷 Choose Product Image"}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          hidden
          required
        />
      </label>
    </div>

    {/* Preview */}
    {image && (
      <div className="text-center mb-3">
        <img
          src={URL.createObjectURL(image)}
          alt="product"
          className="img-fluid rounded shadow"
          height="200"
        />
      </div>
    )}

    {/* Name */}
    <div className="mb-3">
      <label className="form-label fw-semibold">Product Name</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    </div>

    {/* Description */}
    <div className="mb-3">
      <label className="form-label fw-semibold">Description</label>
      <textarea
        className="form-control"
        rows="3"
        placeholder="Enter product description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
    </div>

    {/* Price */}
    <div className="mb-3">
      <label className="form-label fw-semibold">Price</label>
      <input
        type="number"
        className="form-control"
        placeholder="Enter product price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
    </div>

    {/* Quantity */}
    <div className="mb-3">
      <label className="form-label fw-semibold">Quantity</label>
      <input
        type="number"
        className="form-control"
        placeholder="Enter product quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
    </div>

    {/* Shipping */}
    <div className="mb-3">
      <label className="form-label fw-semibold">Shipping</label>
      <Select
        bordered={true}
        size="large"
        className="w-100"
        onChange={(value) => setShipping(value)}
        placeholder="Select shipping option"
      >
        <Option value="0">No</Option>
        <Option value="1">Yes</Option>
      </Select>
    </div>

    {/* Submit Button */}
    <div className="d-grid">
      <button
        type="submit"
        className="btn btn-success btn-lg rounded-3 shadow-sm"
        onClick={createProduct}
      >
        🚀 Submit
      </button>
    </div>
  </div>
</div>

        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
