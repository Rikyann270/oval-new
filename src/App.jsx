import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ChicksPage from './pages/ChicksPage';
import FeedsPage from './pages/FeedsPage';
import EquipmentPage from './pages/EquipmentPage';
import CheckoutPage from './pages/CheckoutPage';
import VaccinationGuidePage from './pages/VaccinationGuidePage';
import BiosecurityPage from './pages/BiosecurityPage';
import BroodingGuidePage from './pages/BroodingGuidePage';
import HealthManagementPage from './pages/HealthManagementPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/chicks" element={<ChicksPage />} />
          <Route path="/products/feeds" element={<FeedsPage />} />
          <Route path="/products/equipment" element={<EquipmentPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* Learning Hub */}
          <Route path="/learn/vaccination" element={<VaccinationGuidePage />} />
          <Route path="/learn/biosecurity" element={<BiosecurityPage />} />
          <Route path="/learn/brooding" element={<BroodingGuidePage />} />
          <Route path="/learn/health" element={<HealthManagementPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
