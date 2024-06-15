import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Adminmenu from "../../components/Layout/Adminmenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_URL}api/v1/category/categories`);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line 
  }, []);


  // create category 
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/v1/category/create-category`, { name });
      if (data.success) {
        toast.success(`${name} category created`)
        setName("");
        getCategories();
      }
    } catch (error) {
      toast.error("category not created")
    }
  }

  // update category 
  const handleCategoryUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_URL}/api/v1/category/update-category/${selected._id}`, { name: updateName });
      if (data.success) {
        toast.success("successfully updated");
        setVisible(false);
        getCategories();
      }
    } catch (error) {
      toast.error("category not updated")
    }
  }

  // delete category 

  const handleCategoryDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_URL}/api/v1/category/delete-category/${id}`);
      if (data.success) {
        toast.success("category deleted");
        getCategories();
      }
    } catch (error) {
      toast.error("category not deleted");
    };
  };

  // getting categories 

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>
          <div className="col-md-9">
            <h1 className="p-3 m-3">MANAGE CATEGORY</h1>
            <div className="w-50">

              <CategoryForm handleSubmit={handleCreateCategory}
                value={name}
                setValue={setName} />
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  categories.map((c) => (
                    <>
                      <tr key={c._id}>
                        <td><h4>{c.name}</h4></td>
                        <td><button className="btn btn-primary" onClick={() => {
                          setVisible(true); setUpdateName(c.name); setSelected(c)
                        }}>EDIT</button></td>
                        <td><button className="btn btn-danger" onClick={() => handleCategoryDelete(c._id)}>DELETE</button></td>

                      </tr>

                    </>
                  ))
                }


              </tbody>
            </table>
          </div>
          <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
            <CategoryForm handleSubmit={handleCategoryUpdate} value={updateName} setValue={setUpdateName} />
          </Modal>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory;
