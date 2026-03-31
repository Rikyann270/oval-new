import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, CheckCircle, Leaf, BarChart2, Droplets,
  ChevronDown, AlertTriangle, Star, Package, Info
} from 'lucide-react';
import './FeedsPage.css';

/* ── DATA ─────────────────────────────────────── */
const stats = [
  { value: '4-Phase', label: 'Complete Feeding Programme' },
  { value: '22–24%', label: 'Starter Crude Protein' },
  { value: '<0.5ppb', label: 'Max Aflatoxin Level' },
  { value: '50kg', label: 'Standard Bag Size' },
];

const feedLines = [
  {
    name: 'Chick Starter Crumbles',
    phase: 'Phase 1: 0 – 2 Weeks',
    img: 'https://images.unsplash.com/photo-1595185966453-159670f80bc2?auto=format&fit=crop&w=700&q=80',
    color: '#c0543e',
    desc: 'Formulated for maximum early growth, gut health colonisation, and immune development. The high protein and energy density drives explosive weight gain in the first critical two weeks, while probiotics and prebiotics establish a healthy microbiome.',
    specs: [
      { label: 'Crude Protein', val: '22–24%' },
      { label: 'Metabolisable Energy', val: '2,900–3,000 kcal/kg' },
      { label: 'Crude Fat', val: '5–6%' },
      { label: 'Crude Fibre', val: '≤ 4%' },
      { label: 'Calcium', val: '0.9–1.0%' },
      { label: 'Available Phosphorus', val: '0.45–0.50%' },
      { label: 'Coccidiostat', val: 'Included (Salinomycin)' },
      { label: 'Presentation', val: 'Fine crumble — prevents choking' },
    ],
    tip: 'Provide crumbles in shallow trays or chick feeders from Day 1. Always dip chick beaks in water before releasing into the brooder.',
  },
  {
    name: 'Grower Mash / Pellets',
    phase: 'Phase 2: 2 – 4 Weeks',
    img: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=700&q=80',
    color: '#5a6e3a',
    desc: 'As birds transition from brooding, their protein needs reduce slightly while energy demands rise sharply. Our Grower formula bridges starter and finisher nutrition — supporting musculoskeletal development, feathering, and disease resistance during the mid-cycle phase.',
    specs: [
      { label: 'Crude Protein', val: '18–20%' },
      { label: 'Metabolisable Energy', val: '3,050–3,100 kcal/kg' },
      { label: 'Crude Fat', val: '6–7%' },
      { label: 'Crude Fibre', val: '≤ 4%' },
      { label: 'Calcium', val: '0.85–0.95%' },
      { label: 'Available Phosphorus', val: '0.40–0.45%' },
      { label: 'Coccidiostat', val: 'Reduced dose' },
      { label: 'Presentation', val: 'Mash or mini-pellets (2mm)' },
    ],
    tip: 'Switch from starter to grower at 14 days for broilers, 21 days for Kuroilers. Do not abruptly switch — blend 50/50 for 3 days before full transition.',
  },
  {
    name: 'Finisher Pellets',
    phase: 'Phase 3: 4 Weeks – Market',
    img: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=700&q=80',
    color: '#a68b3c',
    desc: 'High-density, drug-free finisher formulated for maximum weight gain in the final weeks before slaughter. High-fat, high-energy content drives lean muscle deposition and improves feed conversion. Must comply with meat withdrawal periods — no antibiotics in finisher.',
    specs: [
      { label: 'Crude Protein', val: '16–18%' },
      { label: 'Metabolisable Energy', val: '3,100–3,200 kcal/kg' },
      { label: 'Crude Fat', val: '7–8%' },
      { label: 'Crude Fibre', val: '≤ 3.5%' },
      { label: 'Calcium', val: '0.80–0.90%' },
      { label: 'Available Phosphorus', val: '0.38–0.42%' },
      { label: 'Coccidiostat', val: 'None (drug-withdrawal safe)' },
      { label: 'Presentation', val: '3mm dense pellets' },
    ],
    tip: 'Observe the 5-day withdrawal period before slaughter when using any medicated grower. Weigh a sample of 10 birds weekly to track growth against targets.',
  },
  {
    name: 'Layer Mash / Crumbles',
    phase: 'Laying Hens: From 18 Weeks',
    img: 'https://images.unsplash.com/photo-1569288063643-5d29ad4a8c4e?auto=format&fit=crop&w=700&q=80',
    color: '#7a4a3e',
    desc: 'Precision-engineered for layers in active production. Elevated calcium supports eggshell strength, Omega-3 enrichment through linseed meal improves yolk quality, and vitamin D3 and E fortification extends the productive laying cycle beyond 72 weeks.',
    specs: [
      { label: 'Crude Protein', val: '16–17%' },
      { label: 'Metabolisable Energy', val: '2,700–2,800 kcal/kg' },
      { label: 'Calcium', val: '3.4–4.0% (shell formation)' },
      { label: 'Available Phosphorus', val: '0.32–0.38%' },
      { label: 'Omega-3 Source', val: 'Linseed & fish meal' },
      { label: 'Sodium', val: '0.16–0.20%' },
      { label: 'Vitamins D3, E', val: 'Fortified above NRC' },
      { label: 'Presentation', val: 'Mash or 3mm crumbles' },
    ],
    tip: 'Provide layer mash alongside oyster shell grit (ad libitum) from 17 weeks — before first lay — to build calcium reserves in bones.',
  },
];

const feedingProgramme = [
  { period: 'Broilers: Day 1–14', feed: 'Chick Starter Crumbles', amount: '10–30g/bird/day', water: '2× feed intake', notes: 'Ad libitum access; check feeders every 4 hours' },
  { period: 'Broilers: Day 15–28', feed: 'Grower Mash / Mini-pellets', amount: '30–80g/bird/day', water: '2× feed intake', notes: 'Increase feeder space as birds grow' },
  { period: 'Broilers: Day 28–Slaughter', feed: 'Finisher Pellets', amount: '80–150g/bird/day', water: '2× feed intake', notes: 'Withdraw medicated feeds 5 days before slaughter' },
  { period: 'Layers: Week 0–6', feed: 'Chick Starter Crumbles', amount: '15–35g/bird/day', water: 'Ad libitum', notes: 'Same starter as broilers — high protein for growth' },
  { period: 'Layers: Week 6–18', feed: 'Grower / Pre-layer Mash', amount: '50–80g/bird/day', water: 'Ad libitum', notes: 'Limit feed slightly to prevent over-conditioning' },
  { period: 'Layers: From Week 18', feed: 'Layer Mash/Crumbles + Grit', amount: '100–120g/bird/day', water: '180–200ml/bird/day', notes: 'Maintain consistent 16-hr light programme' },
];

const commonIssues = [
  { issue: 'Birds eating but not gaining weight', cause: 'Poor feed quality, disease, or worm burden', fix: 'Test feed sample, deworm flock, and consult vet' },
  { issue: 'Feed wastage / birds scatter feed', cause: 'Wrong feeder height or overfilled feeders', fix: 'Adjust feeder to back level; fill only 1/3 capacity' },
  { issue: 'Soft-shelled or thin eggs (layers)', cause: 'Calcium or Vit D3 deficiency', fix: 'Add oyster shell grit; switch to layer mash immediately' },
  { issue: 'Wet droppings / diarrhoea', cause: 'Coccidiosis, Salmonella, or excess salt', fix: 'Check water cleanliness; consult a vet for diagnosis' },
  { issue: 'Pale yolks (layers)', cause: 'Low carotenoid content in feed', fix: 'Add marigold extract or paprika to feed ration' },
  { issue: 'Cannibalism / feather picking', cause: 'Overcrowding, protein deficiency, or boredom', fix: 'Increase protein level; reduce stocking density' },
];

const faqs = [
  { q: 'How much feed does a broiler chicken need from day 1 to slaughter?', a: 'A broiler will consume approximately 3.5–4.5 kg of feed total over 5–6 weeks, depending on genetics and management. Feed conversion ratio (FCR) should be between 1.6–1.9 in a well-managed flock.' },
  { q: 'Can I mix different brands of feed in the same cycle?', a: 'We strongly advise against mixing brands, as different formulations may have conflicting medication, differing nutrient balances, or different physical forms that reduce intake. Stick to one feed programme for the full cycle.' },
  { q: 'What is the shelf life of your feeds?', a: 'All feeds have a 3-month shelf life from date of manufacture when stored in cool, dry conditions on raised pallets. Never store directly on concrete — moisture promotes mould and mycotoxin growth.' },
  { q: 'Do your feeds contain growth hormones?', a: 'No. All Oval feeds are hormone-free. Growth performance is achieved through genetic selection, balanced nutrition, and optimised management — not hormones or illegal growth promoters.' },
  { q: 'Can I add supplements on top of the feed?', a: 'Our feeds are complete and balanced. Adding extra vitamins or minerals without veterinary advice can cause imbalances. If birds are stressed (transport, disease, heat), consult us about targeted supplementation.' },
  { q: 'Do you offer bulk pricing for large orders?', a: 'Yes. Orders of 50 bags (2,500 kg) or more attract a 5% discount. Orders above 200 bags include free delivery within a 60 km radius. Contact our sales team for a custom quote.' },
];

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
              <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                <p>{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const FeedsPage = () => (
  <main className="feeds-page">

    {/* ── HERO ── */}
    <section className="feeds-hero">
      <div className="feeds-hero__bg" />
      <div className="container feeds-hero__content">
        <motion.span className="overline" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>Poultry Feeds</motion.span>
        <motion.h1 className="section-title feeds-hero__title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}>
          Nutrition that<br /><em>drives results.</em>
        </motion.h1>
        <motion.p className="body-text feeds-hero__sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.35 }}>
          A complete 4-phase feeding programme scientifically formulated for East African conditions — from hatch to harvest, our feeds maximise weight gain, egg production, and flock health with zero compromises.
        </motion.p>
        <motion.div className="feeds-hero__actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
          <Link to="/checkout?product=feeds" className="btn btn-solid">Order Feeds <ArrowRight size={16} /></Link>
          <Link to="/products" className="btn btn-outline">View All Products</Link>
        </motion.div>
      </div>
    </section>

    {/* ── STATS ── */}
    <section className="feeds-stats">
      <div className="container feeds-stats__grid">
        {stats.map((s, i) => (
          <motion.div key={s.label} className="stat-pill" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
            <span className="stat-pill__value">{s.value}</span>
            <span className="stat-pill__label">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ── FEED LINES ── */}
    <section className="feeds-lines section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Our Feed Range</span>
          <div className="rule" />
          <h2 className="section-title">Complete nutrition at<br />every stage of life.</h2>
          <p className="body-text">Each phase demands a different nutritional profile. Using the wrong feed at the wrong time costs you growth, health, and profitability. Our 4-phase programme eliminates that risk.</p>
        </motion.div>

        <div className="breeds-list">
          {feedLines.map((f, i) => (
            <motion.div key={f.name} className={`breed-detail ${i % 2 !== 0 ? 'breed-detail--alt' : ''}`} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8 }}>
              <div className="breed-detail__img-wrap">
                <img src={f.img} alt={f.name} />
                <span className="breed-detail__tag" style={{ background: f.color }}>{f.phase}</span>
              </div>
              <div className="breed-detail__content">
                <h3 className="section-title" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)' }}>{f.name}</h3>
                <p className="body-text">{f.desc}</p>
                <table className="spec-table">
                  <tbody>
                    {f.specs.map(s => (
                      <tr key={s.label}>
                        <td className="spec-table__key">{s.label}</td>
                        <td className="spec-table__val">{s.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="breed-tip" style={{ borderColor: f.color }}>
                  <Info size={15} color={f.color} />
                  <p><strong>Farmer Note:</strong> {f.tip}</p>
                </div>
                <Link to={`/checkout?product=feeds&type=${f.name.toLowerCase().replace(/\s+/g,'-')}`} className="btn btn-solid" style={{ background: f.color }}>
                  Order {f.name.split(' ')[0]} <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── FEEDING PROGRAMME TABLE ── */}
    <section className="feeds-programme">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Feeding Programme</span>
          <div className="rule" />
          <h2 className="section-title">How much to feed<br />and when.</h2>
          <p className="body-text">Feed quantities and access schedules are as important as feed quality. Use this programme as your daily management guide.</p>
        </motion.div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Production Period</th>
                <th>Feed Type</th>
                <th>Daily Amount</th>
                <th>Water</th>
                <th>Key Notes</th>
              </tr>
            </thead>
            <tbody>
              {feedingProgramme.map((row, i) => (
                <motion.tr key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                  <td><strong>{row.period}</strong></td>
                  <td>{row.feed}</td>
                  <td>{row.amount}</td>
                  <td>{row.water}</td>
                  <td style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>{row.notes}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* ── COMMON ISSUES ── */}
    <section className="feeds-issues">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Troubleshooting</span>
          <div className="rule" />
          <h2 className="section-title">Common feeding<br />problems & fixes.</h2>
        </motion.div>
        <div className="issues-grid">
          {commonIssues.map((item, i) => (
            <motion.div key={i} className="issue-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
              <div className="issue-card__header">
                <AlertTriangle size={16} color="var(--mustard)" />
                <strong>{item.issue}</strong>
              </div>
              <p><span className="issue-label">Cause:</span> {item.cause}</p>
              <p><span className="issue-label">Fix:</span> {item.fix}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── QUALITY PILLARS ── */}
    <section className="feeds-pillars">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Quality Assurance</span>
          <div className="rule" />
          <h2 className="section-title">Milled to the<br />highest standard.</h2>
        </motion.div>
        <div className="pillars-grid">
          {[
            { icon: <Leaf size={26} />, title: 'No Hormones. No Compromises.', desc: 'Over 70% plant-based raw materials. Hormone-free, heavy-metal-tested, and produced to international quality standards. We publish batch test results on request.' },
            { icon: <BarChart2 size={26} />, title: 'Lab-Tested Every Batch', desc: 'Every tonne of feed is tested at our accredited quality lab before dispatch — protein content, moisture levels, aflatoxin concentration, and amino acid profiles.' },
            { icon: <Droplets size={26} />, title: 'Moisture-Controlled Milling', desc: 'Feeds are milled and bag-sealed to <13% moisture to prevent mycotoxin growth in Uganda\'s humid climate. Bags include moisture indicators.' },
          ].map((p, i) => (
            <motion.div key={p.title} className="pillar-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}>
              <div className="pillar-card__icon">{p.icon}</div>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── FAQ ── */}
    <section className="feeds-faq">
      <div className="container feeds-faq__inner">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">FAQs</span>
          <div className="rule" />
          <h2 className="section-title">Feed questions<br />answered.</h2>
        </motion.div>
        <FAQ items={faqs} />
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="feeds-cta">
      <motion.div className="container feeds-cta__inner" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <span className="overline">Get started</span>
        <h2 className="section-title">Order feeds in bulk & save.</h2>
        <p className="body-text">Volume discounts from 50 bags. Free delivery on orders over 200 bags within 60 km. All orders include a free consultation with our nutrition team.</p>
        <div className="feeds-cta__buttons">
          <Link to="/checkout?product=feeds" className="btn btn-solid">Place a Feed Order <ArrowRight size={16} /></Link>
          <a href="tel:+256539802" className="btn btn-outline-light">Call +256 539 802</a>
        </div>
      </motion.div>
    </section>
  </main>
);

export default FeedsPage;
