import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section className="hero" ref={ref}>
      {/* Background with lighter treatment */}
      <motion.div className="hero__bg" style={{ y: bgY }}>
        <img
          src="https://img.freepik.com/free-vector/farmers-working-chicken-farm-isolated-flat-vector-illustration-cartoon-woman-man-breeding-poultry-agriculture-domestic-birds_74855-8360.jpg?t=st=1774617832~exp=1774621432~hmac=dc5a40d713d381eebeeb264db7b5cec7be0d867322241e7b6728fe1ca1fc7a68&w=1060"
          alt="Poultry farm"
          className="hero__bg-img"
        />
        <div className="hero__overlay" />
      </motion.div>

      {/* Ghost BG Text */}
      <span className="ghost-number hero__ghost">OVAL</span>

      {/* Content */}
      <motion.div className="hero__content container" style={{ opacity }}>
        {/* Botanical SVG - Darkened for light mode */}
        <div className="hero__botanical" aria-hidden="true">
          <svg viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="botanical-svg">
            <g stroke="rgba(21,24,16,0.3)" strokeWidth="1.2" fill="none">
              {/* Left stems */}
              <path d="M30 110 Q28 80 32 50 Q35 30 30 10" /><ellipse cx="28" cy="18" rx="6" ry="10" transform="rotate(-20 28 18)" />
              <path d="M55 110 Q52 75 58 45 Q60 25 55 5" /><circle cx="55" cy="8" r="6" />
              <path d="M80 110 Q78 85 82 60 Q84 40 79 20" /><ellipse cx="79" cy="24" rx="5" ry="9" transform="rotate(15 79 24)" />
              {/* Center wildflowers */}
              <path d="M200 110 Q198 70 202 35" />
              <circle cx="200" cy="30" r="5" />
              <ellipse cx="200" cy="18" rx="4" ry="8" />
              <ellipse cx="190" cy="25" rx="4" ry="8" transform="rotate(-45 190 25)" />
              <ellipse cx="210" cy="25" rx="4" ry="8" transform="rotate(45 210 25)" />
              <ellipse cx="192" cy="35" rx="4" ry="8" transform="rotate(-70 192 35)" />
              <ellipse cx="208" cy="35" rx="4" ry="8" transform="rotate(70 208 35)" />
              {/* Right stems */}
              <path d="M320 110 Q318 80 322 50 Q325 30 320 10" /><ellipse cx="318" cy="18" rx="6" ry="10" transform="rotate(-20 318 18)" />
              <path d="M345 110 Q348 75 342 48 Q340 28 346 8" /><circle cx="345" cy="11" r="5" />
              <path d="M370 110 Q368 85 372 60 Q374 40 369 20" /><ellipse cx="369" cy="24" rx="5" ry="9" transform="rotate(15 369 24)" />
              {/* Ground line */}
              <path d="M0 112 Q100 108 200 110 Q300 112 400 108" strokeWidth="1" strokeDasharray="4 3" />
            </g>
          </svg>
        </div>

        <motion.span
          className="overline hero__label"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Farm for the Best With us
        </motion.span>

        <motion.h1
          className="section-title hero__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          Oval Poultry Farm
        </motion.h1>

        <motion.p
          className="body-text hero__sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          For all types of Day-old Chicks, Farm Equipments, Feed Additives, Concentrates, Poultry Feeds &amp; Incubators. Quality guaranteed. Delivered to your farm gate.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <Link to="/products" className="btn btn-solid">
            Explore Products <ArrowRight size={16} />
          </Link>
          <a href="#story" className="btn btn-outline">Our Story</a>
        </motion.div>
      </motion.div>

      {/* Scroll cue - dark line */}
      <motion.div className="hero__scroll" style={{ opacity }}>
        <div className="hero__scroll-line" />
      </motion.div>

      {/* Wave bottom transition - matching off-white background */}
      <div className="hero__wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#fdfaf2" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
