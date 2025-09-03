import { useEffect, useState } from "react";
import axios from "axios";

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    const getCategory = async () => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/category/categories`);
           setCategories(data.categories)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategory();
    }, [])
    return categories;
}
