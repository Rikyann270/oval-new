import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './Products.css';

const productCategories = [
  {
    id: 'chicks',
    title: 'Premium Chicks',
    description: 'Day-old chicks featuring faster growth and stronger immunity. We offer hybrid, local, and exotic breeds perfect for your farm.',
    image: 'https://images.unsplash.com/photo-1548509925-0e784d1db4fa?auto=format&fit=crop&q=80',
    tags: ['Broiler', 'Kuroiler', 'Layer']
  },
  {
    id: 'feeds',
    title: 'Nutritious Feeds',
    description: 'Transform your farm with our top-notch, protein-rich feed choices. Discover the amazing results and take your poultry business to new levels.',
    image: 'https://images.unsplash.com/photo-1595185966453-159670f80bc2?auto=format&fit=crop&q=80',
    tags: ['Growth Booster', 'Protein']
  },
  {
    id: 'equipment',
    title: 'Standard Equipment',
    description: 'Enhance your poultry operations seamlessly with our standard farming essentials and premium tools for unparalleled efficiency.',
    image: 'https://images.unsplash.com/photo-1592323714571-06173004bb71?auto=format&fit=crop&q=80',
    tags: ['Precision Feeders', 'Waterers']
  }
];

const Products = () => {
  return (
    <section id="products" className="products-section section-padding">
      <div className="container">
        <div className="products-header text-center">
          <span className="text-overline">What We Offer</span>
          <h2>Farm Essentials.</h2>
          <p className="products-subtitle">Discover our selection of premium poultry products designed for excellence.</p>
        </div>
        
        <div className="products-grid">
          {productCategories.map((product, index) => (
            <motion.div 
              className="product-card" 
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="product-image-container">
                <img src={product.image} alt={product.title} className="product-image" />
              </div>
              <div className="product-content">
                <div className="product-tags">
                  {product.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <button className="btn btn-outline product-btn">
                  Order Now <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
