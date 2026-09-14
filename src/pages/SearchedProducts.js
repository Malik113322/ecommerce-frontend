import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/searchProduct";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const SearchedProducts = () => {
  const [values] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const products = Array.isArray(values?.results)
    ? values.results
    : values?.results?.results || [];

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Added to Cart Successfully");
  };

  return (
    <Layout title={"Searched Products"}>
      <div className="container py-4 my-2">
        {/* Header Section */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark mb-2">Search Results</h2>
          {values?.keyword && (
            <p className="text-muted mb-2">
              Results for <span className="badge bg-light text-primary border px-3 py-2 fs-6">"{values.keyword}"</span>
            </p>
          )}
          <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-2 fw-medium">
            {products.length === 0
              ? "No products found"
              : `${products.length} product${products.length > 1 ? "s" : ""} found`}
          </span>
        </div>

        {/* Empty State */}
        {products.length < 1 ? (
          <div className="text-center py-5 my-4 bg-light rounded-4 shadow-sm">
            <div className="mb-3">
              <i className="bi bi-search text-muted" style={{ fontSize: "3.5rem" }}></i>
            </div>
            <h4 className="fw-bold text-secondary">No Matching Products Found</h4>
            <p className="text-muted mb-4">
              Try checking your spelling or use different keywords to find what you're looking for.
            </p>
            <button
              className="btn btn-primary rounded-pill px-4 py-2"
              onClick={() => navigate("/")}
            >
              <i className="bi bi-arrow-left me-2"></i>Explore All Products
            </button>
          </div>
        ) : (
          /* Products Grid */
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {products.map((p) => (
              <div key={p._id} className="col">
                <div
                  className="card h-100 border-0 shadow-sm rounded-4 hover-card product-card d-flex flex-column"
                  style={{
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    backgroundColor: "#ffffff",
                    overflow: "hidden",
                  }}
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  {/* Product Image Container */}
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

                  {/* Card Body */}
                  <div className="card-body d-flex flex-column p-3">
                    {/* Category if available */}
                    {p.category?.name && (
                      <span className="badge bg-secondary-subtle text-secondary small align-self-start mb-2 rounded-pill px-2 py-1">
                        {p.category.name}
                      </span>
                    )}

                    {/* Product Name */}
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

                    {/* Description */}
                    <p
                      className="card-text text-muted small mb-3 text-truncate-2"
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.4",
                      }}
                    >
                      {p.description}
                    </p>

                    {/* Price */}
                    <div className="d-flex align-items-center justify-content-between mt-auto mb-3">
                      <div>
                        <span className="text-muted small d-block">Price</span>
                        <span className="fw-bold text-success fs-5">
                          ${p.price}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
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

export default SearchedProducts;
