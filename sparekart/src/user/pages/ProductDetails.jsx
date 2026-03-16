import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../css/ProductDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import products from "../../data/productsData";

function ProductDetails({ addToCart, cartCount }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <>
        <Navbar cartCount={cartCount} />
        <div className="pd-page"><p>Product not found.</p></div>
        <Footer />
      </>
    );
  }

  // Add to Cart — adds to cart state and stays on page
  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
  };

  // Buy Now — does NOT touch the cart, goes directly to checkout
  // with only this product passed via navigation state
  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        buyNowItems: [{ ...product, qty }],
      },
    });
  };

  return (
    <>
      <Navbar cartCount={cartCount} />

      <div className="pd-page">

        <span className="pd-back" onClick={() => navigate(-1)}>← Back</span>

        <div className="pd-layout">

          <div className="pd-image-box">
            <img src={product.img} alt={product.name} className="pd-image" />
          </div>

          <div className="pd-info">
            <span className="pd-badge">{product.category}</span>
            <h2 className="pd-name">{product.name}</h2>

            <div className="pd-price-row">
              <span className="pd-price">₹{product.price}</span>
              <span className="pd-stock">In Stock ({product.stock})</span>
            </div>

            <hr className="pd-divider" />

            <p className="pd-desc-label">Description</p>
            <p className="pd-desc">{product.desc}</p>

            <hr className="pd-divider" />

            <p className="pd-qty-label">Quantity</p>
            <div className="pd-qty-row">
              <button className="pd-qty-btn" onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>−</button>
              <span className="pd-qty-num">{qty}</span>
              <button className="pd-qty-btn" onClick={() => setQty(qty + 1)}>+</button>
            </div>

            <div className="pd-btn-row">
              <button className="pd-add-btn" onClick={handleAddToCart}>
                🛒 Add to Cart
              </button>
              <button className="pd-buy-btn" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;