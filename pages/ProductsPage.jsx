import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Bird, Package, Wrench } from 'lucide-react';
import './ProductsPage.css';

const products = [
  {
    id: 'chicks',
    icon: <Bird size={28} />,
    category: 'Day-old Chicks',
    title: 'Bred for Peak Performance',
    heroImg: 'https://images.unsplash.com/photo-1548509925-0e784d1db4fa?auto=format&fit=crop&w=900&q=80',
    desc: 'Our chicks come from certified hatcheries selected for superior genetics — faster growth, stronger immunity, and exceptional feed conversion.',
    breeds: [
      { name: 'Broiler', detail: 'Ready in 6 weeks · High meat yield' },
      { name: 'Kuroiler', detail: 'Dual-purpose · Hardier environment' },
      { name: 'Layer', detail: 'High egg production · Consistent yield' },
    ],
    cta: 'Order Chicks',
  },
  {
    id: 'feeds',
    icon: <Package size={28} />,
    category: 'Poultry Feeds',
    title: 'Nutritious Formulations',
    heroImg: 'https://images.unsplash.com/photo-1595185966453-159670f80bc2?auto=format&fit=crop&w=900&q=80',
    desc: 'Transform your farm with our top-notch feed choices. Engineered to maximize weight gain and health at every stage of the life cycle.',
    breeds: [
      { name: 'Starter Crumbles',  detail: 'High protein for early development' },
      { name: 'Grower Mash',       detail: 'Balanced nutrition for growth' },
      { name: 'Finisher Pellets',  detail: 'Optimized for final weight gain' },
    ],
    cta: 'Order Feeds',
  },
  {
    id: 'equipment',
    icon: <Wrench size={28} />,
    category: 'Farm Equipment',
    title: 'Standard Essentials',
    heroImg: 'https://images.unsplash.com/photo-1592323714571-06173004bb71?auto=format&fit=crop&w=900&q=80',
    desc: 'Enhance your operations with our precision tools. Built for durability and ease of use in diverse farming environments.',
    breeds: [
      { name: 'Feeders',    detail: 'Automatic and manual systems' },
      { name: 'Drinkers',   detail: 'Hygienic nipple and bell styles' },
      { name: 'Incubators', detail: 'Climate controlled for high yield' },
    ],
    cta: 'Order Equipment',
  },
];

const ProductsPage = () => {
  return (
    <main className="products-page">
      <section className="products-page__hero">
        <div className="container products-page__hero-content">
          <motion.span
            className="overline"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Our Full Catalog
          </motion.span>
          <motion.h1
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            Everything your<br /><em>farm needs.</em>
          </motion.h1>
          <motion.p
            className="body-text products-page__hero-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            Browse our three product lines, each rigorously selected for quality and performance.
          </motion.p>
        </div>
        <div className="products-page__hero-bg" />
      </section>

      {products.map((p, idx) => (
        <section
          key={p.id}
          className={`product-section ${idx % 2 !== 0 ? 'product-section--alt' : ''}`}
        >
          <motion.div
            className="product-section__img-wrap"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1 }}
          >
            <img src={p.heroImg} alt={p.title} />
          </motion.div>

          <motion.div
            className="product-section__text"
            initial={{ opacity: 0, x: idx % 2 !== 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <span className="overline">{p.category}</span>
            <div className="rule" />
            <h2 className="section-title">{p.title}</h2>
            <p className="body-text">{p.desc}</p>

            <ul className="product-section__list">
              {p.breeds.map((b) => (
                <li key={b.name}>
                  <strong>{b.name}</strong>
                  <span>{b.detail}</span>
                </li>
              ))}
            </ul>

            <Link to={`/checkout?product=${p.id}`} className="btn btn-solid">
              {p.cta} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </section>
      ))}
    </main>
  );
};

export default ProductsPage;
