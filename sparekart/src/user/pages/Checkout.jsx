import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../css/Checkout.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Checkout({ cart, cartCount, addOrder }) {
  const navigate = useNavigate();
  const location = useLocation();

  // If came from Buy Now → show only that product
  // If came from Cart → show all cart items
  const buyNowItems = location.state?.buyNowItems || null;
  const checkoutItems = buyNowItems || cart;

  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.qty, 0
  );

  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", payment: "COD",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let e = {};
    if (!form.name)    e.name    = "Name is required";
    if (!form.email)   e.email   = "Email is required";
    if (!form.phone)   e.phone   = "Phone is required";
    if (!form.address) e.address = "Address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = () => {
    if (!validate()) return;

    const order = {
      id: "ORD" + Math.floor(Math.random() * 9000 + 1000),
      date: new Date().toISOString().split("T")[0],
      address: form.address,
      paymentMethod: form.payment === "COD" ? "Cash on Delivery" : "Online Payment",
      status: "Processing",
      payment: "Payment Pending",
      products: checkoutItems.map((item) => ({
        name: item.name,
        price: item.price,
        qty: item.qty,
        img: item.img,
      })),
    };

    addOrder(order);
    navigate("/orders");
  };

  return (
    <>
      <Navbar cartCount={cartCount} />

      <div className="co-page">
        <h2 className="co-title">Checkout</h2>

        <div className="co-layout">

          {/* ── LEFT ── */}
          <div className="co-left">

            <div className="co-section">
              <h4 className="co-section-title">✉ Contact Information</h4>

              <div className="co-field">
                <label className="co-label">Full Name *</label>
                <input
                  className={`co-input ${errors.name ? "co-input-error" : ""}`}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && <p className="co-error">{errors.name}</p>}
              </div>

              <div className="co-field">
                <label className="co-label">Email Address *</label>
                <input
                  className={`co-input ${errors.email ? "co-input-error" : ""}`}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && <p className="co-error">{errors.email}</p>}
              </div>

              <div className="co-field">
                <label className="co-label">Phone Number *</label>
                <input
                  className={`co-input ${errors.phone ? "co-input-error" : ""}`}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                {errors.phone && <p className="co-error">{errors.phone}</p>}
              </div>
            </div>

            <div className="co-section">
              <h4 className="co-section-title">📍 Shipping Address</h4>
              <div className="co-field">
                <label className="co-label">Complete Address *</label>
                <textarea
                  className={`co-textarea ${errors.address ? "co-input-error" : ""}`}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
                {errors.address && <p className="co-error">{errors.address}</p>}
              </div>
            </div>

            <div className="co-section">
              <h4 className="co-section-title">💳 Payment Method</h4>

              <div
                className={`co-payment-box ${form.payment === "COD" ? "co-payment-active" : ""}`}
                onClick={() => setForm({ ...form, payment: "COD" })}
              >
                <input type="radio" className="co-radio" checked={form.payment === "COD"} onChange={() => {}} />
                <div>
                  <p className="co-payment-title">Cash on Delivery</p>
                  <p className="co-payment-sub">Pay when you receive your order</p>
                </div>
              </div>

              <div
                className={`co-payment-box ${form.payment === "Online" ? "co-payment-active" : ""}`}
                onClick={() => setForm({ ...form, payment: "Online" })}
              >
                <input type="radio" className="co-radio" checked={form.payment === "Online"} onChange={() => {}} />
                <div>
                  <p className="co-payment-title">Online Payment</p>
                  <p className="co-payment-sub">UPI, Credit/Debit Cards, Net Banking</p>
                </div>
              </div>
            </div>

          </div>

          {/* ── RIGHT ── */}
          <div className="co-right">
            <h4 className="co-summary-title">Order Summary</h4>

            {/* Product-wise summary with image */}
            <div className="co-product-list">
              {checkoutItems.map((item, i) => (
                <div className="co-product-row" key={i}>
                  <img src={item.img} alt={item.name} className="co-product-img" />
                  <div className="co-product-info">
                    <p className="co-product-name">{item.name}</p>
                    <p className="co-product-qty">Qty: {item.qty}</p>
                  </div>
                  <p className="co-product-price">
                    ₹{(item.price * item.qty).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="co-summary-divider" />

            <div className="co-summary-row">
              <span className="co-summary-label">Subtotal</span>
              <span className="co-summary-val">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="co-summary-row">
              <span className="co-summary-label">Shipping</span>
              <span className="co-summary-free">Free</span>
            </div>

            <div className="co-summary-divider" />

            <div className="co-summary-row co-summary-total">
              <span>Total</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>

            <button className="co-place-btn" onClick={placeOrder}>
              Place Order
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;