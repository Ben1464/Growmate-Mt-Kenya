import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CustomersPage } from './pages/CustomersPage';
import { SubregionsPage } from './pages/SubregionsPage';
import { SalesPage } from './pages/SalesPage';
import { TargetsPage } from './pages/TargetsPage';
import { Navbar } from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/customers" replace />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/subregions" element={<SubregionsPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/targets" element={<TargetsPage />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;