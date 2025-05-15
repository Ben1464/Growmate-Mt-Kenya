import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaMapMarkerAlt, FaChartLine, FaBullseye } from 'react-icons/fa';

export const MobileNav = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="mobile-nav">
      <Link 
        to="/dashboard" 
        className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
      >
        <FaHome className="nav-icon" />
        <span>Dashboard</span>
      </Link>
      <Link 
        to="/customers" 
        className={`nav-item ${isActive('/customers') ? 'active' : ''}`}
      >
        <FaUsers className="nav-icon" />
        <span>Customers</span>
      </Link>
      <Link 
        to="/subregions" 
        className={`nav-item ${isActive('/subregions') ? 'active' : ''}`}
      >
        <FaMapMarkerAlt className="nav-icon" />
        <span>Subregions</span>
      </Link>
      <Link 
        to="/sales" 
        className={`nav-item ${isActive('/sales') ? 'active' : ''}`}
      >
        <FaChartLine className="nav-icon" />
        <span>Sales</span>
      </Link>
      <Link 
        to="/targets" 
        className={`nav-item ${isActive('/targets') ? 'active' : ''}`}
      >
        <FaBullseye className="nav-icon" />
        <span>Targets</span>
      </Link>
    </nav>
  );
};