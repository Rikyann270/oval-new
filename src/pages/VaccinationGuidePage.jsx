import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, AlertTriangle, CheckCircle, Info, ChevronDown, Shield, BookOpen, Syringe, Droplets } from 'lucide-react';
import './GuidePage.css';

/* ─── Layers Vaccination Table ─────────────────── */
const layerVaccinations = [
  { age: 'Day 1', disease: "Marek's Disease (MD)", vaccine: 'RISMAVAC (HVT+RISPENS)', route: 'Subcutaneous (SC) at hatchery', remarks: 'Administered at hatchery only' },
  { age: 'Day 1', disease: 'Newcastle (NCD) + Gumboro (IBD)', vaccine: 'INNOVAX ND-IBD', route: 'Subcutaneous (SC) at hatchery', remarks: 'Combined injection at hatchery' },
  { age: 'Day 1', disease: 'Newcastle (NCD) + Infectious Bronchitis (IB)', vaccine: 'MA5+Clone 30 & IB 4-91', route: 'Coarse Spray at hatchery', remarks: 'Spray applied at hatch' },
  { age: 'Week 2', disease: 'Gumboro (IBD)', vaccine: 'Bursa-Vac or Imotek IBD', route: 'Drinking water / eye drop', remarks: 'Ensure birds are thirsty 1–2 hrs before; withdraw antibiotics 48 hrs prior' },
  { age: 'Week 3', disease: 'Gumboro Booster (IBD)', vaccine: 'IBD Intermediate Plus', route: 'Drinking water', remarks: 'Booster; use cool water below 20°C' },
  { age: 'Week 3–4', disease: 'Newcastle Disease (ND)', vaccine: 'Clone 30 or LaSota', route: 'Eye drop / drinking water', remarks: 'Critical — do not miss' },
  { age: 'Week 5', disease: 'Infectious Bronchitis (IB)', vaccine: 'IB 4-91 or H120', route: 'Spray / drinking water', remarks: 'Booster for respiratory protection' },
  { age: 'Week 6', disease: 'Newcastle Disease (ND)', vaccine: 'LaSota or Avinew', route: 'Eye drop / oral', remarks: 'LaSota gives 4–6 week protection' },
  { age: 'Week 8', disease: 'Fowl Pox', vaccine: 'Fowl Pox Live', route: 'Wing-web stab', remarks: 'Do not use in hot wet weather' },
  { age: 'Week 10', disease: 'Infectious Coryza', vaccine: 'Coryza Killed Vaccine', route: 'Subcutaneous injection', remarks: 'If Coryza is a field risk in your area' },
  { age: 'Week 12', disease: 'Newcastle Disease (ND)', vaccine: 'LaSota booster', route: 'Drinking water / spray', remarks: '4–6 week intervals thereafter' },
  { age: 'Week 14–16', disease: 'Newcastle (ND) + IB (Combined Oil)', vaccine: 'ND-IB Inactivated Oil Vaccine', route: 'Subcutaneous/IM injection', remarks: 'Provides long-lasting protection through lay' },
  { age: 'Week 15–16', disease: 'Egg Drop Syndrome (EDS)', vaccine: 'EDS-76 Inactivated', route: 'Intramuscular injection', remarks: 'Done pre-lay — critical for production consistency' },
  { age: 'Every 8–10 weeks (in lay)', disease: 'Newcastle Disease (ND)', vaccine: 'LaSota live booster', route: 'Drinking water / spray', remarks: 'Maintain immunity through the whole lay cycle' },
];

/* ─── Broiler Vaccination Table ─────────────────── */
const broilerVaccinations = [
  { age: 'Day 1', disease: "Marek's Disease (MD)", vaccine: 'HVT Freeze-dried', route: 'Subcutaneous at hatchery', remarks: 'Done at hatchery before delivery' },
  { age: 'Day 1', disease: 'Newcastle (NCD) + Gumboro (IBD)', vaccine: 'INNOVAX ND-IBD', route: 'Subcutaneous at hatchery', remarks: 'Optional — depends on hatchery protocol' },
  { age: 'Day 7–10', disease: 'Newcastle Disease (ND)', vaccine: 'Hitchner B1 or Clone 30', route: 'Eye drop', remarks: 'First field vaccination — most critical' },
  { age: 'Day 12–14', disease: 'Gumboro Disease (IBD)', vaccine: 'IBD Intermediate', route: 'Drinking water', remarks: 'Withhold water 2 hrs before; complete within 90 mins' },
  { age: 'Day 18–21', disease: 'Newcastle Booster (ND)', vaccine: 'LaSota', route: 'Eye drop / drinking water', remarks: 'Do not use within 5 days of slaughter' },
  { age: 'Day 21–24', disease: 'Gumboro Booster (IBD)', vaccine: 'IBD Intermediate Plus', route: 'Drinking water', remarks: 'Especially if Gumboro pressure is high in area' },
  { age: 'Day 28', disease: 'Newcastle Final Booster (ND)', vaccine: 'LaSota', route: 'Drinking water', remarks: 'Only if slaughter is beyond 42 days' },
];

/* ─── Important Notes ──────────────────────────── */
const importantNotes = [
  'AVOID using antibiotics or their combinations on vaccination days. Only multivitamins are recommended.',
  'Water for vaccine preparation must be kept below 20°C. Ensure birds are thirsty for 1–2 hours and all vaccine water is consumed within 1–2 hours.',
  'De-worm layers at Week 9 and Week 15 in drinking water. Repeat every 6–8 weeks thereafter.',
  'Recommended to de-beak layer birds at Week 9–10 to prevent feather pecking and cannibalism.',
  'Vaccination does NOT guarantee absolute protection. It works best when combined with balanced nutrition, biosecurity, and good farm management.',
  'The vaccination schedule can be adjusted based on local disease pressure — always consult a licensed veterinarian before making changes.',
  'Refrigerate all vaccines at 2–8°C. Never freeze live vaccines. Discard unused reconstituted vaccine within 1–2 hours.',
  'Never mix different vaccines in the same syringe unless specifically recommended by the manufacturer.',
];

/* ─── Disease Guide ────────────────────────────── */
const diseases = [
  {
    name: "Newcastle Disease (ND)",
    signs: ['Twisting of neck and head', 'Diarrhoea (greenish)', 'Respiratory distress & gurgling sounds', 'Drop in egg production', 'High mortality (up to 100% in unvaccinated flocks)'],
    prevention: 'Regular LaSota vaccination every 4–6 weeks. Strict biosecurity.',
    treatment: 'No treatment — prevention is everything. Cull severely affected birds.',
    severity: 'critical',
  },
  {
    name: 'Gumboro Disease (IBD)',
    signs: ['Reluctance to move', 'Ruffled feathers', 'Watery diarrhoea', 'Pecking at vent', 'Sudden increased mortality at 3–6 weeks'],
    prevention: 'IBD vaccination at Day 14 and reboot at Day 21. Keep brooder clean.',
    treatment: 'Supportive care: electrolytes, vitamin C, keep warm. Consult vet immediately.',
    severity: 'high',
  },
  {
    name: "Marek's Disease (MD)",
    signs: ['Paralysis of legs, wings, or neck', 'Grey eye (irregular pupil)', 'Skin tumours', 'Progressive weight loss'],
    prevention: 'HVT+Rispens vaccination at Day 1 (hatchery only). Once missed, cannot be corrected.',
    treatment: 'No treatment — birds must be culled. Prevention at hatchery is the only option.',
    severity: 'critical',
  },
  {
    name: 'Infectious Bronchitis (IB)',
    signs: ['Coughing, sneezing, rattling sounds', 'Reduced feed and water intake', 'Watery or misshapen eggs', 'Nasal discharge'],
    prevention: 'H120 or IB 4-91 vaccine. Good ventilation; avoid draughts.',
    treatment: 'No specific cure. Antibiotics for secondary bacterial infections under vet advice.',
    severity: 'high',
  },
  {
    name: 'Fowl Typhoid / Salmonellosis',
    signs: ['Yellow-green diarrhoea', 'Pale comb and wattles', 'Sudden deaths', 'Swollen joints'],
    prevention: 'Strict biosecurity. Purchase chicks from certified Salmonella-free hatcheries.',
    treatment: 'Antibiotics under vet supervision (Enrofloxacin, Florfenicol). Observe withdrawal periods.',
    severity: 'high',
  },
  {
    name: 'Fowl Pox',
    signs: ['Warty scabs on comb, wattles, and bare skin', 'White-yellow lesions inside mouth and trachea', 'Drop in egg production'],
    prevention: 'Wing-web stab vaccination at Week 8. Avoid vaccine in wet season.',
    treatment: 'Remove scabs gently, apply iodine. Antibiotics for secondary infections.',
    severity: 'moderate',
  },
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

const vaccineFaqs = [
  { q: 'Can I vaccinate sick birds?', a: 'Never vaccinate visibly sick or stressed birds. Vaccination stimulates the immune system, and sick birds cannot mount a proper immune response — you will waste vaccine and may worsen the mortality. Stabilise the flock first, then re-schedule vaccination.' },
  { q: 'Why did my vaccinated flock still get Newcastle?', a: 'Vaccination reduces severity but does not provide 100% protection. Common causes of vaccine failure: broken cold chain, wrong timing, concurrent disease suppressing immunity, or poor administration technique. Review your programme with a vet.' },
  { q: 'How do I administer eye-drop vaccines correctly?', a: 'Hold the bird securely, tilt the head, and instil one full drop into the eye. Wait for the bird to blink and absorb the drop (2–3 seconds) before releasing. Do not squeeze the dropper against the eye.' },
  { q: 'Can I mix vaccines with antibiotics in water?', a: 'No. Antibiotics, disinfectants, and chlorinated tap water will inactivate live vaccines. Use clean, unchlorinated water for vaccine administration. Remove antibiotics from water 24 hours before and 24 hours after vaccination.' },
  { q: 'What happens if I miss a scheduled vaccination?', a: 'Administer the missed vaccine as soon as possible. Do not double-dose to compensate. Adjust subsequent intervals from the new date. If more than 2 weeks has passed on a critical vaccine (ND, IBD), restart from that point and extend intervals.' },
];

const VaccinationGuidePage = () => (
  <main className="guide-page">
    {/* ── HERO ── */}
    <section className="guide-hero">
      <div className="guide-hero__bg" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1800&q=80')` }} />
      <div className="container guide-hero__content">
        <motion.span className="overline" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>Learning Hub</motion.span>
        <motion.h1 className="section-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}>
          Vaccination<br /><em>Programme Guide.</em>
        </motion.h1>
        <motion.p className="body-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.35 }}>
          A complete, field-tested vaccination schedule for layers and broilers — fully adapted for East African disease conditions. Updated with the latest vaccine products available in Uganda.
        </motion.p>
        <motion.div className="guide-hero__meta" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
          <span className="guide-tag"><Shield size={13} /> Verified by Oval Farm Vet Team</span>
          <span className="guide-tag"><BookOpen size={13} /> Updated March 2026</span>
          <span className="guide-tag"><Syringe size={13} /> Broilers & Layers</span>
        </motion.div>
      </div>
    </section>

    {/* ── ALERT BANNER ── */}
    <div className="guide-alert-banner">
      <div className="container guide-alert-banner__inner">
        <AlertTriangle size={18} />
        <p><strong>Important:</strong> Never vaccinate sick birds. Always consult a licensed veterinarian before adjusting this programme for your specific farm conditions. Vaccination is one pillar of flock health — combine it with biosecurity, nutrition, and good management.</p>
      </div>
    </div>

    {/* ── LAYER TABLE ── */}
    <section className="guide-section section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Layer Chickens</span>
          <div className="rule" />
          <h2 className="section-title">Layer Vaccination<br />Programme.</h2>
          <p className="body-text">This programme covers the full life cycle of a layer flock — from day-old hatch through to 72+ weeks of lay. Follow this schedule to protect your productive flock from the most economically damaging poultry diseases in Uganda.</p>
        </motion.div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Age</th>
                <th>Disease</th>
                <th>Vaccine</th>
                <th>Route</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {layerVaccinations.map((v, i) => (
                <motion.tr key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}>
                  <td><strong style={{ color: 'var(--accent-red)' }}>{v.age}</strong></td>
                  <td style={{ fontWeight: 600, color: 'var(--text)' }}>{v.disease}</td>
                  <td style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.88rem' }}>{v.vaccine}</td>
                  <td>{v.route}</td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{v.remarks}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* ── BROILER TABLE ── */}
    <section className="guide-section guide-section--alt">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Broiler Chickens</span>
          <div className="rule" />
          <h2 className="section-title">Broiler Vaccination<br />Programme.</h2>
          <p className="body-text">Broilers have a shorter cycle (5–6 weeks), so the vaccination programme is more concentrated. Early protection against Newcastle and Gumboro is non-negotiable.</p>
        </motion.div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Age</th>
                <th>Disease</th>
                <th>Vaccine</th>
                <th>Route</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {broilerVaccinations.map((v, i) => (
                <motion.tr key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                  <td><strong style={{ color: 'var(--olive)' }}>{v.age}</strong></td>
                  <td style={{ fontWeight: 600, color: 'var(--text)' }}>{v.disease}</td>
                  <td style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.88rem' }}>{v.vaccine}</td>
                  <td>{v.route}</td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{v.remarks}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* ── IMPORTANT NOTES ── */}
    <section className="guide-notes">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Field Notes</span>
          <div className="rule" />
          <h2 className="section-title">Critical rules<br />for every vaccination.</h2>
        </motion.div>
        <div className="notes-grid">
          {importantNotes.map((note, i) => (
            <motion.div key={i} className="note-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}>
              <span className="note-num">0{i + 1}</span>
              <p>{note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── DISEASE GUIDE ── */}
    <section className="guide-section section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Disease Recognition</span>
          <div className="rule" />
          <h2 className="section-title">Know the diseases<br />you're vaccinating against.</h2>
          <p className="body-text">Understanding the diseases helps you recognise outbreaks early — even in a vaccinated flock — and respond appropriately. Knowledge saves lives and money.</p>
        </motion.div>
        <div className="disease-grid">
          {diseases.map((d, i) => (
            <motion.div key={i} className={`disease-card disease-card--${d.severity}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (i % 3) * 0.12 }}>
              <div className="disease-card__header">
                <h4>{d.name}</h4>
                <span className={`severity-badge severity-badge--${d.severity}`}>{d.severity === 'critical' ? '⚠ Critical' : d.severity === 'high' ? '! High Risk' : '~ Moderate'}</span>
              </div>
              <div className="disease-card__body">
                <p className="disease-label">Signs &amp; Symptoms:</p>
                <ul>{d.signs.map((s, j) => <li key={j}><CheckCircle size={12} />{s}</li>)}</ul>
                <div className="disease-row">
                  <div>
                    <p className="disease-label">Prevention</p>
                    <p>{d.prevention}</p>
                  </div>
                  <div>
                    <p className="disease-label">Treatment</p>
                    <p>{d.treatment}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── FAQ ── */}
    <section className="guide-faq">
      <div className="container guide-2col">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Vaccine FAQs</span>
          <div className="rule" />
          <h2 className="section-title">Questions every<br />farmer asks.</h2>
          <p className="body-text">Based on hundreds of farm visits and advisory calls across Uganda, these are the most common vaccination questions — answered honestly.</p>
        </motion.div>
        <FAQ items={vaccineFaqs} />
      </div>
    </section>

    {/* ── MORE GUIDES ── */}
    <section className="guide-related">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Learning Hub</span>
          <div className="rule" />
          <h2 className="section-title">More guides<br />for your farm.</h2>
        </motion.div>
        <div className="related-grid">
          {[
            { to: '/learn/biosecurity', title: 'Biosecurity & Hygiene', desc: 'Prevent disease entry through strict biosecurity protocols — the cheapest disease control tool you have.' },
            { to: '/learn/brooding', title: 'Brooding Management', desc: 'Temperature, humidity, lighting, and water schedules for the critical first 14 days of a chick\'s life.' },
            { to: '/learn/health', title: 'Health Management', desc: 'How to spot sick birds early, set up a treatment protocol, and keep accurate flock health records.' },
            { to: '/learn/records', title: 'Record Keeping', desc: 'Simple record-keeping templates that identify problems before they become catastrophes.' },
          ].map((r, i) => (
            <motion.div key={i} className="related-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
              <Link to={r.to} className="related-link">Read Guide <ArrowRight size={14} /></Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="guide-cta">
      <motion.div className="container guide-cta__inner" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <span className="overline">Need help?</span>
        <h2 className="section-title">Talk to our vet team — for free.</h2>
        <p className="body-text">Every purchase of 200+ chicks from Oval includes a complimentary farm advisory call. Our qualified veterinary team will help you design a vaccination and health programme tailored to your farm.</p>
        <div className="guide-cta__buttons">
          <Link to="/checkout?product=chicks" className="btn btn-solid">Order Chicks <ArrowRight size={16} /></Link>
          <a href="tel:+256539802" className="btn btn-outline-light">Call +256 539 802</a>
        </div>
      </motion.div>
    </section>
  </main>
);

export default VaccinationGuidePage;
