import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    productType: 'chicks',
    quantity: '',
    notes: ''
  });
  
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const product = params.get('product');
    if (product) {
      setFormData(prev => ({ ...prev, productType: product }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your order! Our team will contact you shortly to confirm delivery.');
    setFormData({
      name: '', phone: '', address: '', productType: 'chicks', quantity: '', notes: ''
    });
  };

  return (
    <main className="page-wrapper">
      <section className="checkout-section section-padding">
        <div className="container checkout-container">
          <motion.div 
            className="checkout-header text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-overline">Secure Booking</span>
            <h2>Confirm Your Order.</h2>
            <p className="checkout-subtitle">Fill out the details below so we can process your order and prepare it for delivery.</p>
          </motion.div>

          <motion.div 
            className="checkout-form-wrapper"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. John Doe" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+256..." />
                </div>
              </div>

              <div className="form-group">
                <label>Delivery Address / Farm Location</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="District, Subcounty, Village..." />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Product Category</label>
                  <select name="productType" value={formData.productType} onChange={handleChange} required>
                    <option value="chicks">Premium Chicks</option>
                    <option value="feeds">Nutritious Feeds</option>
                    <option value="equipment">Standard Equipment</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Quantity / Amount</label>
                  <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} required placeholder="e.g. 500 birds, 10 bags..." />
                </div>
              </div>

              <div className="form-group">
                <label>Additional Notes (Optional)</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} rows="4" placeholder="Any specific breed or equipment requests?" />
              </div>

              <button type="submit" className="btn btn-primary submit-btn">
                Place Order <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default CheckoutPage;
