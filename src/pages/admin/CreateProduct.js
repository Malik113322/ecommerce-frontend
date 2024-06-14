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
      const { data } = await axios.post(`http://localhost:8080/api/v1/product/create-product`, productForm);
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
      const { data } = await axios.get(`http://localhost:8080/api/v1/category/categories`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useState(() => {
    getCategories()
  }, []);

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="mb-3 col-md-9">

              <Select
                bordered={false}
                placeholder="select category"
                showSearch
                onChange={(value) => { setCategory(value) }}
                size="large"
                className="form-select"

              >
                {
                  categories.map((c) => (
                    <Option key={c._id} value={c._id} >
                      {c.name}
                    </Option>
                  ))
                }
              </Select>
            </div>
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-9">
                {image ? image.name : "UPLAOD IMAGE"}
                <input type="file" name="image" className="form-select" accept="image/*" onChange={(e) => setImage(e.target.files[0])}
                  hidden
                  required
                />
              </label>
            </div>
            <div className="mb-3 col-md-9">
              {image && (
                <div className="text-center">
                  <img src={URL.createObjectURL(image)} alt="product" className="img img-responsive" height={"200px"} />
                </div>
              )}
            </div>
            <div className="mb-3 col-md-9">
              <input type="text" className="form-select" placeholder="enter product name" value={name} onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 col-md-9">
              <input type="text" className="form-select" placeholder="enter product description" value={description} onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 col-md-9">
              <input type="text" className="form-select" placeholder="enter product price" value={price} onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 col-md-9">
              <input type="text" className="form-select" placeholder="enter product quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 col-md-9">
              <Select
                bordered={false}
                size="large"
                className="form-select"
                showSearch
                onChange={(value) => setShipping(value)}
                placeholder="shipping"
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary" onClick={createProduct}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
