import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Adminmenu from "../../components/Layout/Adminmenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../Form/CategoryForm";
import { Button, Modal, Popconfirm } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/category/categories`
      );
      if (data.success) {
        setCategories(data.categories)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  // create category
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/api/v1/category/create-category`,
        { name }
      );
      if (data.success) {
        toast.success(`${name} category created`);
        setName("");
        getCategories();
      }
    } catch (error) {
      toast.error("Category not created");
    }
  };

  // update category
  const handleCategoryUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_URL}/api/v1/category/update-category/${selected._id}`,
        { name: updateName }
      );
      if (data.success) {
        toast.success("Successfully updated");
        setVisible(false);
        getCategories();
      }
    } catch (error) {
      toast.error("Category not updated");
    }
  };

  // delete category
  const handleCategoryDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_URL}/api/v1/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success("Category deleted");
        getCategories();
      }
    } catch (error) {
      toast.error("Category not deleted");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid py-4">
        <div className="row">
          {/* Left Menu */}
          <div className="col-md-3">
            <Adminmenu />
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="card shadow border-0 p-4">
              <h2 className="mb-4 text-center fw-bold text-danger">
                Manage Categories
              </h2>

              {/* Create Form */}
              <div className="mb-4">
                <CategoryForm
                  handleSubmit={handleCreateCategory}
                  value={name}
                  setValue={setName}
                />
              </div>

              {/* Categories Table */}
              <div className="table-responsive">
                <table className="table table-hover align-middle text-center">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Category</th>
                      <th scope="col" colSpan="2">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((c) => (
                      <tr key={c._id}>
                        <td className="fw-semibold">{c.name}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => {
                              setVisible(true);
                              setUpdateName(c.name);
                              setSelected(c);
                            }}
                          >
                            ✏️ Edit
                          </button>
                        </td>
                        <td>
                          <Popconfirm
                            title="Are you sure you want to delete this category?"
                            onConfirm={() => handleCategoryDelete(c._id)}
                            okText="Yes"
                            cancelText="No"
                            okButtonProps={{ danger: true }} // ✅ makes the button red
                          >
                            <Button type="default" danger size="small" icon="🗑️">
                              Delete
                            </Button>
                          </Popconfirm>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Modal */}
              <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                open={visible}
              >
                <CategoryForm
                  handleSubmit={handleCategoryUpdate}
                  value={updateName}
                  setValue={setUpdateName}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
