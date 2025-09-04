import { useEffect, useState } from "react";
import axios from "axios";

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    const getCategory = async () => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_URL}/api/v1/category/categories`);
<<<<<<< HEAD
             setCategories(data.categories)
=======
           setCategories(data.categories)
>>>>>>> 10a888f25188130e33a41986320e26e9e4811363
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategory();
    }, [])
    return categories;
}
