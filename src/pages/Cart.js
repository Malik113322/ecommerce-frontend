import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();

  // Remove item from cart
  const removeItemFromCart = (pid) => {
    try {
      const myCart = [...cart];
      const index = myCart.findIndex((item) => item._id === pid);
      if (index !== -1) {
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
        toast.success("Item removed from cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Total price
  const totalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // Checkout function
  const checkout = async () => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC);
    try {
      if (cart.length > 0) {
        const data = await fetch(
          `${process.env.REACT_APP_URL}/api/v1/product/api/create-checkout-session`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ products: cart }),
          }
        );
        const session = await data.json();
        await stripe.redirectToCheckout({ sessionId: session.id });
      } else {
        toast.error("Please add some products in cart!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Cart Page"}>
      <div className="container my-4">
        <div className="text-center mb-4">
          <h2>{auth.token && `Hello, ${auth.user.name}`}</h2>
          <h5 className="text-muted">
            {cart.length > 0
              ? `You have ${cart.length} item(s) in your cart`
              : "Your cart is empty"}
          </h5>
        </div>

        <div className="row">
          {/* Cart items */}
          <div className="col-lg-8">
            {cart.length > 0 ? (
              cart.map((p) => (
                <div
                  key={p._id}
                  className="card mb-3 shadow-sm border-0 rounded-3"
                >
                  <div className="row g-0 align-items-center">
                    <div className="col-md-4 text-center">
                      <img
                        src={p.image}
                        alt="product"
                        className="img-fluid rounded-start"
                        style={{ maxHeight: "180px", objectFit: "contain" }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text text-muted">
                          {p.description.substring(0, 60)}...
                        </p>
                        <h6 className="text-primary mb-3">Price: ${p.price}</h6>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => removeItemFromCart(p._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h5 className="text-center mt-4">🛒 Your cart is empty</h5>
            )}
          </div>

          {/* Cart summary */}
          <div className="col-lg-4">
            <div className="card shadow p-3 rounded-3">
              <h4 className="mb-3">Cart Summary</h4>
              <p className="text-muted">Total | Checkout | Payment</p>
              <h5 className="fw-bold">Total: {totalPrice()}</h5>

              {auth.token ? (
                <>
                  <hr />
                  <p className="mb-1 fw-bold">Delivery Address:</p>
                  <p className="text-muted">{auth.user.address}</p>
                  <button
                    className="btn btn-outline-secondary mb-3"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                  <button
                    className="btn btn-success w-100"
                    onClick={() => checkout()}
                  >
                    Proceed to Checkout
                  </button>
                  <div className="mt-3 text-muted small">
                    <p>💳 Demo card for testing:</p>
                    <code>4242 4242 4242 4242</code>
                  </div>
                </>
              ) : (
                <button
                  className="btn btn-primary w-100"
                  onClick={() => navigate("/login", { state: "/cart" })}
                >
                  Login to Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
