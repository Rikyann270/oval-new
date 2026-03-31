import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, AlertTriangle, Thermometer, Sun, Droplets, ChevronDown, Wind } from 'lucide-react';
import './GuidePage.css';

const broodingSchedule = [
  { period: 'Day 1–3', temp: '35°C', humidity: '65–70%', light: '24 hours', feed: 'Starter crumbles in shallow trays', water: 'Warm water (25°C)', density: '30–40 chicks/m²' },
  { period: 'Day 4–7', temp: '33–34°C', humidity: '62–67%', light: '23 hours', feed: 'Starter crumbles — mini feeders', water: 'Clean, room temp', density: '30 chicks/m²' },
  { period: 'Week 2', temp: '30–32°C', humidity: '60–65%', light: '20–22 hours', feed: 'Starter crumbles', water: 'Ad libitum', density: '25 chicks/m²' },
  { period: 'Week 3', temp: '27–30°C', humidity: '55–60%', light: '18–20 hours', feed: 'Transition to starter/grower mix', water: 'Ad libitum', density: '20 chicks/m²' },
  { period: 'Week 4', temp: '24–27°C', humidity: '50–58%', light: '16–18 hours', feed: 'Grower mash or pellets', water: 'Ad libitum', density: '15 chicks/m²' },
  { period: 'Week 5+', temp: 'Ambient (>20°C)', humidity: 'Ambient', light: '16–18 hours', feed: 'Grower / Finisher', water: 'Ad libitum', density: '10–12 chicks/m² (broilers)' },
];

const broodingSteps = [
  {
    num: '01', title: 'Prepare the House 7 Days Before Arrival',
    body: 'A cold, damp house is as dangerous as no house at all. Start preparation at least 7 days before the chicks arrive.',
    points: [
      'Complete cleaning and disinfection at least 5 days before placement',
      'Spread fresh litter (wood shavings, rice husks) 5–7cm deep across the floor',
      'Pre-heat the brooder zone to 35°C a full 24 hours before chicks arrive',
      'Check all equipment: brooders, drinkers, feeders, ventilation are working',
      'Install a reliable thermometer at chick level — eye-level to a chick is 5–7cm above litter',
    ],
  },
  {
    num: '02', title: 'Chick Arrival Protocol',
    body: 'The first 6 hours after placement are critical. Stressed, cold, or dehydrated chicks often die in the first week, not from disease, but from mismanagement at arrival.',
    points: [
      'Count chicks and record any dead-on-arrival for claim purposes',
      'Place chicks gently near the edge of the feeding/drinking area — not directly under the brooder',
      'Dip all chicks\' beaks in the drinker on arrival — don\'t assume they will find water themselves',
      'Add 5% glucose + electrolyte solution to the water for the first 6 hours',
      'Observe chick distribution for the first 30 minutes — use this to diagnose temperature',
    ],
  },
  {
    num: '03', title: 'Reading Chick Behaviour for Temperature',
    body: 'Your chicks are the best thermometer you have. Check the pattern of birds at least every 4 hours — especially overnight.',
    points: [
      'IDEAL: Chicks spread evenly across the brooding area, active, chirping softly',
      'TOO COLD: Chicks huddle tightly under brooder in a pile — risk of smothering',
      'TOO HOT: Chicks spread to edges or corners, panting, wings drooping',
      'DRAUGHT: Chicks huddle to one side or corner depending on wind direction',
      'Action: adjust brooder height or fuel immediately; never wait until morning',
    ],
  },
  {
    num: '04', title: 'Water & Feed Management',
    body: 'Chicks that don\'t drink in the first 6 hours suffer intestinal tract damage that permanently reduces their growth potential. Water is more urgent than feed on Day 1.',
    points: [
      'Provide 1 round drinker per 80 chicks for the first 7 days',
      'Clean and refill drinkers at least twice daily — bacterial growth in warm water is rapid',
      'Never provide cold water to young chicks (Day 1–3) — tepid water only',
      'Provide 1 chick feeder tray per 50 chicks for the first 7 days',
      'Sprinkle feed on paper beside chicks for the first 2 days to stimulate interest',
    ],
  },
  {
    num: '05', title: 'Ventilation & Air Quality',
    body: 'Good air quality means adequate oxygen, low CO2, low ammonia (NH3), and low dust. Ammonia above 25ppm causes eye damage, respiratory disease, and growth depression.',
    points: [
      'If you can smell ammonia when you enter the house — it is already too high. Increase ventilation.',
      'In cold weather, balance warmth with just enough ventilation to keep ammonia low',
      'Open curtains partially in the morning and gradually wider as temperatures warm',
      'Stir litter every 3–4 days to prevent wet, caked areas forming',
      'Check ventilation fans or curtain ropes — one stuck open or closed causes major problems',
    ],
  },
  {
    num: '06', title: 'Litter Management',
    body: 'Litter is the most neglected management tool in poultry farming. Wet litter causes coccidiosis, footpad dermatitis, breast blisters, and ammonia buildup. Good litter management doubles as disease prevention.',
    points: [
      'Check litter moisture daily — it should feel like a dry crumble, not a damp ball',
      'Identify and fix the source of wet patches: leaking drinkers, wall seepage, or rain ingress',
      'Add fresh dry litter over wet spots — never leave wet patches uncovered',
      'Turn litter every 3–5 days to aerate and prevent caking under feeders and drinkers',
      'Aim for litter depth of 5–8cm throughout the cycle — top up as needed',
    ],
  },
];

const commonMistakes = [
  { mistake: 'Pre-heating the house only 2 hours before chick placement', fix: 'Litter temperature needs 24 hours to warm up. Cold litter chills chicks from below even if air temperature is correct.' },
  { mistake: 'Providing water straight from a cold pipe or borehole', fix: 'Cold water causes gut shock and reduced drinker uptake. Always use warm water (25°C) for the first 3 days.' },
  { mistake: 'Setting brooder temperature too high in Week 3', fix: 'Over-brooding suppresses appetite, stunts growth, and causes heat stress. Reduce temperature by 3°C every week on schedule.' },
  { mistake: 'Not observing chicks at night', fix: 'Temperature drops at night and nights are when most smothering deaths occur. Check birds at 9 PM and 1 AM for the first 2 weeks.' },
  { mistake: 'Using wet or dusty litter from the start', fix: 'Dusty litter causes respiratory irritation from Day 1. Litter should be completely dry and dust-free before chick placement.' },
  { mistake: 'Overcrowding beyond recommended stocking densities', fix: 'Every extra bird above density recommendation costs you 3–5% on FCR. Crowding causes aggression, heat stress, and disease spread.' },
];

const faqs = [
  { q: 'What is the best brooder type for small-scale farmers?', a: 'Gas brooders (radiant disc type) are the most cost-effective and reliable. They heat large areas evenly and have low running costs. Electric hover brooders work well too. Avoid open flame lamps — they are a fire risk and create uneven heat zones.' },
  { q: 'How long do I need to use the brooder?', a: 'Until chicks no longer need supplemental heat — typically when ambient temperature stays above 25°C during the day and above 20°C at night. In Uganda\'s highlands, this can be up to 4–5 weeks. On the hot lowlands, brooding may only be needed for 2–3 weeks.' },
  { q: 'My chicks are pasting (sticky vents) — what do I do?', a: 'Pasting is caused by chilling, high stress, or bacterial infection. Gently remove the paste with a warm damp cloth — never pull it off dry. Increase brooder temperature by 1–2°C. Add electrolytes and probiotics to water. If it persists beyond Day 3, call your vet.' },
  { q: 'Can I brood chicks on the floor and in raised cages?', a: 'Floor brooding (deep litter) is the most common and recommended for small flocks. Cage brooding is used in commercial hatcheries. For floor brooding, ensure litter quality is maintained and stocking density does not exceed 30 chicks/m² in Week 1.' },
];

const BroodingGuidePage = () => (
  <main className="guide-page">
    <section className="guide-hero">
      <div className="guide-hero__bg" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1548509925-0e784d1db4fa?auto=format&fit=crop&w=1800&q=80')` }} />
      <div className="container guide-hero__content">
        <motion.span className="overline" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>Learning Hub</motion.span>
        <motion.h1 className="section-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}>
          Brooding<br /><em>Management Guide.</em>
        </motion.h1>
        <motion.p className="body-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.35 }}>
          The first 14 days determine 60% of a bird's final performance. Master temperature, humidity, water, feed, ventilation, and litter — and your flock will never look back.
        </motion.p>
        <motion.div className="guide-hero__meta" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
          <span className="guide-tag"><Thermometer size={13} /> Temperature Control</span>
          <span className="guide-tag"><Droplets size={13} /> Humidity & Water</span>
          <span className="guide-tag"><Wind size={13} /> Ventilation</span>
        </motion.div>
      </div>
    </section>

    <div className="guide-alert-banner">
      <div className="container guide-alert-banner__inner">
        <AlertTriangle size={18} />
        <p><strong>Critical:</strong> Pre-heat your brooder house 24 hours before chick placement — not 2 hours. Litter temperature at chick level must be at target before the first chick arrives.</p>
      </div>
    </div>

    <section className="guide-section section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Week-by-Week Schedule</span>
          <div className="rule" />
          <h2 className="section-title">Brooding parameters<br />by age.</h2>
          <p className="body-text">Follow this schedule exactly. Deviations — even small ones — compound into significant losses by Week 6. Temperature management is the most impactful variable in broiler profitability.</p>
        </motion.div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Period</th><th>Temperature</th><th>Humidity</th><th>Lighting</th><th>Feed</th><th>Water</th><th>Density</th></tr>
            </thead>
            <tbody>
              {broodingSchedule.map((row, i) => (
                <motion.tr key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <td><strong style={{ color: 'var(--accent-red)' }}>{row.period}</strong></td>
                  <td style={{ fontWeight: 600 }}>{row.temp}</td>
                  <td>{row.humidity}</td>
                  <td>{row.light}</td>
                  <td>{row.feed}</td>
                  <td>{row.water}</td>
                  <td style={{ fontSize: '0.83rem' }}>{row.density}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section className="guide-section--alt" style={{ padding: '8rem 0' }}>
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Step-by-Step Protocol</span>
          <div className="rule" />
          <h2 className="section-title">From empty house<br />to thriving flock.</h2>
        </motion.div>
        <div className="guide-steps">
          {broodingSteps.map((step, i) => (
            <motion.div key={i} className="guide-step" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
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

    <section className="guide-notes">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Common Mistakes</span>
          <div className="rule" />
          <h2 className="section-title">6 brooding mistakes<br />that kill profits.</h2>
        </motion.div>
        <div className="notes-grid">
          {commonMistakes.map((m, i) => (
            <motion.div key={i} className="note-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}>
              <span className="note-num">0{i + 1}</span>
              <div>
                <p style={{ color: '#fff', fontWeight: 700, marginBottom: '0.4rem' }}>{m.mistake}</p>
                <p style={{ color: 'rgba(253,250,242,0.6)', fontSize: '0.85rem' }}>{m.fix}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="guide-faq">
      <div className="container guide-2col">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="overline">Brooding FAQs</span><div className="rule" /><h2 className="section-title">Brooding questions answered.</h2>
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
          <span className="overline">Learning Hub</span><div className="rule" /><h2 className="section-title">More farm guides.</h2>
        </motion.div>
        <div className="related-grid">
          {[
            { to: '/learn/vaccination', title: 'Vaccination Guide', desc: 'Full vaccination schedules for broilers and layers.' },
            { to: '/learn/biosecurity', title: 'Biosecurity & Hygiene', desc: 'Prevent disease entry through strict biosecurity protocols.' },
            { to: '/learn/health', title: 'Health Management', desc: 'Spot sick birds early and respond correctly.' },
            { to: '/learn/records', title: 'Record Keeping', desc: 'Daily record templates that cut farm losses.' },
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
        <span className="overline">Start your cycle</span>
        <h2 className="section-title">Order your next flock today.</h2>
        <p className="body-text">Apply this brooding guide with Oval chicks and our 4-phase feed programme for maximum results from Day 1.</p>
        <div className="guide-cta__buttons">
          <Link to="/checkout?product=chicks" className="btn btn-solid">Order Chicks <ArrowRight size={16} /></Link>
          <a href="tel:+256539802" className="btn btn-outline-light">Call +256 539 802</a>
        </div>
      </motion.div>
    </section>
  </main>
);

export default BroodingGuidePage;
