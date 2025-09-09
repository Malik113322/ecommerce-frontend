import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const OrderSuccess = () => {
  const location = useLocation();

  useEffect(() => {
    const saveOrder = async () => {
      const query = new URLSearchParams(location.search);
      const session_id = query.get("session_id");

      let auth = JSON.parse(localStorage.getItem("auth"));
      let { token, user } = auth;

      // fetch session details from backend (Stripe)
      const sessionRes = await fetch(`${process.env.REACT_APP_URL}/api/v1/product/api/stripe/session-status/${session_id}`);
      const sessionData = await sessionRes.json();

      // save order
      await fetch(`${process.env.REACT_APP_URL}/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          products: JSON.parse(localStorage.getItem("cart")).map(p => p._id),
          buyerId: user._id,
          payment: sessionData,
        }),
      });

      // clear cart
      localStorage.removeItem("cart");
    };

    saveOrder();
  }, [location]);

   return (
    <Layout title={'myorders'}>
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center p-6">
      {/* Animated Checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-6xl mb-4"
      >
        ✅
      </motion.div>

      {/* Animated Heading */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-green-700"
      >
        Payment Successful!
      </motion.h1>

      {/* Sub Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-gray-700 mt-2"
      >
        🎉 Your order has been placed successfully.
      </motion.p>

      {/* Button to My Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-6"
      >
        <Link
          to="/myorders"
          className="px-6 py-3 bg-green-600 text-green rounded-xl shadow-md hover:bg-green-700 transition"
        >
         Check Your Orders
        </Link>
      </motion.div>
    </div>
    </Layout>
  );
};

export default OrderSuccess;
