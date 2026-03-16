import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import products from "../../data/productsData";
import homeBg from "../../images/home.png";

function Home({ addToCart, cartCount }) {
  const navigate = useNavigate();

  return (
    <>
      <Navbar cartCount={cartCount} />

      {/* ── Hero ── */}
      <div className="hero">
        <img src={homeBg} alt="SpareKart" className="hero-img" />
      </div>

      {/* ── Featured Products ── */}
      <div className="products-section">
        <h3 className="section-title">Featured Products</h3>

        <div className="products-grid">
          {products.slice(0, 6).map((p) => (
            <div
              key={p.id}
              className="product-card"
              onClick={() => navigate(`/product/${p.id}`)}
            >
              <img src={p.img} alt={p.name} className="product-img" />

              <div className="product-body">
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
              </div>

              <div className="product-footer">
                <span className="price">₹{p.price}</span>
                <button
                  className="btn-add"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p);
                    alert(`${p.name} added to cart!`);
                  }}
                >
                  🛒 Add
                </button>
              </div>

            </div>
          ))}
        </div>

        <div className="view-all-row">
          <button className="btn-view-all" onClick={() => navigate("/products")}>
            View All Products
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;