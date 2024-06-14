import { createContext, useContext, useEffect, useState } from "react";

const cartContext = createContext();


const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const cartItems = localStorage.getItem('cart');
        if (cartItems) {
            setCart(JSON.parse(cartItems))
        }
    }, [])


    return (
        <cartContext.Provider value={[cart, setCart]}>
            {children}
        </cartContext.Provider>
    )
};

const useCart = () => useContext(cartContext);

export { CartProvider, useCart };