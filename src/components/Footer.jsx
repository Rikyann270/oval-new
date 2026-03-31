import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container footer__grid">
      <div className="footer__brand">
        <Link to="/" className="footer__logo">Oval<span>.</span></Link>
        <p className="footer__tagline">Farm for the Best With us.</p>
        <p className="footer__contact-item">+256 539 802 &nbsp;|&nbsp; +256 530 002</p>
        <p className="footer__contact-item">info@ovalfarm.com</p>
      </div>

      <div className="footer__col">
        <h4>Products</h4>
        <Link to="/products/chicks">Day-Old Chicks</Link>
        <Link to="/products/feeds">Nutritious Feeds</Link>
        <Link to="/products/equipment">Farm Equipment</Link>
        <Link to="/products">Full Catalog</Link>
      </div>

      <div className="footer__col">
        <h4>Learning Hub</h4>
        <Link to="/learn/vaccination">Vaccination Guide</Link>
        <Link to="/learn/biosecurity">Biosecurity & Hygiene</Link>
        <Link to="/learn/brooding">Brooding Management</Link>
        <Link to="/learn/health">Health Management</Link>
      </div>

      <div className="footer__col">
        <h4>Company</h4>
        <Link to="/">Home</Link>
        <Link to="/#story">Our Story</Link>
        <Link to="/checkout">Book / Order</Link>
        <Link to="/contact">Contact Support</Link>
      </div>
    </div>

    <div className="footer__bottom">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Oval Farm. All Rights Reserved. &nbsp;&nbsp; <em>Farm for the Best.</em></p>
      </div>
    </div>
  </footer>
);

export default Footer;
