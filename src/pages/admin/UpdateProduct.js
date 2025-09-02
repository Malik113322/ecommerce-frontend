import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Adminmenu from "../../components/Layout/Adminmenu";
import { Select } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

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
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/product/single-product/${params.slug}`
      );
      if (data.success) {
        const p = data.product[0];
        setCategory(p.category);
        setName(p.name);
        setDescription(p.description);
        setPrice(p.price);
        setQuantity(p.quantity);
        setShipping(p.shipping);
        setImage(p.image);
        setId(p._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line
  }, []);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/category/categories`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // update product
  const updateHandle = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_URL}/api/v1/product/update-product/${id}`,
        { name, description, price, shipping, quantity, category }
      );
      if (data.success) {
        toast.success("Product updated successfully!");
        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Update Product">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-9">
            <div className="card shadow-sm border-0 rounded-3 p-4">
              <h3 className="fw-bold text-center text-danger border-bottom pb-2 mb-4">
                Update Product
              </h3>

              <form onSubmit={updateHandle}>
                {/* Category */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Category</label>
                  <Select
                    size="large"
                    showSearch
                    className="w-100"
                    bordered
                    onChange={(value) => setCategory(value)}
                    value={category}
                    placeholder="Select category"
                  >
                    {categories.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* Image */}
                <div className="mb-3 text-center">
                  <label className="form-label fw-semibold d-block">
                    Product Image
                  </label>
                  {image && (
                    <img
                      src={image}
                      alt="product"
                      className="img-fluid rounded mb-2"
                      style={{ maxHeight: "200px", objectFit: "contain" }}
                    />
                  )}
                 
                </div>

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter product description"
                  ></textarea>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                  />
                </div>

                {/* Quantity */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter quantity"
                  />
                </div>

                {/* Shipping */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Shipping</label>
                  <Select
                    size="large"
                    className="w-100"
                    bordered
                    onChange={(value) => setShipping(value)}
                    value={shipping ? "1" : "0"}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    <i className="bi bi-check-circle me-2"></i> Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
