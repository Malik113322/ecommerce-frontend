import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form onSubmit={handleSubmit} className="p-3 rounded-3 bg-white shadow-sm">
      <div className="mb-3">
        <label htmlFor="categoryName" className="form-label fw-semibold">
          Category Name
        </label>
        <input
          id="categoryName"
          type="text"
          className="form-control form-control-lg rounded-3"
          placeholder="Enter category name..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary btn-lg rounded-3">
          <i className="bi bi-plus-circle me-2"></i> Add Category
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
