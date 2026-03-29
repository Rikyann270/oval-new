import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './About.css';

const panels = [
  {
    num: '01',
    eyebrow: 'Who We Are',
    title: 'Born from a Passion for the Land.',
    body: 'At Oval, we started with a simple belief — that every farmer deserves access to the very best. We specialize in premium day-old chicks, scientific-grade poultry feeds, and precision farming equipment. Everything to give your flock the ultimate advantage.',
    img: 'hero_chicken.jpg', // Using the farm imagery correctly
  },
  {
    num: '02',
    eyebrow: 'Our Promise',
    title: 'Quality Guaranteed, Every Time.',
    body: 'Every product that leaves Oval is inspected and vetted. Our chicks are sourced from certified hatcheries, our feeds formulated for peak growth and immunity, and our equipment tested for durability in real East African farm conditions.',
    img: '1154.jpg',
  },
  {
    num: '03',
    eyebrow: 'Our Reach',
    title: 'From Our Farm to Yours.',
    body: 'We have served over 500 farms across the region. Booking is simple — by phone or online — and we\'ll deliver directly to your farm gate. Because access to excellence should never be complicated.',
    img: '.Chicken products flat set.jpg',
  },
];

const About = () => (
  <section id="story" className="about">
    {panels.map((p, i) => (
      <div key={i} className={`about__block ${i % 2 !== 0 ? 'about__block--alt' : ''}`}>
        {/* Ghost chapter number */}
        <span className="ghost-number about__ghost">{p.num}</span>

        {/* Botanical flourish - Updated strokes for light mode */}
        <div className="about__botanical" aria-hidden="true">
          <svg viewBox="0 0 300 80" fill="none" stroke="rgba(21,24,16,0.2)" strokeWidth="1.2" strokeLinecap="round">
            <path d="M40 75 Q38 50 42 25 Q44 8 40 2" /><circle cx="40" cy="5" r="5" />
            <path d="M70 75 Q72 48 66 28 Q64 12 70 4" /><ellipse cx="68" cy="8" rx="4" ry="7" transform="rotate(-20 68 8)" />
            <path d="M150 75 Q148 45 152 20" />
            <ellipse cx="148" cy="14" rx="4" ry="8" transform="rotate(-40 148 14)" />
            <ellipse cx="154" cy="14" rx="4" ry="8" transform="rotate(40 154 14)" />
            <circle cx="150" cy="8" r="4" />
            <path d="M230 75 Q228 50 232 25" /><ellipse cx="230" cy="20" rx="5" ry="9" transform="rotate(15 230 20)" />
            <path d="M260 75 Q258 52 262 30 Q264 12 259 3" /><circle cx="259" cy="6" r="5" />
            <path d="M0 78 Q80 74 150 76 Q220 78 300 74" strokeDasharray="4 3" />
          </svg>
        </div>

        <div className="about__content container">
          <motion.div
            className="about__text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <span className="overline">{p.eyebrow}</span>
            <div className="rule" />
            <h2 className="section-title about__title">{p.title}</h2>
            <p className="body-text">{p.body}</p>
          </motion.div>

          <motion.div
            className="about__img-wrap"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            <img src={p.img} alt={p.eyebrow} />
          </motion.div>
        </div>

        {/* Wave divider between blocks - Transitioning between bg colors */}
        {i < panels.length - 1 && (
          <div className="about__wave" aria-hidden="true">
            <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d={i % 2 === 0
                  ? "M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z"
                  : "M0,20 C360,0 720,50 1080,20 C1260,5 1380,40 1440,20 L1440,60 L0,60 Z"}
                fill={i % 2 === 0 ? '#ede5cc' : '#fdfaf2'}
              />
            </svg>
          </div>
        )}
      </div>
    ))}

    <div className="about__cta container">
      <Link to="/products" className="btn btn-solid">Browse All Products</Link>
    </div>
  </section>
);

export default About;
