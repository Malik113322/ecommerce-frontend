import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [similarProduct, setSimilarProduct] = useState([]);
  const [cart, setCart] = useCart();

  const params = useParams();

  useEffect(() => {
    if (params.slug) getProductDetails();
  }, [params.slug]);

  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/product/single-product/${params.slug}`
      );
      setProduct(data.product);
      getSimilarProducts(data.product[0]._id, data.product[0].category);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/product/similar-products/${pid}/${cid}`
      );
      setSimilarProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Product Details"}>
      <div className="container py-4 my-2">
        {product.map((p) => (
          <div
            key={p._id}
            className="row g-4 align-items-center bg-white  rounded-3 p-4 mb-5"
          >
            {/* Product Image */}
            <div className="col-md-5 text-center">
              <img
                src={p.image}
                alt={p.name}
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "350px", objectFit: "contain" }}
              />
            </div>

            {/* Product Info */}
            <div className="col-md-7">
              <h4 className="fw-bold mb-3">{p.name}</h4>
              <h4 className="text-success fw-semibold mb-3">${p.price}</h4>
              <p className="text-muted mb-4">{p.description}</p>

              <button
                className="btn btn-sm btn-success rounded-pill px-4 shadow-sm"
                onClick={() => {
                  setCart([...cart, p]);
                  toast.success("Added to Cart Successfully");
                  localStorage.setItem("cart", JSON.stringify([...cart, p]));
                }}
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        ))}

       {/* Similar Products */}
<div className="mt-5">
  <h3 className="fw-bold mb-4">Similar Products</h3>
  {similarProduct.length ? (
    <div
      className="d-flex overflow-auto pb-3"
      style={{ gap: "1rem" }}
    >
      {similarProduct.map((sp) => (
        <div key={sp._id}
  className="card shadow-sm border-0 d-flex flex-column justify-content-between"
  style={{ minWidth: "220px", maxWidth: "220px", height: "320px" }}
>
  <img
    src={sp.image}
    alt={sp.name}
    className="card-img-top p-3"
    style={{ height: "160px", objectFit: "contain" }}
  />

  {/* Card Body with fixed button */}
  <div className="card-body d-flex flex-column justify-content-between">
    <div>
      <p className="card-title fw-semibold mb-1">{sp.name}</p>
      <p className="card-text text-success fw-semibold mb-3">${sp.price}</p>
    </div>

    <button
      className="btn btn-sm btn-outline-success mt-auto"
      onClick={() => {
        setCart([...cart, sp]);
        toast.success("Added to Cart Successfully");
        localStorage.setItem("cart", JSON.stringify([...cart, sp]));
      }}
    >
      🛒 Add to Cart
    </button>
  </div>
</div>

      ))}
    </div>
  ) : (
    <p className="text-muted">No similar products available</p>
  )}
</div>

      </div>
    </Layout>
  );
};

export default ProductDetails;
