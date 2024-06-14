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
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [cart, setCart] = useCart([]);


  // get products 

  useEffect(() => {
    if (!checked.length > 0) {
      getProductsClient()
    }
  }, [checked.length])

  const getProductsClient = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/product-list/${page}`);
      setLoading(false)
      // console.log(data.products)
      setProducts(data.products)
    } catch (error) {
      console.log(error)
      setLoading(false)

    }
  }

  useEffect(() => {
    if (page === 1) return;
    loadmoreHandler();
  }, [page])

  //loadmore 
  const loadmoreHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts([...products, ...data.products]);
    } catch (error) {
      console.log(error)
      setLoading(false)

    }
  }

  // useEffect(() => {
  //   if (page === 1) return;
  //   loadmoreHandler();
  // }, [page])


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

  //count product for loadmore 
  const getCountProduct = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/product-count`);
      setLoading(false)
      setTotal(data.total)
    } catch (error) {
      setLoading(false)
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
    getCountProduct();
    // eslint-disable-next-line 
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
        <div className="row">
          <div className="col-md-2 mt-5 ms-5">
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
                products.map((p) => (
                  <div key={p._id} className='d-flex flex-wrap mx-2 '>
                    <div className="card d-flex justify-content-between text-center  m-2" style={{ width: '16rem' }}>
                      <div>
                        <img src={p.image} className="m-auto mt-2" alt="product" style={{ width: "100px", height: "100px" }} />
                        <div className="card-body" style={{ height: "12rem" }}>
                          <h5 className="card-title">{p.name}</h5>
                          <h6 className="card-title">${p.price}</h6>
                          <h6 className="card-text">{`${p.description.substring(0, 40)}...`}</h6>
                          <button className="btn btn-success px-1 mx-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
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
            {
              products && products.length < total && (
                <button className="btn btn-warning"
                  onClick={(e) => { e.preventDefault(); setPage(page + 1) }}
                >
                  {
                    loading ? (
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : " Loadmore"
                  }
                </button>
              )
            }
          </div>


        </div>
      </div>
    </Layout>
  );
};

export default Home;
