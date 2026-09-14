import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import UserMenu from "../components/Layout/UserMenu";

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
    <Layout title={"My Orders"}>
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-md-4 col-lg-3">
            <UserMenu />
          </div>

          <div className="col-12 col-md-8 col-lg-9">
            <div className="card shadow-sm border-0 rounded-4 p-4 p-md-5 bg-white">
              <h2 className="fw-bold mb-4 text-dark border-bottom pb-3">📦 My Orders</h2>

              {orders.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted fs-5 mb-0">No orders found.</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="card border rounded-3 p-3 bg-light"
                    >
                      <div className="d-flex flex-wrap justify-content-between align-items-center mb-2 pb-2 border-bottom">
                        <div>
                          <span className="text-muted small">Order ID: </span>
                          <span className="fw-semibold font-monospace">{order._id}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className={`badge ${order.status === "Delivered" ? "bg-success" : "bg-primary"} px-3 py-2 rounded-pill`}>
                            {order.status || "Processing"}
                          </span>
                          <small className="text-muted">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </small>
                        </div>
                      </div>

                      <div className="mt-2">
                        <h6 className="fw-bold mb-2">Products:</h6>
                        <div className="d-flex flex-column gap-2">
                          {order.products?.map((p) => (
                            <div
                              key={p._id}
                              className="d-flex align-items-center gap-3 bg-white p-2 rounded border"
                            >
                              <img
                                src={p.image}
                                alt={p.name}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "contain",
                                  borderRadius: "6px",
                                }}
                              />
                              <div className="flex-grow-1">
                                <p className="fw-semibold mb-0">{p.name}</p>
                                <small className="text-muted">
                                  Price: <span className="text-success fw-bold">${p.price}</span> | Qty: {p.qty || 1}
                                </small>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyOrders;
