import React from 'react';
import { motion } from 'framer-motion';
import './Stats.css';

// Botanical line-art SVG icons matching the screenshot style
const IconMoney = () => (
  <svg width="70" height="70" viewBox="0 0 70 70" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="35" cy="32" r="14"/>
    <path d="M35 22v20M30 27h8a4 4 0 010 8h-6a4 4 0 000 8h8"/>
    <path d="M18 55 Q25 58 35 56 Q45 54 52 57"/>
    <path d="M14 58 Q22 62 35 60 Q48 58 56 62"/>
    <path d="M10 61 Q20 66 35 64 Q50 62 60 66"/>
  </svg>
);

const IconChick = () => (
  <svg width="70" height="70" viewBox="0 0 70 70" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="35" cy="40" rx="18" ry="16"/>
    <circle cx="35" cy="22" r="10"/>
    <path d="M30 21 L26 16 M35 18 L35 12 M40 21 L44 16"/>
    <path d="M28 41 L22 52 M42 41 L48 52"/>
    <path d="M31 25 Q35 28 39 25"/>
    <circle cx="31" cy="22" r="1.5" fill="rgba(255,255,255,0.85)"/>
    <circle cx="39" cy="22" r="1.5" fill="rgba(255,255,255,0.85)"/>
  </svg>
);

const IconPlant = () => (
  <svg width="70" height="70" viewBox="0 0 70 70" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M35 65 V30"/>
    <path d="M35 45 Q20 38 18 22 Q30 20 38 35"/>
    <path d="M35 35 Q50 28 52 12 Q40 10 32 25"/>
    <path d="M28 65 Q35 62 42 65"/>
  </svg>
);

const IconEquip = () => (
  <svg width="70" height="70" viewBox="0 0 70 70" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="15" y="25" width="40" height="28" rx="3"/>
    <path d="M25 25 V18 H45 V25"/>
    <path d="M15 38 H55"/>
    <circle cx="28" cy="32" r="3"/>
    <circle cx="42" cy="32" r="3"/>
    <circle cx="28" cy="44" r="3"/>
    <circle cx="42" cy="44" r="3"/>
    <path d="M12 53 H58"/>
  </svg>
);

const stats = [
  { icon: <IconChick />, num: '10K+',  label: 'Chicks Monthly',  sub: 'Delivered farm-to-farm', variant: 'brown' },
  { icon: <IconPlant />, num: '500+',  label: 'Farms Served',    sub: 'Across East Africa',     variant: 'olive' },
  { icon: <IconEquip />, num: '100%',  label: 'Quality Checked', sub: 'Every order, every time', variant: 'mustard' },
];

const Stats = () => (
  <section className="stats section--tight">
    <div className="container">
      <div className="stats__header">
        <span className="overline">The Numbers</span>
        <div className="rule" />
      </div>
      <div className="stats__grid">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className={`stat-card stat-card--${s.variant}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <div className="stat-card__icon">{s.icon}</div>
            <span className="stat-card__num">{s.num}</span>
            <span className="stat-card__label">{s.label}</span>
            <span className="stats__sub">{s.sub}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
