import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/searchProduct";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const SearchedProducts = () => {
  const [values] = useSearch();
  const navigate = useNavigate();
  const products = values.results.results || [];
    const [cart, setCart] = useCart([]);
  

  return (
    <Layout title={"Searched Products"}>
      <h2 className="text-center my-4">
        {products.length < 1
          ? "No Products Found"
          : `${products.length} Result(s) Found`}
      </h2>

      <div className="d-flex flex-wrap justify-content-center gap-3">
        {products.map((p) => (
          <div
            key={p._id}
            className="card shadow-sm text-center"
            style={{
              width: "16rem",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/product/${p.slug}`)}
          >
            {/* Product Image */}
            <img
              src={p.image}
              className="card-img-top p-3"
              alt={p.name}
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
            />

            {/* Card Body */}
            <div className="row">
                {products.map((p) => (
                  <div key={p._id} className="col-6 col-md-4 col-lg-3 mb-4">
                    <div className="card h-100 shadow border-0 rounded-4 hover-card ">
  {/* Product Image */}
  <div className="d-flex justify-content-center align-items-center p-3">
    <img
      src={p.image}
      className="card-img-top"
      alt={p.name}
      style={{ width: "150px", height: "150px", objectFit: "contain" }}
    />
  </div>

  {/* Card Body */}
  <div className="card-body d-flex flex-column">
    {/* Product Name */}
    <p className="text-center">{p.name}</p>

    {/* Responsive Description */}
    <p className="text-muted small  d-block d-lg-none">
      {p.description.length > 40
        ? p.description.substring(0, 40) + "..."
        : p.description}
    </p>
    <p className="text-muted small  d-none d-lg-block">
      {p.description}
    </p>

    {/* Price */}
    <p className="fw-bold text-success text-center fs-5 mb-3">
      ${p.price}
    </p>

    {/* Buttons */}
    <div className="mt-auto">
      <button
        className="btn btn-sm btn-outline-primary w-100 mb-2"
        onClick={() => navigate(`/product/${p.slug}`)}
      >
        View Details
      </button>
      <button
        className="btn btn-sm btn-success w-100 "
        onClick={() => {
          setCart([...cart, p]);
          localStorage.setItem("cart", JSON.stringify([...cart, p]));
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
          </div>
        ))}
      </div>

      <style jsx>{`
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        .text-truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
    </Layout>
  );
};

export default SearchedProducts;
