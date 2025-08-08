import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Price } from "../components/Layout/Price";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

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


  // get products 

  useEffect(() => {
    if (!checked.length > 0) {
      getProductsClient()
    }
  }, [checked.length])

  const getProductsClient = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/get-products`);
      // console.log(data.products)
      setProducts(data.products)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)

    }
  }


  // get filter products 
  useEffect(() => {
    if (checked.length > 0 || radio.length) {
      filterProductClient()
    }
  }, [checked, radio])


  const filterProductClient = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_URL}/api/v1/product/filter-products`, { checked, radio });
      if (data.success)
        setProducts(data.products)
    } catch (error) {
      console.log(error)
    }
  }

  // get categories 
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/category/categories`);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getCategories();
  }, [])

  // select category 
  const handleFilter = async (value, id) => {
    let allValue = [...checked];
    if (value) {
      allValue.push(id)
    } else {
      allValue = allValue.filter(c => c !== id)
    }
    setChecked(allValue)
  }




  return (
    <Layout title={"eCommerce - A online shop"}>
      <div className="overflow-hidden" >
        {
          loading ? <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <div class="spinner-border" role="status">
              <span class="sr-only"></span>
            </div> </div> : (<div className="row">
              <div className="col-md-2 mt-5 ms-5 ">
                <h4>Catgories</h4>
                <div className="d-flex flex-column">
                  {
                    categories.map((c) => (
                      <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                        {c.name}
                      </Checkbox>
                    ))
                  }
                </div>
                <div className="mt-5">
                  <h2>Price</h2>
                  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {
                      Price.map((p) => (
                        <div key={p._id}>
                          <Radio value={p.array}>
                            {p.name}
                          </Radio>
                        </div>

                      ))
                    }
                  </Radio.Group>
                </div>
                <div className="mt-2">
                  <button className="btn btn-danger" onClick={() => window.location.reload()}>REST DEFAULT</button>
                </div>
              </div>
              <div className="col-md-9 text-center ms-5 mt-3 mb-3">
                <div className="d-flex flex-wrap text-center">

                  {
                    paginatedData.map((p) => (
                      <div key={p._id} className='d-flex' style={{ maxWidth: "300px" }}>
                        <div className="card d-flex justify-content-between text-center m-2 " style={{ width: '15rem', height: '20rem' }}>
                          <div className="w-100">
                            <img src={p.image} className="m-auto mt-2" alt="product" style={{ width: "120px", height: "120px" }} />
                            <div className="card-body" style={{ height: "12rem" }}>
                              <div className="w-100 h-75">
                                <p className="card-title">{p.name}</p>
                                <p className="card-text">{p.description.substring(1, 20)}...</p>
                                <p className="card-title">Price: ${p.price}</p>
                              </div>
                              <button className="btn btn-success px-1 mx-1" onClick={() => navigate(`/product/${p.slug}`)}>Details</button>
                              <button className='btn btn-primary px-2' onClick={() => {
                                setCart([...cart, p]);
                                localStorage.setItem("cart", JSON.stringify([...cart, p]));
                                toast.success("Added To Cart Successfully");
                              }}>Add to Cart</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
                <div className="paginationCard w-100 d-flex flex-wrap justify-content-center align-items-center">
                  <button className="btn btn-danger"
                    disabled={currentPage === totalPage}
                    onClick={() => currentPage < totalPage ? setCurrentPage(pre => pre + 1) : ''}>Next</button>
                  {Array.from({ length: totalPage }, (_, index) => (
                    <button onClick={() => setCurrentPage(index + 1)} className="btn btn-outline-danger border-2  mx-1 text-black">{index + 1}</button>
                  ))}
                  <button className="btn btn-danger"
                    onClick={() => currentPage > 1 ? setCurrentPage(pre => pre - 1) : ''}
                  >Prev</button>
                </div>
            </div>)
        }
      </div>

    </Layout>
  );
};

export default Home;
