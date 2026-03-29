import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';

const Home = () => {
  return (
    <main>
      <Hero />
      <Stats />
      <About />
      <Testimonials />
      <CallToAction />
    </main>
  );
};

export default Home;
