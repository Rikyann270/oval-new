import React from 'react';
import { motion } from 'framer-motion';
import './Testimonials.css';

const quotes = [
  {
    text: 'Oval chicks have consistently shown the fastest growth rates I have seen. My broiler farm profit doubled in one season.',
    author: 'James Mugisha',
    role: 'Broiler Farmer, Wakiso',
  },
  {
    text: "The feeds are top-notch. I switched from my old supplier and the difference in feed conversion was immediately obvious.",
    author: 'Grace Namubiru',
    role: 'Commercial Layer Farmer, Jinja',
  },
  {
    text: 'From ordering to delivery at my farm gate — everything was seamless. Oval runs a very professional show.',
    author: 'David Opiyo',
    role: 'Poultry Entrepreneur, Gulu',
  },
];

const Testimonials = () => (
  <section className="testimonials section">
    <div className="container">
      <div className="testimonials__header">
        <span className="label">What Farmers Say</span>
        <div className="divider" />
        <h2 className="display-md">Trusted by<br /><em>real farmers.</em></h2>
      </div>

      <div className="testimonials__grid">
        {quotes.map((q, i) => (
          <motion.blockquote
            key={i}
            className="testimonials__card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, delay: i * 0.15 }}
          >
            <span className="testimonials__quote-mark">&ldquo;</span>
            <p className="testimonials__text">{q.text}</p>
            <footer className="testimonials__footer">
              <strong>{q.author}</strong>
              <span>{q.role}</span>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
