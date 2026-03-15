import AdminLayout from "./Adminlayout";
import "../css/Admindashboard.css";

// Static dashboard data
const stats = [
  {
    label: "Total Products",
    value: 8,
    sub: "3 low stock",
    icon: "📦",
    color: "#4f46e5",
    bg: "#ede9fe",
  },
  {
    label: "Total Orders",
    value: 2,
    sub: "1 completed",
    icon: "🧾",
    color: "#16a34a",
    bg: "#dcfce7",
  },
  {
    label: "Total Users",
    value: 2,
    sub: "2 active",
    icon: "👥",
    color: "#9333ea",
    bg: "#f3e8ff",
  },
  {
    label: "Total Revenue",
    value: "₹5,498",
    sub: "From completed orders",
    icon: "💰",
    color: "#ea580c",
    bg: "#ffedd5",
  },
];

const orderStatus = [
  { label: "Completed", count: 1, color: "#16a34a" },
  { label: "Pending",   count: 1, color: "#f59e0b" },
  { label: "Failed",    count: 0, color: "#ef4444" },
];

const categoryData = [
  { label: "Engine",      count: 2 },
  { label: "Brakes",      count: 2 },
  { label: "Tyres",       count: 1 },
  { label: "Lights",      count: 2 },
  { label: "Accessories", count: 1 },
];

function AdminDashboard() {
  return (
    <AdminLayout>

      {/* ── Page Header ── */}
      <div className="dash-header">
        <h2 className="dash-title">Dashboard</h2>
        <p className="dash-sub">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="dash-stats">
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-text">
              <p className="stat-label">{s.label}</p>
              <h3 className="stat-value">{s.value}</h3>
              <p className="stat-sub">{s.sub}</p>
            </div>
            <div className="stat-icon" style={{ background: s.bg, color: s.color }}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom Row ── */}
      <div className="dash-bottom">

        {/* Low Stock Alert */}
        <div className="dash-card low-stock-card">
          <h4 className="card-title">⚠ Low Stock Alert</h4>
          <div className="low-stock-empty">
            <span className="low-stock-icon">📈</span>
            <p>All products well stocked!</p>
          </div>
        </div>

        {/* Right column */}
        <div className="dash-right-col">

          {/* Order Status */}
          <div className="dash-card">
            <h4 className="card-title">Order Status</h4>
            <div className="order-status-list">
              {orderStatus.map((o, i) => (
                <div className="order-status-row" key={i}>
                  <div className="order-status-left">
                    <span className="order-dot" style={{ background: o.color }} />
                    <span className="order-status-label">{o.label}</span>
                  </div>
                  <span className="order-status-count">{o.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Products by Category */}
          <div className="dash-card">
            <h4 className="card-title">Products by Category</h4>
            <div className="category-list">
              {categoryData.map((c, i) => (
                <div className="category-row" key={i}>
                  <span className="category-label">{c.label}</span>
                  <span className="category-count">{c.count}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </AdminLayout>
  );
}

export default AdminDashboard;