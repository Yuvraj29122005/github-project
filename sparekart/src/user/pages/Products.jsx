import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../css/Products.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../../data/productsData";

function Products({ addToCart, cartCount }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Engine", "Brakes", "Tyres", "Lights", "Accessories"];

  const filtered = products.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <Navbar cartCount={cartCount} />

      <div className="products-page">

        <h2 className="page-title">Our Products</h2>

        <div className="products-layout">

          {/* ── LEFT SIDEBAR ── */}
          <div className="filter-box">

            <p className="filter-heading">☰ Filters</p>

            <label className="filter-label">Search</label>
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input
                className="filter-input"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <label className="filter-label">Category</label>
            <select
              className="filter-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Categories" : c}
                </option>
              ))}
            </select>

          </div>

          {/* ── RIGHT GRID ── */}
          <div className="products-grid-wrap">

            <p className="results-count">
              Showing {filtered.length} product(s)
            </p>

            {filtered.length === 0 ? (
              <p className="no-results">No products found.</p>
            ) : (
              <div className="products-grid">
                {filtered.map((p) => (
                  <div
                    key={p.id}
                    className="product-card"
                    onClick={() => navigate(`/product/${p.id}`)}
                  >
                    <img src={p.img} alt={p.name} />
                    <div className="card-body">
                      <h4>{p.name}</h4>
                      <p className="desc">{p.desc}</p>
                      <div className="card-bottom">
                        <span className="price">₹{p.price}</span>
                        <button
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
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Products;