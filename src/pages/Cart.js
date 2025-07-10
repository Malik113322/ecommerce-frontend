import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  


 //remove item from cart
  const removeItemFromCart = (pid) => {
    try {
      const myCart = [...cart];
      const index = myCart.filter((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item Removed From Cart");
    } catch (error) {
      console.log(error);
    }
  };

  //total price cart item

  const totalPrice = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };



  useEffect(() => {
  }, [auth.token]);

  //checkout function

  const checkout = async() => {
    try {
      const stripe = await loadStripe('pk_test_51RDqlXQ9vwMDloJlEdnI1ytDD8LQgCTvmh2otwJEADHs9qzbO1zUWbwmiDTlJC8QLcSM8zl5f0TFhaeOS02jIGpA00EQHw74tB');
      const {data} = await axios.post(`${process.env.REACT_APP_URL}/api/create-checkout-session`,{cart});
      const session = data.json();
      const result = stripe.redirectToCheckout({
        sessionId:session.id
      });
      
    } catch (error) {
      console.log(error)
    }

  };

  return (
    
    <Layout title={"Cart Page"}>

      <div className="overflow-hidden">
        <div className="text-center mt-2">
          <h2>{auth.token && `Hello ${auth.user.name}`}</h2>
          <h4>
            {cart
              ? `You Have ${cart.length} Items In Your Cart ${
                  auth.token ? "" : "(Please Login)"
                } `
              : "Your Cart Is Empty"}
          </h4>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="row m-3">
              {cart.map((p) => (
                <div className="d-flex  align-items-center border rounded m-3 p-2">
                  <div className="col-md-4">
                    <img
                      src={p.image}
                      alt="product"
                      width={"150px"}
                      height={"150px"}
                    />
                  </div>

                  <div className="col-md-6">
                    <p>Name: {p.name}</p>
                    <p>Price: ${p.price}</p>
                    <p>Description: {p.description}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeItemFromCart(p._id)}
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4 text-center mb-3">
            <h4>Cart Summary</h4>
            <p>TOTAL | CHECHKOUT | PAYMENT</p>
            <h4>TOTAL: {totalPrice()}</h4>
            {auth.token ? (
              <>
                <p>Current Address</p>
                <h4>{auth.user.address}</h4>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  UPDATE ADDRESS
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => navigate("/login", { state: "/cart" })}
              >
                Please Login to Checkout
              </button>
            )}

            <div className="mt-2">

          <button className="btn btn-primary" 
          onClick={()=>checkout()}
          >
           Checkout
          </button>
          </div>
        
        </div>

        </div>
      </div>
      
    </Layout>
  );
};

export default Cart;
