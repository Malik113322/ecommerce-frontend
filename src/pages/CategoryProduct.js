import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/product/category-product/${params.slug}`
      );
      setCategory(data.category);
      setProducts(data.products || []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.slug) getData();
  }, [params.slug]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Added to Cart Successfully");
  };

  return (
    <Layout title={category?.name ? `${category.name} - Products` : "Category Products"}>
      <div className="container py-4 my-2">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark mb-2">
            {category ? category.name : "Category"}
          </h2>
          <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-2 fw-medium">
            {products.length} Product{products.length !== 1 ? "s" : ""} Found
          </span>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : products.length < 1 ? (
          <div className="text-center py-5 my-4 bg-light rounded-4 shadow-sm">
            <h4 className="fw-bold text-secondary mb-2">No Products in this Category</h4>
            <p className="text-muted mb-4">Check back later for new arrivals.</p>
            <button
              className="btn btn-primary rounded-pill px-4 py-2"
              onClick={() => navigate("/")}
            >
              <i className="bi bi-arrow-left me-2"></i>Explore All Products
            </button>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {products.map((p) => (
              <div key={p._id} className="col">
                <div
                  className="card h-100 border-0 shadow-sm rounded-4 hover-card product-card d-flex flex-column"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#ffffff",
                    overflow: "hidden",
                  }}
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  {/* Image */}
                  <div
                    className="d-flex justify-content-center align-items-center p-3 position-relative"
                    style={{
                      height: "200px",
                      backgroundColor: "#f8f9fa",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={p.image}
                      className="card-img-top img-fluid product-card-img"
                      alt={p.name}
                      style={{
                        maxHeight: "170px",
                        maxWidth: "100%",
                        objectFit: "contain",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </div>

                  {/* Body */}
                  <div className="card-body d-flex flex-column p-3">
                    <h6
                      className="card-title fw-bold text-dark text-truncate-2 mb-2"
                      title={p.name}
                      style={{
                        fontSize: "1rem",
                        lineHeight: "1.4",
                        minHeight: "2.8rem",
                      }}
                    >
                      {p.name}
                    </h6>

                    <p
                      className="card-text text-muted small mb-3 text-truncate-2"
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.4",
                      }}
                    >
                      {p.description}
                    </p>

                    <div className="d-flex align-items-center justify-content-between mt-auto mb-3">
                      <div>
                        <span className="text-muted small d-block">Price</span>
                        <span className="fw-bold text-success fs-5">
                          ${p.price}
                        </span>
                      </div>
                    </div>

                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary rounded-pill py-2 fw-medium d-flex align-items-center justify-content-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${p.slug}`);
                        }}
                      >
                        <i className="bi bi-eye"></i> View Details
                      </button>
                      <button
                        className="btn btn-sm btn-success rounded-pill py-2 fw-medium d-flex align-items-center justify-content-center gap-1 shadow-sm"
                        onClick={(e) => handleAddToCart(e, p)}
                      >
                        <i className="bi bi-cart-plus"></i> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
