import React, { useEffect, useState } from "react";
import Adminmenu from "../../components/Layout/Adminmenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // fetch products
  const getProductsHandle = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/product/get-products`
      );
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsHandle();
  }, []);

  // delete product
  const deleteHandle = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_URL}/api/v1/product/delete-product/${id}`
      );
      if (data.success) {
        toast.success("Successfully deleted");
        getProductsHandle();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="All Products">
      <div className="container-fluid py-4">
        <div className="row">
          {/* Left Sidebar */}
          <div className="col-md-3">
            <Adminmenu />
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <h2 className="text-center fw-bold text-danger border-bottom pb-2 mb-4">
              All Products
            </h2>

            {products.length > 0 ? (
              <div className="row g-4">
                {products.map((p) => (
                  <div key={p._id} className="col-sm-6 col-md-4 col-lg-3">
                    <div className="card h-100 shadow-sm border-0 rounded-3">
                      <img
                        src={p.image}
                        className="card-img-top p-3"
                        alt={p.name}
                        style={{
                          height: "180px",
                          objectFit: "contain",
                        }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h6 className="card-title fw-semibold">{p.name}</h6>
                        <p className="text-muted small mb-1">
                          {p.description.substring(0, 40)}...
                        </p>
                        <h6 className="text-success mb-3">${p.price}</h6>
                        <div className="mt-auto d-flex justify-content-between">
                          <Button
                            type="default"              // default type (neutral background)
                            size="small"                // small size like btn-sm
                            style={{
                              borderColor: "#0d6efd",  // Bootstrap primary color
                              color: "#0d6efd",
                              backgroundColor: "transparent",
                              
                            }}
                            icon={<EditOutlined style={{ marginRight: 4 }} />} // like me-1
                          >
                            Edit
                          </Button>
                          <Popconfirm
                            title="Are you sure you want to delete this item?"
                            onConfirm={() => deleteHandle(p._id)}
                            okText="Yes"
                            cancelText="No"
                            okButtonProps={{ danger: true }} // makes confirm button red
                          >
                            <Button
                              type="default"
                              danger
                              size="small"
                              icon={<DeleteOutlined />}
                            >
                              Delete
                            </Button>
                          </Popconfirm>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="alert alert-warning text-center">
                loading...
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
