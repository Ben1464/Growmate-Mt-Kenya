import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { CustomersPage } from './pages/CustomersPage';
import { SubregionsPage } from './pages/SubregionsPage';
import { SalesPage } from './pages/SalesPage';
import { TargetsPage } from './pages/TargetsPage';
import { MobileNav } from './components/MobileNav';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="app-content">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/subregions" element={<SubregionsPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/targets" element={<TargetsPage />} />
          </Routes>
        </div>
        <MobileNav />
      </div>
    </Router>
  );
}

export default App;