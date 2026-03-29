import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CallToAction.css';

const CallToAction = () => (
  <section className="cta">
    <motion.div
      className="cta__inner container"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
    >
      <span className="label cta__label">Ready to elevate your farm?</span>
      <h2 className="display-lg cta__title">
        The best flock<br /><em>starts here.</em>
      </h2>
      <p className="body-lg cta__sub">
        Browse our full catalog of premium chicks, feeds, and equipment — then place your order in minutes.
      </p>
      <div className="cta__actions">
        <Link to="/products" className="btn btn-rust">Shop All Products</Link>
        <Link to="/checkout" className="btn btn-ghost cta__ghost">Book a Delivery</Link>
      </div>
    </motion.div>
    <div className="cta__bg" />
  </section>
);

export default CallToAction;
