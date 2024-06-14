import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

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

  //generate client token (payment)

  const generateClientToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/product/braintree/token`
      );
      setClientToken(data.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    generateClientToken();
  }, [auth.token]);

  //make payment handle

  const handlePayment = async() => {
    try {
      setLoading(true);
      const {nonce} = await instance.requestPaymentMethod();
      const {data} = await axios.post(`${process.env.REACT_APP_URL}/api/v1/product/braintree/payment`, 
        {nonce, cart}
      );

      setLoading(false);
      localStorage.removeItem("cart");
      setCart([])
      toast.success("Payment Successfully Completed...");
      navigate("/");
      console.log("okk")
    } catch (error) {
      setLoading(false)
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


        
        {
          !clientToken || !cart.length ? ("") :(

            (<>
              <DropIn
              options={{
                authorization: clientToken,
                paypal:{
                  flow: "vault"
                }
              }}
              />
              </>
            ) 
          )
        }

          <button className="btn btn-primary" 
          onClick={()=>handlePayment()}
          >
            {loading ? "Processing" : "MAKE PAYMENT"}
          </button>
          </div>
        
        </div>

        </div>
      </div>
      
    </Layout>
  );
};

export default Cart;
