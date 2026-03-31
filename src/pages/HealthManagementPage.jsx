import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, AlertTriangle, Heart, ChevronDown, Activity, Phone } from 'lucide-react';
import './GuidePage.css';

const healthChecklist = [
  { time: 'Every Morning (7 AM)', checks: ['Count dead birds — record number', 'Observe flock: are birds active and alert?', 'Check feed/water consumption vs. yesterday', 'Listen for coughing, sneezing, or rattling', 'Check droppings colour and consistency'] },
  { time: 'Every Evening (6 PM)', checks: ['Second mortality count and removal', 'Observe birds at rest — drooping wings?', 'Check brooder temperature if still brooding', 'Top up feeders and drinkers for overnight', 'Record daily production data'] },
  { time: 'Weekly', checks: ['Weigh 20–30 birds vs. breed growth targets', 'Calculate Feed Conversion Ratio for the week', 'Check for feather pecking/cannibalism', 'Review cumulative mortality (>1%/week = investigate)', 'Check vaccination schedule — next due?'] },
];

const treatmentProtocols = [
  { condition: 'Suspected Newcastle Disease', urgency: 'critical', steps: ['Isolate affected birds from healthy flock immediately', 'Vaccinate entire healthy flock with LaSota eye drop now', 'Call your vet — this is a virus, not antibiotic-responsive', 'Lock down farm completely — no visitors or movement', 'Report to district veterinary officer (notifiable disease)'], antibiotics: 'Not applicable — viral disease. Antibiotics only for secondary bacterial complications.', prevention: 'Monthly LaSota booster. Strict biosecurity.' },
  { condition: 'Gumboro Disease (IBD)', urgency: 'high', steps: ['Provide electrolytes (ORS, Vitamin C) in all drinkers', 'Reduce temperature by 1–2°C to relieve heat stress', 'Do not move or stress birds unnecessarily', 'Call your vet — confirm diagnosis before treating', 'Increase litter ventilation — reduce ammonia'], antibiotics: 'Supportive only. Antibiotics for secondary infections under vet guidance.', prevention: 'IBD vaccine Day 14 and booster Day 21.' },
  { condition: 'Respiratory Disease (ND/IB/Mycoplasma)', urgency: 'high', steps: ['Check if sounds are wet (fluid) or dry (wheezing)', 'Review vaccination history — is flock protected against ND/IB?', 'Improve ventilation — reduce ammonia and dust immediately', 'Call vet for differential diagnosis before treatment', 'Collect swabs for lab culture if Mycoplasma suspected'], antibiotics: 'Tylosin or Doxycycline for Mycoplasma. Enrofloxacin for secondary bacteria. Vet prescription only.', prevention: 'ND/IB vaccination + good ventilation.' },
  { condition: 'Coccidiosis', urgency: 'high', steps: ['Identify: bloody/chocolate droppings in birds aged 2–6 weeks', 'Start Amprolium (Coxoid) in drinking water immediately', 'Replace wet litter — remove all wet sections now', 'Add vitamin K to feed to support blood clotting', 'Separate severely affected birds'], antibiotics: 'Amprolium (anticoccidial). Antibiotics for secondaries only.', prevention: 'Coccidiostat in starter feed + dry litter management.' },
];

const whenToCallVet = [
  { sign: 'Mortality above 2% in a single day', action: 'Call vet immediately — do not wait' },
  { sign: 'Sudden drop in feed/water intake >20%', action: 'Call vet same day — early warning sign' },
  { sign: 'Neurological signs (twisting neck, circling)', action: 'Emergency call — likely Newcastle. Isolate birds.' },
  { sign: 'Flock-wide respiratory distress + high mortality', action: 'Emergency — suspect Avian Influenza. Call vet + authorities.' },
  { sign: 'Egg production drops >10% in one week', action: 'Call vet within 24 hours — ND, EDS, or IB.' },
  { sign: 'Swollen heads, wattles, or sinuses', action: 'Call vet same day — Coryza, IB, or Cholera.' },
];

const HealthManagementPage = () => (
  <main className="guide-page">
    <section className="guide-hero">
      <div className="guide-hero__bg" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1559734840-f9509ee5677f?auto=format&fit=crop&w=1800&q=80')` }} />
      <div className="container guide-hero__content">
        <motion.span className="overline" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>Learning Hub</motion.span>
        <motion.h1 className="section-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}>Health<br /><em>Management Guide.</em></motion.h1>
        <motion.p className="body-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.35 }}>Healthy birds are profitable birds. Learn how to detect disease early, respond correctly, and build a health calendar that protects your flock all year round.</motion.p>
        <motion.div className="guide-hero__meta" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
          <span className="guide-tag"><Heart size={13} /> Early Detection</span>
          <span className="guide-tag"><Activity size={13} /> Treatment Protocols</span>
          <span className="guide-tag"><Phone size={13} /> When to Call a Vet</span>
        </motion.div>
      </div>
    </section>

    <div className="guide-alert-banner">
      <div className="container guide-alert-banner__inner">
        <AlertTriangle size={18} />
        <p><strong>Golden Rule:</strong> Never give antibiotics without a confirmed diagnosis. Antibiotic resistance is a growing crisis in poultry farming. Treat only what you have diagnosed — and always observe withdrawal periods before slaughter.</p>
      </div>
    </div>

    <section className="guide-section section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Daily Routine</span>
          <div className="rule" />
          <h2 className="section-title">Your daily flock<br />health checklist.</h2>
          <p className="body-text">Disease caught on Day 1 is manageable. Disease caught on Day 5 costs you thousands. These checks take 15 minutes per session and are the most valuable investment of your day on the farm.</p>
        </motion.div>
        <div className="info-boxes">
          {healthChecklist.map((check, i) => (
            <motion.div key={i} className="info-box" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}>
              <div className="info-box__icon"><Activity size={22} color="var(--accent-red)" /></div>
              <h4>{check.time}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {check.checks.map((c, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    <CheckCircle size={12} color="var(--olive)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />{c}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="guide-section--alt" style={{ padding: '8rem 0' }}>
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Treatment Protocols</span>
          <div className="rule" />
          <h2 className="section-title">How to respond<br />to common diseases.</h2>
          <p className="body-text">These are immediate response guides — not substitutes for a vet diagnosis. Use them to act fast while you get professional help.</p>
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {treatmentProtocols.map((t, i) => (
            <motion.div key={i} className={`disease-card disease-card--${t.urgency}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="disease-card__header">
                <h4>{t.condition}</h4>
                <span className={`severity-badge severity-badge--${t.urgency}`}>{t.urgency === 'critical' ? '⚠ Critical' : '! High Priority'}</span>
              </div>
              <div className="disease-card__body">
                <p className="disease-label">Immediate Steps:</p>
                <ul>{t.steps.map((s, j) => <li key={j}><CheckCircle size={12} />{s}</li>)}</ul>
                <div className="disease-row">
                  <div><p className="disease-label">Antibiotic Guidance</p><p>{t.antibiotics}</p></div>
                  <div><p className="disease-label">Long-term Prevention</p><p>{t.prevention}</p></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="guide-notes">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Vet Alert Triggers</span>
          <div className="rule" />
          <h2 className="section-title">When to call<br />your vet — now.</h2>
        </motion.div>
        <div className="notes-grid">
          {whenToCallVet.map((item, i) => (
            <motion.div key={i} className="note-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}>
              <span className="note-num">!</span>
              <div>
                <p style={{ color: '#fff', fontWeight: 700, marginBottom: '0.4rem' }}>{item.sign}</p>
                <p style={{ color: 'rgba(253,250,242,0.6)', fontSize: '0.85rem' }}>{item.action}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="guide-related">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Learning Hub</span><div className="rule" /><h2 className="section-title">More farm guides.</h2>
        </motion.div>
        <div className="related-grid">
          {[{ to: '/learn/vaccination', title: 'Vaccination Guide', desc: 'Full vaccination schedules for broilers and layers.' }, { to: '/learn/biosecurity', title: 'Biosecurity', desc: 'Prevent disease entry through strict protocols.' }, { to: '/learn/brooding', title: 'Brooding Guide', desc: 'Temperature and humidity for the first 14 days.' }, { to: '/learn/records', title: 'Record Keeping', desc: 'Simple templates that cut farm losses.' }].map((r, i) => (
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
        <span className="overline">Need advice?</span>
        <h2 className="section-title">Speak to our vet team directly.</h2>
        <p className="body-text">Oval customers get free advisory access to our vet team. Call us with any flock health concern — early intervention always wins.</p>
        <div className="guide-cta__buttons">
          <a href="tel:+256539802" className="btn btn-solid">Call +256 539 802 <ArrowRight size={16} /></a>
          <Link to="/checkout?product=chicks" className="btn btn-outline-light">Order Your Next Flock</Link>
        </div>
      </motion.div>
    </section>
  </main>
);

export default HealthManagementPage;
