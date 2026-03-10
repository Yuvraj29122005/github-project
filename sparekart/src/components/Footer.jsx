import { Link } from "react-router-dom";
import "./layout.css";

function Footer() {
  return (
    <div className="footer">

      <div className="footer-grid">

        {/* ABOUT */}
        <div>
          <h4>
            About 
            <span className="brand-blue"> Spare</span>
            <span className="brand-orange">Kart</span>
          </h4>

          <p>
            Spare Kart is an online store providing quality
            car spare parts at affordable prices with
            fast, reliable service.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4>Quick Links</h4>
          <p><Link to="/home" className="footer-link">Home</Link></p>
          <p><Link to="/products" className="footer-link">Products</Link></p>
          <p><Link to="/orders" className="footer-link">Orders</Link></p>
          <p><Link to="/feedback" className="footer-link">Feedback</Link></p>
        </div>

        {/* SUPPORT */}
        <div>
          <h4>Support</h4>
          <p>support@sparekart.com</p>
          <p>+91 81403 51044</p>
        </div>

        {/* SOCIAL */}
        <div>
          <h4>Follow Us</h4>
          <p>Facebook | Twitter | Instagram | LinkedIn</p>
        </div>

      </div>

      <div className="copyright">
        © 2026 
        <span className="brand-blue"> Spare</span>
        <span className="brand-orange">Kart</span> 
        Car Parts. All rights reserved.
      </div>

    </div>
  );
}

export default Footer;
