import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const location = useLocation();
  const dropRef = useRef(null);
  const learnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setProductsOpen(false);
    setLearnOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setProductsOpen(false);
      if (learnRef.current && !learnRef.current.contains(e.target)) setLearnOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="nav-logo">OVAL<span>.</span></Link>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>

          {/* Products dropdown */}
          <div className="nav-dropdown" ref={dropRef}>
            <button className="nav-link nav-dropdown__trigger" onClick={() => { setProductsOpen(p => !p); setLearnOpen(false); }} aria-expanded={productsOpen}>
              Products <ChevronDown size={14} className={`nav-dropdown__chevron ${productsOpen ? 'open' : ''}`} />
            </button>
            <div className={`nav-dropdown__menu ${productsOpen ? 'open' : ''}`}>
              <Link to="/products" className="nav-dropdown__item nav-dropdown__item--label">All Products</Link>
              <Link to="/products/chicks" className="nav-dropdown__item">🐣 Day-Old Chicks</Link>
              <Link to="/products/feeds" className="nav-dropdown__item">🌾 Poultry Feeds</Link>
              <Link to="/products/equipment" className="nav-dropdown__item">🔧 Farm Equipment</Link>
            </div>
          </div>

          {/* Learning Hub dropdown */}
          <div className="nav-dropdown" ref={learnRef}>
            <button className="nav-link nav-dropdown__trigger" onClick={() => { setLearnOpen(l => !l); setProductsOpen(false); }} aria-expanded={learnOpen}>
              Learning Hub <ChevronDown size={14} className={`nav-dropdown__chevron ${learnOpen ? 'open' : ''}`} />
            </button>
            <div className={`nav-dropdown__menu nav-dropdown__menu--wide ${learnOpen ? 'open' : ''}`}>
              <span className="nav-dropdown__item nav-dropdown__item--label">Farmer Guides</span>
              <Link to="/learn/vaccination" className="nav-dropdown__item">💉 Vaccination Programme</Link>
              <Link to="/learn/biosecurity" className="nav-dropdown__item">🛡 Biosecurity & Hygiene</Link>
              <Link to="/learn/brooding" className="nav-dropdown__item">🌡 Brooding Management</Link>
              <Link to="/learn/health" className="nav-dropdown__item">❤️ Health Management</Link>
            </div>
          </div>

          <Link to="/checkout" className="nav-link">Orders</Link>
        </div>

        <div className="nav-right">
          <Link to="/checkout" className="nav-cta btn btn-solid">Book Now</Link>
          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={22} color="var(--text)" /> : <Menu size={22} color="var(--text)" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
