import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Price } from "../components/Layout/Price";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import resizeImage1 from "../assets/resize1.png"; 
import resizeImage2 from "../assets/resize2.png"; 
import resizeImage3 from "../assets/resize3.png"; 
import resizeImage4 from "../assets/resize4.png"; 
import DiscountSlider from "./Discount";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [cart, setCart] = useCart([]);
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = products.slice(start, end);
  const totalPage = Math.ceil(products.length / itemsPerPage);

  // Get products
  useEffect(() => {
    if (!checked.length > 0) getProductsClient();
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
  }, [checked, radio]);

  const filterProductClient = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/api/v1/product/filter-products`,
        { checked, radio }
      );
      if (data.success) setProducts(data.products);
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
      if (data.success) setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
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
          
          <DiscountSlider/>
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
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#homeCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <div className="row">
              {/* Desktop Sidebar */}
              <div className="col-lg-2 d-none d-lg-block mt-4">
                <h5 className="fw-bold">Categories</h5>
                <div className="d-flex flex-column">
                  {categories && categories.map((c) => (
                    <Checkbox
                      key={c._id}
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                    >
                      {c.name}
                    </Checkbox>
                  ))}
                </div>

                <div className="mt-4">
                  <h5 className="fw-bold">Price</h5>
                  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {Price.map((p) => (
                      <div key={p._id}>
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
                    {categories && categories.map((c) => (
                      <button
                        key={c._id}
                        className="btn btn-outline-dark  rounded-3 px-4 py-1 me-1"
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
                <div className="row">
                  {paginatedData.map((p) => (
                    <div key={p._id} className="col-6 col-md-4 col-lg-3 mb-4">
                      <div className="card h-100 shadow border-0 rounded-4 hover-card">
                        {/* Product Image */}
                        <div className="d-flex justify-content-center align-items-center p-3">
                          <img
                            src={p.image}
                            className="card-img-top"
                            alt={p.name}
                            style={{
                              width: "150px",
                              height: "150px",
                              objectFit: "contain",
                            }}
                          />
                        </div>

                        {/* Card Body */}
                        <div className="card-body d-flex flex-column">
                          <p className="text-center">{p.name}</p>

                          <p
                            className="text-muted small"
                            style={{
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              WebkitLineClamp:
                                window.innerWidth < 992 ? 1 : 3,
                            }}
                          >
                            {p.description}
                          </p>

                          <p className="fw-bold text-success text-center fs-5 mb-3">
                            ${p.price}
                          </p>

                          <div className="mt-auto">
                            <button
                              className="btn btn-sm btn-outline-primary w-100 mb-2"
                              onClick={() =>
                                navigate(`/product/${p.slug}`)
                              }
                            >
                              View Details
                            </button>
                            <button
                              className="btn btn-sm btn-success w-100 "
                              onClick={() => {
                                setCart([...cart, p]);
                                localStorage.setItem(
                                  "cart",
                                  JSON.stringify([...cart, p])
                                );
                              }}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="d-flex justify-content-center align-items-center my-3 flex-wrap">
                  <button
                    className="btn btn-outline-danger mx-1"
                    onClick={() =>
                      currentPage > 1 && setCurrentPage((pre) => pre - 1)
                    }
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPage }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`btn mx-1 ${currentPage === index + 1
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
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
