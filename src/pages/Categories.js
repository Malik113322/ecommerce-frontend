import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Spinner from "../Spinner";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories
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

  return (
    <Layout title="Categories"> 
      <div className="container-fluid py-4">

    <div className="container py-4">
      <h2 className="text-center mb-4">All Categories</h2>
      <div className="row g-3">
        {categories.length > 0 ? (
          categories.map((c) => (
            <div className="col-md-4 col-sm-6" key={c._id}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">{c.name}</h5>
                  <Link
                    to={`/category/${c.slug}`}
                    className="btn btn-outline-primary btn-sm mt-2"
                  >
                    View Products
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Spinner/>
        )}
      </div>
    </div>
    </div>
    </Layout>
  );
};

export default Categories;
