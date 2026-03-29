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
        <Link to="/products">Premium Chicks</Link>
        <Link to="/products">Nutritious Feeds</Link>
        <Link to="/products">Farm Equipment</Link>
      </div>

      <div className="footer__col">
        <h4>Company</h4>
        <Link to="/">Home</Link>
        <Link to="/#story">Our Story</Link>
        <Link to="/checkout">Book / Order</Link>
      </div>

      <div className="footer__col">
        <h4>Partnerships</h4>
        <p>Retail</p>
        <p>Wholesale</p>
        <p>Inquiries</p>
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
