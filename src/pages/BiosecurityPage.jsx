import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, AlertTriangle, Shield, Droplets, Wind, ChevronDown, BookOpen, Lock } from 'lucide-react';
import './GuidePage.css';

const biosecSteps = [
  {
    num: '01',
    title: 'Farm Zoning & Access Control',
    body: 'Divide your farm into Clean Zone (bird houses) and Dirty Zone (entry/storage). All movement must flow from clean to dirty — never reverse. This simple layout change is the single most powerful biosecurity measure.',
    points: [
      'Install a clearly marked entry gate with a footbath',
      'Post "Restricted Area — Farm Personnel Only" signage',
      'Maintain a visitor log — record all entries and exits',
      'Never allow visitors within 48 hrs of visiting another poultry farm',
      'Separate feed store, equipment store, and bird houses physically',
    ],
  },
  {
    num: '02',
    title: 'Footbaths & Protective Clothing',
    body: 'Disease-causing organisms are primarily spread on footwear, clothing, hands, and equipment. A properly maintained footbath with active disinfectant solution is your first line of defence.',
    points: [
      'Use 3% Virkon S or 2% Formalin in footbaths — change solution daily',
      'All personnel must wear dedicated farm boots — no farm boots leave the farm',
      'Provide disposable overalls or dedicated farm clothes for workers',
      'Wash hands with soap and disinfectant before entering bird houses',
      'Clean and disinfect vehicles visiting the farm, especially tyres',
    ],
  },
  {
    num: '03',
    title: 'All-In / All-Out Flock Management',
    body: 'The most effective way to break disease cycles. All birds enter the house on the same day and all leave on the same day — leaving a clean, empty house for thorough disinfection before the next flock.',
    points: [
      'Never mix birds of different ages in the same house',
      'If possible, never mix birds of different sources',
      'Allow a minimum 2-week rest period between flocks',
      'Complete full cleaning and disinfection during the rest period',
      'Conduct a house inspection and repair before placing new birds',
    ],
  },
  {
    num: '04',
    title: 'Cleaning & Disinfection Protocol',
    body: 'Cleaning removes organic matter. Disinfection kills pathogens. Both are required — done in order. Applying disinfectant to dirty surfaces is ineffective. The sequence is critical.',
    points: [
      'Step 1 — Remove all litter, feed, and dead birds. Bag and remove from farm.',
      'Step 2 — Dry-sweep all surfaces: roof, walls, floor, equipment.',
      'Step 3 — High-pressure wash with plain water to remove all organic material.',
      'Step 4 — Apply detergent (Tego or similar), leave for 30 minutes, then rinse.',
      'Step 5 — Apply approved disinfectant (Virkon, Glutaraldehyde, or Formaldehyde gas fumigation).',
      'Step 6 — Leave house empty for 5–7 days. Re-inspect before placing birds.',
    ],
  },
  {
    num: '05',
    title: 'Wild Bird & Pest Exclusion',
    body: 'Wild birds are the primary reservoir and vector for Newcastle Disease, Avian Influenza, and Salmonella. Rodents spread Salmonella and Fowl Typhoid. Exclusion is non-negotiable.',
    points: [
      'Install bird-proof wire mesh (max 25mm openings) on all ventilation openings',
      'Repair all gaps in roofing, walls, and doors — walk the house at night with a torch',
      'Install rodent bait stations around the perimeter (not inside the house)',
      'Keep grass around houses cut short — remove all hiding places for rodents',
      'Never store feed in open sacks — use sealed bins with tight-fitting lids',
    ],
  },
  {
    num: '06',
    title: 'Dead Bird Disposal',
    body: 'Dead birds are highly infectious. Every minute a dead bird remains in the house risks spreading whatever killed it to the rest of the flock. Removal and safe disposal must be done within 2 hours of discovery.',
    points: [
      'Check the flock twice daily — morning and evening — remove dead birds immediately',
      'Wear gloves when handling dead birds; wash hands and change gloves after',
      'Acceptable disposal: deep burial (>1m), incineration, or biodigester',
      'Never throw dead birds in open pits, rivers, or roadside dumps',
      'Record each mortality: date, age, clinical signs observed, estimated cause',
    ],
  },
];

const disinfectants = [
  { name: 'Virkon S', use: 'General disinfection, footbaths, equipment', dilution: '1–2% (10–20g/litre)', contact: '10 minutes', notes: 'Broad-spectrum, low toxicity. Safe on most surfaces.' },
  { name: 'Glutaraldehyde 20%', use: 'House fumigation, hard surfaces', dilution: '1–2%', contact: '30–60 minutes', notes: 'High efficacy against viruses. Wear PPE — toxic fumes.' },
  { name: 'Formaldehyde (gas fumigation)', use: 'Sealed house fumigation (empty)', dilution: 'Follow standard 20ml/m³ KMNO4 protocol', contact: '24 hours sealed', notes: 'Most effective. Only use in empty, sealed house. Dangerous.' },
  { name: 'Iodine (Povidone)', use: 'Nipple drinkers, water lines, small equipment', dilution: '0.5–1%', contact: '5–10 minutes', notes: 'Good for waterline biofilm. Inactivated by organic matter quickly.' },
  { name: 'Quaternary Ammonium (QAC)', use: 'Hatchery, egg disinfection, general surfaces', dilution: '0.1–0.2%', contact: '10–15 minutes', notes: 'Good residual action. Not for water consumption.' },
  { name: 'Slaked Lime (Ca(OH)₂)', use: 'Floor, walls, around farm perimeter', dilution: 'Paint on as 10–20% solution', contact: 'Dries / immediate effect', notes: 'Cheap, effective, raises pH. Safe when dry.' },
];

const faqs = [
  { q: 'How often should I change the footbath solution?', a: 'Daily is the minimum. Disinfectants are inactivated by organic matter (mud, manure) very quickly. If the footbath looks dirty, change it immediately regardless of schedule. Use Virkon S at 2% — it changes colour when exhausted.' },
  { q: 'Can I reuse old litter?', a: 'We strongly advise against it. Old litter carries high bacterial and viral loads, especially Salmonella, Coccidiosis oocysts, and Newcastle virus on feathers. The cost of fresh litter is negligible compared to the losses from a disease outbreak.' },
  { q: 'How do I know if a disinfectant is actually working?', a: 'You cannot tell by smell or colour alone. Use total viable count (TVC) swab tests before chick placement to confirm surfaces are biologically clean. Your nearest veterinary lab can process these for a small fee.' },
  { q: 'My neighbour\'s farm had Newcastle. What do I do immediately?', a: 'Immediately lock down your farm — no visitors, no shared equipment, no movement of birds. Vaccinate all birds with LaSota within 24 hours if not recently done. Institute strict footbath discipline. Alert your vet. Monitor birds closely for 14 days.' },
];

const BiosecurityPage = () => (
  <main className="guide-page">
    <section className="guide-hero">
      <div className="guide-hero__bg" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1800&q=80')` }} />
      <div className="container guide-hero__content">
        <motion.span className="overline" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>Learning Hub</motion.span>
        <motion.h1 className="section-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}>
          Biosecurity &amp;<br /><em>Hygiene Guide.</em>
        </motion.h1>
        <motion.p className="body-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.35 }}>
          Disease exclusion is 10× cheaper than disease treatment. These six biosecurity protocols, consistently applied, will protect your flock and your investment from the most common poultry disease threats in Uganda.
        </motion.p>
        <motion.div className="guide-hero__meta" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
          <span className="guide-tag"><Shield size={13} /> Biosecurity</span>
          <span className="guide-tag"><Droplets size={13} /> Disinfection Protocols</span>
          <span className="guide-tag"><Lock size={13} /> Access Control</span>
        </motion.div>
      </div>
    </section>

    <div className="guide-alert-banner">
      <div className="container guide-alert-banner__inner">
        <AlertTriangle size={18} />
        <p><strong>Remember:</strong> Biosecurity is not done once — it's a daily discipline. One lapse can wipe out an entire flock. Train all farm workers on these protocols and enforce them consistently.</p>
      </div>
    </div>

    <section className="guide-section section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">6-Point Protocol</span>
          <div className="rule" />
          <h2 className="section-title">Your biosecurity<br />system, step by step.</h2>
          <p className="body-text">Implement all six steps before you place your next flock. Each one addresses a different disease entry pathway.</p>
        </motion.div>
        <div className="guide-steps">
          {biosecSteps.map((step, i) => (
            <motion.div key={i} className="guide-step" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="guide-step__num">{step.num}</div>
              <div className="guide-step__content">
                <h4>{step.title}</h4>
                <p>{step.body}</p>
                <ul>{step.points.map((p, j) => <li key={j}><CheckCircle size={14} />{p}</li>)}</ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="guide-section--alt" style={{ padding: '8rem 0' }}>
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Disinfectants</span>
          <div className="rule" />
          <h2 className="section-title">Which disinfectant<br />for what job?</h2>
          <p className="body-text">Not all disinfectants work on all pathogens. Using the wrong product at the wrong dilution is expensive and ineffective. Use this reference table to make the right choice.</p>
        </motion.div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Product</th><th>Primary Use</th><th>Dilution Rate</th><th>Contact Time</th><th>Notes</th></tr>
            </thead>
            <tbody>
              {disinfectants.map((d, i) => (
                <motion.tr key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                  <td><strong>{d.name}</strong></td>
                  <td>{d.use}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{d.dilution}</td>
                  <td>{d.contact}</td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{d.notes}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section className="guide-faq">
      <div className="container guide-2col">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">FAQs</span>
          <div className="rule" />
          <h2 className="section-title">Biosecurity<br />questions answered.</h2>
        </motion.div>
        <div className="faq-list">
          {faqs.map((item, i) => {
            const [open, setOpen] = useState(false);
            return (
              <div key={i} className={`faq-item ${open ? 'open' : ''}`}>
                <button className="faq-question" onClick={() => setOpen(!open)}><span>{item.q}</span><ChevronDown size={18} className="faq-chevron" /></button>
                <AnimatePresence>{open && <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}><p>{item.a}</p></motion.div>}</AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <section className="guide-related">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Learning Hub</span><div className="rule" /><h2 className="section-title">Continue learning.</h2>
        </motion.div>
        <div className="related-grid">
          {[
            { to: '/learn/vaccination', title: 'Vaccination Guide', desc: 'Full layer and broiler vaccination schedules — with disease recognition guide.' },
            { to: '/learn/brooding', title: 'Brooding Management', desc: 'Temperature, humidity, and light schedules for the critical first 14 days.' },
            { to: '/learn/health', title: 'Health Management', desc: 'How to spot sick birds early, set up treatment protocols, and keep health records.' },
            { to: '/learn/records', title: 'Record Keeping', desc: 'Simple daily and weekly record templates proven to cut farm losses.' },
          ].map((r, i) => (
            <motion.div key={i} className="related-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <h4>{r.title}</h4><p>{r.desc}</p>
              <Link to={r.to} className="related-link">Read Guide <ArrowRight size={14} /></Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="guide-cta">
      <motion.div className="container guide-cta__inner" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <span className="overline">Farm Ready?</span>
        <h2 className="section-title">Order chicks for your next cycle.</h2>
        <p className="body-text">A biosecure house + Oval chicks + the right feed programme = maximum profitability. Start your next cycle right.</p>
        <div className="guide-cta__buttons">
          <Link to="/checkout?product=chicks" className="btn btn-solid">Order Chicks <ArrowRight size={16} /></Link>
          <a href="tel:+256539802" className="btn btn-outline-light">Call +256 539 802</a>
        </div>
      </motion.div>
    </section>
  </main>
);

export default BiosecurityPage;
