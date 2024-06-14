import React from 'react'
import Layout from '../components/Layout/Layout';
import { useSearch } from '../context/searchProduct';
import { useNavigate } from 'react-router-dom';

const SearchedProducts = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    return (
        <Layout title={"Searched Products"}>

            <h2 className='text-center'> {values.results.results.length < 1 ? "Not Found" : `${values.results.results.length}`} Results Found</h2>
            <div className='text-center d-flex flex-wrap justify-content-center'>

                {
                    values.results.results.map((p) => (
                        <div key={p._id} className='d-flex'>
                            <div className="card d-flex justify-content-between text-center  m-1" style={{ width: '14rem' }}>

                                <div>
                                    <img src={p.image} className="card-img-top mt-2" alt="product" style={{ width: "150px", height: "150px" }} />
                                    <div className="card-body" style={{ height: "11rem" }}>
                                        <h6 className="card-title">{p.name}</h6>
                                        <h6 className="card-title">${p.price}</h6>
                                        <p className="card-text">{`${p.description.substring(0, 18)}...`}</p>
                                        <button className='btn btn-primary px-4 mx-2' onClick={() => navigate()}>Add Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>


        </Layout >
    )
}

export default SearchedProducts;