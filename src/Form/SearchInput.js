import React from 'react';
import { useSearch } from '../context/searchProduct';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    // get search based products 
    const getSearchProduct = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/search/${values.keyword}`);
            setValues({ ...values, results: data });
            navigate("/searched/products")
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div>
            <form className="d-flex w-100" role="search" onSubmit={getSearchProduct}>
                <input className="form-control me-2 w-100" type="search" placeholder="Search" aria-label="Search"
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                />
                <button className="btn btn-outline-primary" type="submit" >🔍</button>
            </form>

        </div>
    )
}

export default SearchInput;