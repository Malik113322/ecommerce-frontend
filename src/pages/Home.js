import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Price } from "../components/Layout/Price";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import resizeImage1 from "../assets/resize1.png"; 
import resizeImage2 from "../assets/resize2.png"; 
import resizeImage3 from "../assets/resize3.png"; 
import resizeImage4 from "../assets/resize4.png"; 
import DiscountSlider from "./Discount";
import { MESSAGES, APP_CONFIG } from "../constants/index";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [cart, setCart] = useCart([]);
  const itemsPerPage = APP_CONFIG.ITEMS_PER_PAGE || 8;
  const [currentPage, setCurrentPage] = useState(1);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = products.slice(start, end);
  const totalPage = Math.ceil(products.length / itemsPerPage);

  // Get products
  useEffect(() => {
    if (!checked.length > 0) getProductsClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked.length]);

  const getProductsClient = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/product/get-products`
      );
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter products
  useEffect(() => {
    if (checked.length > 0 || radio.length) filterProductClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, radio]);

  const filterProductClient = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/api/v1/product/filter-products`,
        { checked, radio }
      );
      if (data.success) {
        setProducts(data.products);
        setCurrentPage(1); // Reset to page 1 on filter
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/category/categories`
      );
      if (data.success) setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle category filter
  const handleFilter = async (value, id) => {
    let allValue = [...checked];
    if (value) allValue.push(id);
    else allValue = allValue.filter((c) => c !== id);
    setChecked(allValue);
  };

  return (
    <Layout title={"eCommerce - An online shop"}>
      <div className="container-fluid">
        {loading ? (
          <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        ) : (
          <>
            <DiscountSlider />
            {/* ----------- Carousel with clickable images ----------- */}
            <div
              id="homeCarousel"
              className="carousel slide mb-4 border-4"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <a href="/category/1">
                    <img
                      src={resizeImage1}
                      className="d-block w-100 img-fluid rounded-4"
                      alt="Slide 1"
                      style={{ maxHeight: "500px", objectFit: "cover" }}
                    />
                  </a>
                </div>
                <div className="carousel-item">
                  <a href="/category/2">
                    <img
                      src={resizeImage2}
                      className="d-block w-100 img-fluid rounded-4"
                      alt="Slide 1"
                      style={{ maxHeight: "500px", objectFit: "cover" }}
                    />
                  </a>
                </div>
                <div className="carousel-item">
                  <a href="/product/sample-product">
                    <img
                      src={resizeImage3}
                      className="d-block w-100 img-fluid rounded-4"
                      alt="Slide 1"
                      style={{ maxHeight: "500px", objectFit: "cover" }}
                    />
                  </a>
                </div>
                <div className="carousel-item">
                  <a href="/category/3">
                    <img
                      src={resizeImage4}
                      className="d-block w-100 img-fluid rounded-4"
                      alt="Slide 1"
                      style={{ maxHeight: "500px", objectFit: "cover" }}
                    />
                  </a>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#homeCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#homeCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <div className="row">
              {/* Desktop Filters */}
              <div className="col-lg-2 d-none d-lg-block p-3">
                <h5 className="fw-bold mb-3">Categories</h5>
                <div className="d-flex flex-column gap-2">
                  {categories &&
                    categories.map((c) => (
                      <Checkbox
                        key={c._id}
                        onChange={(e) => handleFilter(e.target.checked, c._id)}
                      >
                        {c.name}
                      </Checkbox>
                    ))}
                </div>

                <div className="mt-4">
                  <h5 className="fw-bold mb-3">Price</h5>
                  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {Price.map((p) => (
                      <div key={p._id} className="mb-1">
                        <Radio value={p.array}>{p.name}</Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>

                <div className="mt-3">
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() => window.location.reload()}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>

              {/* Mobile Filters */}
              <div className="d-block d-lg-none w-100 mt-1">
                <h6 className="px-2">Categories</h6>

                <div className="d-flex flex-row align-items-center py-2 px-2">
                  <button
                    className="btn btn-outline-danger rounded-pill px-3 me-2 flex-shrink-0 d-flex align-items-center gap-1"
                    onClick={() => window.location.reload()}
                  >
                    <i className="bi bi-arrow-clockwise"></i>
                  </button>

                  <div className="d-flex flex-row flex-nowrap overflow-auto no-scrollbar">
                    {categories &&
                      categories.map((c) => (
                        <button
                          key={c._id}
                          className="btn btn-outline-dark rounded-3 px-4 py-1 me-1"
                          onClick={() => handleFilter(true, c._id)}
                        >
                          {c.name}
                        </button>
                      ))}
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="col-lg-10 mt-3">
                {products.length === 0 ? (
                  <div className="text-center py-5 my-3 bg-light rounded-4 shadow-sm p-4">
                    <div className="mb-3">
                      <i
                        className="bi bi-funnel text-muted"
                        style={{ fontSize: "3.5rem" }}
                      ></i>
                    </div>
                    <h4 className="fw-bold text-secondary mb-2">
                      {MESSAGES.PRODUCT.NO_FILTER_PRODUCTS}
                    </h4>
                    <p className="text-muted mb-4">
                      {MESSAGES.PRODUCT.TRY_CHANGING_FILTERS}
                    </p>
                    <button
                      className="btn btn-outline-danger rounded-pill px-4 py-2"
                      onClick={() => window.location.reload()}
                    >
                      <i className="bi bi-arrow-clockwise me-2"></i>Reset Filters
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="row">
                      {paginatedData.map((p) => (
                        <div
                          key={p._id}
                          className="col-6 col-md-4 col-lg-3 mb-4"
                        >
                          <div
                            className="card h-100 shadow border-0 rounded-4 hover-card product-card d-flex flex-column"
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#ffffff",
                              overflow: "hidden",
                            }}
                            onClick={() => navigate(`/product/${p.slug}`)}
                          >
                            {/* Product Image */}
                            <div
                              className="d-flex justify-content-center align-items-center p-3 position-relative"
                              style={{
                                height: "180px",
                                backgroundColor: "#f8f9fa",
                                overflow: "hidden",
                              }}
                            >
                              <img
                                src={p.image}
                                className="card-img-top img-fluid product-card-img"
                                alt={p.name}
                                style={{
                                  maxHeight: "150px",
                                  maxWidth: "100%",
                                  objectFit: "contain",
                                  transition: "transform 0.3s ease",
                                }}
                              />
                            </div>

                            {/* Card Body */}
                            <div className="card-body d-flex flex-column p-3">
                              <h6
                                className="card-title fw-bold text-dark text-truncate-2 mb-2 text-center"
                                title={p.name}
                                style={{
                                  fontSize: "0.95rem",
                                  lineHeight: "1.4",
                                  minHeight: "2.7rem",
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

                              <p className="fw-bold text-success text-center fs-5 mt-auto mb-3">
                                ${p.price}
                              </p>

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
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCart([...cart, p]);
                                    localStorage.setItem(
                                      "cart",
                                      JSON.stringify([...cart, p])
                                    );
                                    toast.success(
                                      MESSAGES.PRODUCT.ADDED_TO_CART
                                    );
                                  }}
                                >
                                  <i className="bi bi-cart-plus"></i> Add to
                                  Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPage > 1 && (
                      <div className="d-flex justify-content-center align-items-center my-3 flex-wrap">
                        <button
                          className="btn btn-outline-danger mx-1"
                          onClick={() =>
                            currentPage > 1 &&
                            setCurrentPage((pre) => pre - 1)
                          }
                          disabled={currentPage === 1}
                        >
                          Prev
                        </button>
                        {Array.from({ length: totalPage }, (_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`btn mx-1 ${
                              currentPage === index + 1
                                ? "btn-danger"
                                : "btn-outline-danger"
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))}
                        <button
                          className="btn btn-outline-danger mx-1"
                          onClick={() =>
                            currentPage < totalPage &&
                            setCurrentPage((pre) => pre + 1)
                          }
                          disabled={currentPage === totalPage}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
