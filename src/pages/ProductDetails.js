import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { MESSAGES } from "../constants/index";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [similarProduct, setSimilarProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useCart();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.slug) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      getProductDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug]);

  const getProductDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/product/single-product/${params.slug}`
      );
      if (data?.product) {
        setProduct([data.product]);
        getSimilarProducts(
          data.product._id,
          data.product.category?._id || data.product.category
        );
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/product/similar-products/${pid}/${cid}`
      );
      setSimilarProduct(Array.isArray(data) ? data : data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(MESSAGES.PRODUCT.ADDED_TO_CART);
  };

  return (
    <Layout
      title={
        product[0]?.name ? `${product[0].name} - Details` : "Product Details"
      }
    >
      <div className="container py-4 my-2">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Main Product Section */}
            {product.map((p) => (
              <div
                key={p._id}
                className="row g-4 align-items-center bg-white shadow-sm border rounded-4 p-4 p-md-5 mb-5"
              >
                {/* Product Image */}
                <div className="col-md-5 text-center">
                  <div
                    className="p-3 bg-light rounded-4 d-flex align-items-center justify-content-center"
                    style={{ minHeight: "300px", maxHeight: "380px" }}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="img-fluid rounded"
                      style={{
                        maxHeight: "340px",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="col-md-7">
                  {p.category?.name && (
                    <span className="badge bg-secondary-subtle text-secondary mb-2 rounded-pill px-3 py-2">
                      {p.category.name}
                    </span>
                  )}
                  <h3 className="fw-bold text-dark mb-3">{p.name}</h3>
                  <div className="d-flex align-items-baseline gap-2 mb-3">
                    <span className="fs-3 fw-bold text-success">${p.price}</span>
                  </div>
                  <p
                    className="text-muted mb-4"
                    style={{ lineHeight: "1.7", fontSize: "1rem" }}
                  >
                    {p.description}
                  </p>

                  <button
                    className="btn btn-success rounded-pill px-4 py-2 shadow-sm d-inline-flex align-items-center gap-2 fw-medium"
                    onClick={(e) => handleAddToCart(e, p)}
                  >
                    <i className="bi bi-cart-plus fs-5"></i> Add to Cart
                  </button>
                </div>
              </div>
            ))}

            {/* Similar Products Section */}
            <div className="mt-5 pt-3">
              <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
                <h3 className="fw-bold text-dark m-0">Similar Products</h3>
                {similarProduct.length > 0 && (
                  <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-2">
                    {similarProduct.length} Item{similarProduct.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {similarProduct.length ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                  {similarProduct.map((sp) => (
                    <div key={sp._id} className="col">
                      <div
                        className="card h-100 border-0 shadow-sm rounded-4 hover-card product-card d-flex flex-column"
                        style={{
                          cursor: "pointer",
                          backgroundColor: "#ffffff",
                          overflow: "hidden",
                        }}
                        onClick={() => navigate(`/product/${sp.slug}`)}
                      >
                        {/* Image Container */}
                        <div
                          className="d-flex justify-content-center align-items-center p-3 position-relative"
                          style={{
                            height: "190px",
                            backgroundColor: "#f8f9fa",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={sp.image}
                            alt={sp.name}
                            className="card-img-top img-fluid product-card-img"
                            style={{
                              maxHeight: "160px",
                              maxWidth: "100%",
                              objectFit: "contain",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </div>

                        {/* Card Body */}
                        <div className="card-body d-flex flex-column p-3">
                          <h6
                            className="card-title fw-bold text-dark text-truncate-2 mb-2"
                            title={sp.name}
                            style={{
                              fontSize: "0.95rem",
                              lineHeight: "1.4",
                              minHeight: "2.7rem",
                            }}
                          >
                            {sp.name}
                          </h6>

                          <div className="d-flex align-items-center justify-content-between mt-auto mb-3">
                            <div>
                              <span className="text-muted small d-block">Price</span>
                              <span className="fw-bold text-success fs-5">
                                ${sp.price}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="d-grid gap-2">
                            <button
                              className="btn btn-sm btn-outline-primary rounded-pill py-2 fw-medium d-flex align-items-center justify-content-center gap-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/product/${sp.slug}`);
                              }}
                            >
                              <i className="bi bi-eye"></i> View Details
                            </button>
                            <button
                              className="btn btn-sm btn-success rounded-pill py-2 fw-medium d-flex align-items-center justify-content-center gap-1 shadow-sm"
                              onClick={(e) => handleAddToCart(e, sp)}
                            >
                              <i className="bi bi-cart-plus"></i> Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 bg-light rounded-4">
                  <p className="text-muted m-0">
                    No similar products available at this time.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
