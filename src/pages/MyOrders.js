import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      let auth = JSON.parse(localStorage.getItem("auth"));
      if (!auth) return;

      let { token, user } = auth;

      const res = await fetch(`${process.env.REACT_APP_URL}/my-orders/${user._id}`, {
        headers: {
          Authorization: token,
        },
      });

      const data = await res.json();
      if (data.success) setOrders(data.orders);
    };

    fetchOrders();
  }, []);

  return (
    <Layout title={'myorders'} >
         <div className="container my-4">

        
    <div className="container" style={{ padding: "20px" }}>
      <h2>📦 My Orders</h2>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            marginBottom: "20px",
            padding: "15px",
          }}
        >
          <h4>Order ID: {order._id}</h4>
          <p>Status: <b>{order.status}</b></p>
          {/* <p>Payment: {order.payment?.payment_status || "N/A"}</p> */}
          <p>Date: {new Date(order.createdAt).toLocaleString()}</p>

          <h5>Products:</h5>
          <ul>
            {order.products.map((p) => (
              <li
                key={p._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    marginRight: "10px",
                    borderRadius: "8px",
                  }}
                />
                <div>
                  <p style={{ margin: 0 }}>{p.name}</p>
                  <p style={{ margin: 0 }}>
                    Price: ${p.price} | Qty: {p.qty || 1}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
     </div>
    </Layout>
  );
};

export default MyOrders;
