import React from "react";
import { useSearch } from "../context/searchProduct";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  // handle search
  const getSearchProduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/searched/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="d-flex align-items-center w-100 mx-auto"
      role="search"
      onSubmit={getSearchProduct}
      style={{ maxWidth: "600px" }} // centers and limits width
    >
      <input
        className="form-control rounded-start-pill shadow-sm"
        type="search"
        placeholder="Search for products..."
        aria-label="Search"
        value={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
      />
      <button
        className="btn btn-primary rounded-end-pill px-3"
        type="submit"
      >
        <i className="bi bi-search"></i>
      </button>
    </form>
  );
};

export default SearchInput;
