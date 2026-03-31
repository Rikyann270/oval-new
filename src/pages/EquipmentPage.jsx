import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Settings, Truck, HeadphonesIcon } from 'lucide-react';
import './EquipmentPage.css';

const equipment = [
  {
    name: 'Automatic Feeders',
    tag: 'Feeding Systems',
    img: 'https://images.unsplash.com/photo-1592323714571-06173004bb71?auto=format&fit=crop&w=600&q=80',
    desc: 'Pan and tube feeder systems engineered for minimal feed wastage, even distribution, and easy height adjustment as birds grow.',
    specs: ['Adjustable height', 'Anti-spillage design', 'UV-resistant plastic', 'Stackable for transport'],
    color: '#c0543e',
  },
  {
    name: 'Bell Drinkers',
    tag: 'Watering Systems',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    desc: 'Gravity-fed bell drinkers provide a constant supply of clean, fresh water — with sealed reservoirs to prevent contamination.',
    specs: ['Anti-leak valve', 'Easy disinfection', '5L & 10L capacities', 'Stainless fittings'],
    color: '#5a6e3a',
  },
  {
    name: 'Nipple Drinkers',
    tag: 'Precision Watering',
    img: 'https://images.unsplash.com/photo-1559734840-f9509ee5677f?auto=format&fit=crop&w=600&q=80',
    desc: 'Hygienic closed nipple systems eliminate surface water exposure, dramatically reducing bacterial infection and coccidiosis risk.',
    specs: ['360° trigger nipple', 'PVC pressure line', 'Regulator included', 'High-density layout'],
    color: '#a68b3c',
  },
  {
    name: 'Brooder Heaters',
    tag: 'Climate Control',
    img: 'https://images.unsplash.com/photo-1504275534009-2bc76c14ba85?auto=format&fit=crop&w=600&q=80',
    desc: 'Gas and electric brooders that maintain precision heat zones for chicks in the critical first three weeks, reducing early mortality.',
    specs: ['Thermostat controlled', 'Radiant heating disc', 'Gas & electric models', '2kW – 10kW range'],
    color: '#7a4a3e',
  },
  {
    name: 'Egg Incubators',
    tag: 'Incubation',
    img: 'https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?auto=format&fit=crop&w=600&q=80',
    desc: 'Fully automatic incubators with digital temperature, humidity control and auto egg-turning — from 48 to 10,000+ egg capacities.',
    specs: ['Auto egg-turning', 'LCD display', '37.8°C ±0.1°C accuracy', '48 to 10,000 egg capacity'],
    color: '#5a6e3a',
  },
  {
    name: 'Poultry Cages',
    tag: 'Housing',
    img: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&w=600&q=80',
    desc: 'Galvanised multi-tier battery cages for layer operations — maximise stocking density with integrated egg collection and manure trays.',
    specs: ['Hot-dip galvanised', '3 & 4-tier options', 'Integrated egg tray', 'Easy assembly'],
    color: '#c0543e',
  },
];

const services = [
  { icon: <Settings size={26} />, title: 'Installation & Setup', desc: 'Our technicians handle full installation, calibration, and staff training for all major equipment purchases.' },
  { icon: <Truck size={26} />, title: 'Nationwide Delivery', desc: 'We deliver and install across the country. Heavy equipment is transported on our dedicated flatbed fleet.' },
  { icon: <HeadphonesIcon size={26} />, title: 'After-Sales Support', desc: '12-month warranty on all equipment. Our support team is available Monday–Saturday for maintenance queries.' },
];

const EquipmentPage = () => (
  <main className="equipment-page">
    {/* ── HERO ── */}
    <section className="equipment-hero">
      <div className="equipment-hero__bg" />
      <div className="container equipment-hero__content">
        <motion.span className="overline" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          Farm Equipment
        </motion.span>
        <motion.h1 className="section-title equipment-hero__title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}>
          Equip your farm<br /><em>for excellence.</em>
        </motion.h1>
        <motion.p className="body-text equipment-hero__sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.35 }}>
          From brooders to incubators — every piece of equipment we stock is selected for durability, hygiene, and real-world performance in East African conditions.
        </motion.p>
        <motion.div className="equipment-hero__actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
          <Link to="/checkout?product=equipment" className="btn btn-solid">Order Equipment <ArrowRight size={16} /></Link>
          <Link to="/products" className="btn btn-outline">View All Products</Link>
        </motion.div>
      </div>
    </section>

    {/* ── EQUIPMENT GRID ── */}
    <section className="equipment-catalog section">
      <div className="container">
        <motion.div className="equipment-catalog__header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Our Catalog</span>
          <div className="rule" />
          <h2 className="section-title">Everything you<br />need to operate.</h2>
          <p className="body-text">A complete equipment range for broiler, layer, and hatchery operations — sourced from trusted manufacturers and locally field-tested.</p>
        </motion.div>

        <div className="equipment-catalog__grid">
          {equipment.map((item, i) => (
            <motion.div key={item.name} className="equip-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: (i % 3) * 0.12 }}>
              <div className="equip-card__img-wrap">
                <img src={item.img} alt={item.name} />
                <span className="equip-card__tag" style={{ background: item.color }}>{item.tag}</span>
              </div>
              <div className="equip-card__body">
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <ul className="equip-card__specs">
                  {item.specs.map(s => (
                    <li key={s}><CheckCircle size={14} color={item.color} /> {s}</li>
                  ))}
                </ul>
                <Link to={`/checkout?product=equipment&item=${item.name.toLowerCase().replace(/\s+/g, '-')}`} className="btn btn-solid equip-card__cta" style={{ background: item.color }}>
                  Enquire <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── SERVICES ── */}
    <section className="equipment-services">
      <div className="container">
        <motion.div className="equipment-catalog__header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Our Commitment</span>
          <div className="rule" />
          <h2 className="section-title">Beyond the sale.</h2>
        </motion.div>
        <div className="equipment-services__grid">
          {services.map((s, i) => (
            <motion.div key={s.title} className="service-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}>
              <div className="service-card__icon">{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="equipment-cta">
      <motion.div className="container equipment-cta__inner" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <span className="overline">Get a quote</span>
        <h2 className="section-title">Custom farm setups available.</h2>
        <p className="body-text">Planning a new poultry house? Our technical team will design a full equipment layout, sourcing, and installation plan tailored to your flock size and budget.</p>
        <Link to="/checkout?product=equipment" className="btn btn-solid">Request a Quote <ArrowRight size={16} /></Link>
      </motion.div>
    </section>
  </main>
);

export default EquipmentPage;
