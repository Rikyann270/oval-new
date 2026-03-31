import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, CheckCircle, Thermometer, Shield, Zap,
  AlertTriangle, BookOpen, Heart, ChevronDown, Star,
  Clock, TrendingUp, Users, Award
} from 'lucide-react';
import './ChicksPage.css';

/* ── DATA ────────────────────────────────────────────── */
const stats = [
  { value: '95%+', label: 'Hatch Rate' },
  { value: '5–6 Wks', label: 'Broiler Time-to-Market' },
  { value: '300+', label: 'Eggs / Hen / Year (Layer)' },
  { value: '100+', label: 'Min. Order (Chicks)' },
];

const breeds = [
  {
    name: 'Broiler Chicks',
    tag: 'Meat Production',
    img: 'https://images.unsplash.com/photo-1548509925-0e784d1db4fa?auto=format&fit=crop&w=700&q=80',
    desc: 'Genetically optimised Ross 308 and Cobb 500 broiler chicks, bred for rapid growth, efficient feed conversion, and uniform carcass quality — making them the top choice for commercial meat producers across East Africa.',
    specs: [
      { label: 'Time to Market', val: '5–6 weeks (1.8–2.2 kg live weight)' },
      { label: 'Feed Conversion Ratio', val: '1.6–1.8 kg feed/kg gain' },
      { label: 'Protein %', val: '22–24% Starter · 18–20% Finisher' },
      { label: 'Vaccination', val: 'Marek\'s, Newcastle, Gumboro' },
      { label: 'Stocking Density', val: '10–12 birds/m² (intensive)' },
      { label: 'Minimum Order', val: '100 chicks per delivery' },
    ],
    color: '#c0543e',
    tip: 'Keep brooder temperature at 32–35°C on Day 1 and reduce by 3°C every week until ambient temperature is reached.',
  },
  {
    name: 'Kuroiler',
    tag: 'Dual-Purpose',
    img: 'https://images.unsplash.com/photo-1559131397-f94da358f7ca?auto=format&fit=crop&w=700&q=80',
    desc: 'The Kuroiler is a cross between a White Leghorn rooster and a Rhode Island Red hen, adapted to thrive in semi-intensive and extensive systems. Resilient to harsh conditions, it provides both meat and eggs — perfect for small- to medium-scale farmers.',
    specs: [
      { label: 'Egg Production', val: '150–200 eggs/year' },
      { label: 'Meat Weight', val: '1.5–2 kg at 12 weeks' },
      { label: 'System Suitability', val: 'Free-range, semi-intensive' },
      { label: 'Disease Resistance', val: 'Higher than commercial layers' },
      { label: 'Feed Cost', val: '30–40% lower than pure layers' },
      { label: 'Minimum Order', val: '50 chicks per delivery' },
    ],
    color: '#5a6e3a',
    tip: 'Kuroilers thrive on kitchen scraps supplemented with commercial mash. Allow 4m² per bird in free-range systems for best performance.',
  },
  {
    name: 'Layer Chicks',
    tag: 'Egg Production',
    img: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?auto=format&fit=crop&w=700&q=80',
    desc: 'Our layer chicks (Lohmann Brown & ISA Brown strains) are industry leaders in consistent, high-volume egg production, with superior shell quality and docile temperament — ideal for cage, barn, and free-range laying systems.',
    specs: [
      { label: 'Egg Production', val: '300–330 eggs/hen/year' },
      { label: 'Age at First Lay', val: '18–20 weeks' },
      { label: 'Peak Production', val: '92–95% (28–32 weeks)' },
      { label: 'Egg Weight', val: '60–65g average' },
      { label: 'Laying Period', val: '72+ weeks sustained lay' },
      { label: 'Minimum Order', val: '100 chicks per delivery' },
    ],
    color: '#a68b3c',
    tip: 'Expose layers to 16 hours of light per day during lay to maintain peak production. Transition gradually to avoid shock.',
  },
];

const broodingGuide = [
  { week: 'Day 1–3', temp: '35°C', humidity: '65–70%', feed: 'Starter Crumbles', water: 'Warm (not cold)', light: '24hrs' },
  { week: 'Week 1', temp: '32–33°C', humidity: '60–65%', feed: 'Starter Crumbles', water: 'Ad libitum', light: '24hrs' },
  { week: 'Week 2', temp: '29–30°C', humidity: '55–60%', feed: 'Starter Crumbles', water: 'Ad libitum', light: '20hrs' },
  { week: 'Week 3', temp: '26–27°C', humidity: '50–55%', feed: 'Starter / Grower', water: 'Ad libitum', light: '18hrs' },
  { week: 'Week 4+', temp: 'Ambient', humidity: 'Ambient', feed: 'Grower / Finisher', water: 'Ad libitum', light: '16–18hrs' },
];

const vaccinations = [
  { age: 'Day 1', disease: 'Marek\'s Disease', method: 'Subcutaneous injection', notes: 'Done at hatchery before delivery' },
  { age: 'Day 7–10', disease: 'Newcastle Disease (ND)', method: 'Eye drop / drinking water', notes: 'Use Hitchner B1 strain' },
  { age: 'Day 14', disease: 'Infectious Bursal (Gumboro)', method: 'Drinking water', notes: 'Use intermediate strain' },
  { age: 'Day 21', disease: 'Newcastle Disease (ND)', method: 'Eye drop booster', notes: 'LaSota strain' },
  { age: 'Day 28', disease: 'Gumboro (Booster)', method: 'Drinking water', notes: 'Intermediate plus strength' },
  { age: 'Week 6', disease: 'Fowl Pox', method: 'Wing-web stab', notes: 'For layers and breeders only' },
  { age: 'Week 10–12', disease: 'Newcastle (ND-IB)', method: 'Drinking water / spray', notes: 'Inactivated oil vaccine for layers' },
];

const healthSigns = [
  { sign: 'Huddling under brooder', cause: 'Too cold — increase temperature', severity: 'warning' },
  { sign: 'Spreading away from brooder', cause: 'Too hot — reduce temperature or raise brooder', severity: 'warning' },
  { sign: 'Pasting (sticky vents)', cause: 'Chilling, infection, or wrong feed', severity: 'alert' },
  { sign: 'Sneezing / rattling breath', cause: 'Newcastle, Myco, or IB infection', severity: 'alert' },
  { sign: 'Drooping wings, ruffled feathers', cause: 'General illness — isolate and call vet', severity: 'alert' },
  { sign: 'Uniform spread, active, chirping', cause: 'Healthy flock — ideal conditions', severity: 'ok' },
];

const faqs = [
  { q: 'What is the minimum order for day-old chicks?', a: 'The minimum order is 100 chicks for broilers and layers. For Kuroilers, the minimum is 50 chicks. Larger orders above 500 attract volume discounts.' },
  { q: 'Are the chicks vaccinated before delivery?', a: 'Yes. All chicks are vaccinated at the hatchery for Marek\'s Disease. They come with a vaccination card showing all diseases already covered. Our team will advise on the subsequent field vaccination schedule.' },
  { q: 'How do I keep chicks warm on arrival?', a: 'Prepare your brooder 24 hours before the chicks arrive. Set the temperature to 33–35°C at chick level. Use infrared bulbs, gas brooders, or electric hover brooders. Check that temperature is even across the brooding area.' },
  { q: 'What feed should I use in the first week?', a: 'Use a high-protein (22–24%) Starter Crumble from Day 1. Avoid mash as it can cause choking in young chicks. Ensure fresh, clean water is available at all times — warm, not cold.' },
  { q: 'How do I place an order?', a: 'You can book through our website checkout or call us directly at +256 539 802. Orders must be placed at least 5 days in advance. We deliver Tuesday and Friday each week.' },
  { q: 'Can I get technical support after buying chicks?', a: 'Yes. Every chick purchase includes a free advisory call with our veterinary team within the first 2 weeks. We also conduct farm visits for orders of 500 chicks and above.' },
];

const testimonials = [
  { name: 'James Okello', location: 'Kampala, Uganda', text: 'I started with 200 Oval broiler chicks and was amazed by the uniformity and growth rate. No losses in the first week — that\'s exceptional.', rating: 5 },
  { name: 'Grace Nakato', location: 'Masaka, Uganda', text: 'The layer chicks I got are now at 22 weeks and already laying beautifully. Production hit 88% in the first month.', rating: 5 },
  { name: 'Peter Ssemwogerere', location: 'Mbarara, Uganda', text: 'As a small-scale farmer the Kuroiler was perfect. Low feed cost, good local market for both eggs and meat. I\'ll never go back to local breeds.', rating: 5 },
];

/* ── ACCORDION FAQ ─────────────────────── */
const FAQ = ({ items }) => {
  const [open, setOpen] = useState(null);
  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
          <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
            <span>{item.q}</span>
            <ChevronDown size={18} className="faq-chevron" />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                className="faq-answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p>{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

/* ── PAGE ──────────────────────────────── */
const ChicksPage = () => (
  <main className="chicks-page">

    {/* ── HERO ── */}
    <section className="chicks-hero">
      <div className="chicks-hero__bg" />
      <div className="container chicks-hero__content">
        <motion.span className="overline" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          Day-Old Chicks
        </motion.span>
        <motion.h1 className="section-title chicks-hero__title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}>
          Bred for<br /><em>peak performance.</em>
        </motion.h1>
        <motion.p className="body-text chicks-hero__sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.35 }}>
          From certified hatcheries to your farm door — we deliver high-performance chicks backed by expert technical support, a full vaccination programme, and Uganda's most trusted supply chain.
        </motion.p>
        <motion.div className="chicks-hero__actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
          <Link to="/checkout?product=chicks" className="btn btn-solid">Order Chicks <ArrowRight size={16} /></Link>
          <Link to="/products" className="btn btn-outline">View All Products</Link>
        </motion.div>
      </div>
    </section>

    {/* ── STATS STRIP ── */}
    <section className="chicks-stats">
      <div className="container chicks-stats__grid">
        {stats.map((s, i) => (
          <motion.div key={s.label} className="stat-pill" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
            <span className="stat-pill__value">{s.value}</span>
            <span className="stat-pill__label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ── BREEDS ── */}
    <section className="chicks-breeds section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Our Breeds</span>
          <div className="rule" />
          <h2 className="section-title">Choose the right<br />breed for your farm.</h2>
          <p className="body-text">Every operation is unique. Whether you're targeting meat, eggs, or dual production, we have the right chick with the full technical package to back it up.</p>
        </motion.div>

        <div className="breeds-list">
          {breeds.map((b, i) => (
            <motion.div
              key={b.name}
              className={`breed-detail ${i % 2 !== 0 ? 'breed-detail--alt' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8 }}
            >
              <div className="breed-detail__img-wrap">
                <img src={b.img} alt={b.name} />
                <span className="breed-detail__tag" style={{ background: b.color }}>{b.tag}</span>
              </div>
              <div className="breed-detail__content">
                <h3 className="section-title" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)' }}>{b.name}</h3>
                <p className="body-text">{b.desc}</p>

                <table className="spec-table">
                  <tbody>
                    {b.specs.map(s => (
                      <tr key={s.label}>
                        <td className="spec-table__key">{s.label}</td>
                        <td className="spec-table__val">{s.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="breed-tip">
                  <Zap size={15} color={b.color} />
                  <p><strong>Farmer Tip:</strong> {b.tip}</p>
                </div>

                <Link to={`/checkout?product=chicks&breed=${b.name.toLowerCase().replace(/\s+/g,'-')}`} className="btn btn-solid" style={{ background: b.color }}>
                  Order {b.name.split(' ')[0]} Chicks <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── BROODING GUIDE ── */}
    <section className="chicks-brooding">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Brooding Management</span>
          <div className="rule" />
          <h2 className="section-title">Week-by-week<br />brooding guide.</h2>
          <p className="body-text">The first 14 days are the most critical in a chick's life. Follow this schedule to minimize losses and maximize growth rate from day one.</p>
        </motion.div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Temperature</th>
                <th>Humidity</th>
                <th>Feed Type</th>
                <th>Water</th>
                <th>Light</th>
              </tr>
            </thead>
            <tbody>
              {broodingGuide.map((row, i) => (
                <motion.tr key={row.week} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <td><strong>{row.week}</strong></td>
                  <td>{row.temp}</td>
                  <td>{row.humidity}</td>
                  <td>{row.feed}</td>
                  <td>{row.water}</td>
                  <td>{row.light}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="brooding-tips">
          <div className="btip"><Thermometer size={20} color="#c0543e" /><p><strong>Temperature Check:</strong> Place thermometer at chick level, not at ceiling height. Monitor chick behaviour — spreading = too hot, huddling = too cold.</p></div>
          <div className="btip"><Shield size={20} color="#5a6e3a" /><p><strong>Biosecurity:</strong> Disinfect the brooder house 7 days before chick placement. Use footbaths and restrict entry to essential personnel only.</p></div>
          <div className="btip"><BookOpen size={20} color="#a68b3c" /><p><strong>Record Keeping:</strong> Record daily temperatures, feed and water intake, and mortality from Day 1. This data is invaluable for diagnosing problems early.</p></div>
        </div>
      </div>
    </section>

    {/* ── VACCINATION TABLE ── */}
    <section className="chicks-vaccination section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Health Management</span>
          <div className="rule" />
          <h2 className="section-title">Vaccination<br />programme.</h2>
          <p className="body-text">Disease prevention is far cheaper than treatment. Follow this industry-standard vaccination schedule, adapted for East African conditions and disease pressure.</p>
        </motion.div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Age</th>
                <th>Disease</th>
                <th>Method</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {vaccinations.map((v, i) => (
                <motion.tr key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                  <td><strong>{v.age}</strong></td>
                  <td>{v.disease}</td>
                  <td>{v.method}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{v.notes}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* ── HEALTH OBSERVATION ── */}
    <section className="chicks-health">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Early Warning Signs</span>
          <div className="rule" />
          <h2 className="section-title">Know what<br />you're looking at.</h2>
          <p className="body-text">Train yourself to spot problems early. Inspect your flock at least twice a day — morning and evening. Here are the key signs and what they mean.</p>
        </motion.div>
        <div className="health-signs">
          {healthSigns.map((h, i) => (
            <motion.div key={i} className={`health-sign health-sign--${h.severity}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
              {h.severity === 'ok' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
              <div>
                <strong>{h.sign}</strong>
                <p>{h.cause}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── TESTIMONIALS ── */}
    <section className="chicks-testimonials section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Farmer Testimonials</span>
          <div className="rule" />
          <h2 className="section-title">What our farmers say.</h2>
        </motion.div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <motion.div key={i} className="testi-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}>
              <div className="testi-stars">{Array(t.rating).fill(0).map((_, j) => <Star key={j} size={14} fill="#a68b3c" color="#a68b3c" />)}</div>
              <p className="testi-text">"{t.text}"</p>
              <div className="testi-author">
                <strong>{t.name}</strong>
                <span>{t.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── FAQ ── */}
    <section className="chicks-faq">
      <div className="container chicks-faq__inner">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">FAQs</span>
          <div className="rule" />
          <h2 className="section-title">Common questions<br />answered.</h2>
        </motion.div>
        <FAQ items={faqs} />
      </div>
    </section>

    {/* ── BOTTOM CTA ── */}
    <section className="chicks-cta">
      <motion.div className="container chicks-cta__inner" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <span className="overline">Ready to start?</span>
        <h2 className="section-title">Place your chick order today.</h2>
        <p className="body-text">Minimum order: 100 chicks. Delivery Tuesday & Friday. Same-day hatch guaranteed on orders placed before 10 AM. Every order includes a free advisory call with our vet team.</p>
        <div className="chicks-cta__buttons">
          <Link to="/checkout?product=chicks" className="btn btn-solid">Book an Order <ArrowRight size={16} /></Link>
          <a href="tel:+256539802" className="btn btn-outline" style={{ borderColor: 'rgba(253,250,242,0.3)', color: '#fff' }}>Call +256 539 802</a>
        </div>
      </motion.div>
    </section>
  </main>
);

export default ChicksPage;
