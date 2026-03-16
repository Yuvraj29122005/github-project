import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../css/Orders.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders({ orders, clearOrders, cartCount }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  // ── ORDER DETAILS VIEW ──
  if (selectedOrder) {
    const total = selectedOrder.products.reduce(
      (sum, p) => sum + p.price * p.qty, 0
    );

    return (
      <>
        <Navbar cartCount={cartCount} />

        <div className="orders-page">
          <span className="orders-back" onClick={() => setSelectedOrder(null)}>
            ← Back to Orders
          </span>

          <h2 className="orders-title">Order Details</h2>

          <div className="od-card">

            <div className="od-header">
              <div>
                <p className="od-id-label">Order ID</p>
                <p className="od-id">{selectedOrder.id}</p>
              </div>
              <div className="od-badges">
                <span className="badge processing">{selectedOrder.status}</span>
                <span className="badge pending">{selectedOrder.payment}</span>
              </div>
            </div>

            <hr className="od-divider" />

            <div className="od-info-row">
              <div className="od-info-item">
                <span className="od-info-label">📅 Order Date</span>
                <span className="od-info-val">{selectedOrder.date}</span>
              </div>
              <div className="od-info-item">
                <span className="od-info-label">📍 Shipping Address</span>
                <span className="od-info-val">{selectedOrder.address}</span>
              </div>
              <div className="od-info-item">
                <span className="od-info-label">💳 Payment</span>
                <span className="od-info-val">{selectedOrder.paymentMethod}</span>
              </div>
            </div>

            <hr className="od-divider" />

            <p className="od-products-label">Ordered Products</p>

            <div className="od-products-list">
              {selectedOrder.products.map((p, i) => (
                <div className="od-product-row" key={i}>
                  <img src={p.img} alt={p.name} className="od-product-img" />
                  <div className="od-product-info">
                    <p className="od-product-name">{p.name}</p>
                    <p className="od-product-qty">Qty: {p.qty}</p>
                  </div>
                  <p className="od-product-price">₹{(p.price * p.qty).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <hr className="od-divider" />

            <div className="od-total-row">
              <span className="od-total-label">Total</span>
              <span className="od-total-val">₹{total.toLocaleString()}</span>
            </div>

          </div>
        </div>

        <Footer />
      </>
    );
  }

  // ── MY ORDERS LIST VIEW ──
  return (
    <>
      <Navbar cartCount={cartCount} />

      <div className="orders-page">

        <div className="orders-header-row">
          <h2 className="orders-title">My Orders</h2>
          {orders.length > 0 && (
            <button className="clear-orders-btn" onClick={clearOrders}>
              🗑 Clear Order History
            </button>
          )}
        </div>

        {/* Empty state */}
        {orders.length === 0 ? (
          <div className="orders-empty">
            <div className="orders-empty-icon">📋</div>
            <h3>No Orders Yet</h3>
            <p>You haven't placed any orders. Start shopping!</p>
            <button className="orders-shop-btn" onClick={() => navigate("/products")}>
              Browse Products
            </button>
          </div>
        ) : (

          <div className="orders-list">
            {orders.map((order) => {
              const total = order.products.reduce((sum, p) => sum + p.price * p.qty, 0);
              return (
                <div className="order-card" key={order.id}>

                  <div className="order-card-top">
                    <div className="order-id-box">
                      <span className="order-id-icon">📦</span>
                      <div>
                        <p className="order-id-label">Order ID</p>
                        <p className="order-id">{order.id}</p>
                      </div>
                    </div>
                    <div className="order-badges">
                      <span className="badge processing">{order.status}</span>
                      <span className="badge pending">{order.payment}</span>
                    </div>
                  </div>

                  <div className="order-card-info">
                    <div className="order-info-item">
                      <span className="order-info-icon">📅</span>
                      <div>
                        <p className="order-info-label">Order Date</p>
                        <p className="order-info-val">{order.date}</p>
                      </div>
                    </div>
                    <div className="order-info-item">
                      <span className="order-info-icon">💰</span>
                      <div>
                        <p className="order-info-label">Total Amount</p>
                        <p className="order-info-val">₹{total.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="order-info-item">
                      <span className="order-info-icon">📦</span>
                      <div>
                        <p className="order-info-label">Items</p>
                        <p className="order-info-val">{order.products.length} item(s)</p>
                      </div>
                    </div>
                  </div>

                  <div className="order-address-row">
                    <span className="order-info-icon">📍</span>
                    <p className="order-address">{order.address}</p>
                  </div>

                  <div className="order-card-footer">
                    <span className="order-view-link" onClick={() => setSelectedOrder(order)}>
                      → View Order Details
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Orders;