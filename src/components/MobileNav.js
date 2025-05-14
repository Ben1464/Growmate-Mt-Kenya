import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaMapMarkerAlt, FaChartLine, FaBullseye } from 'react-icons/fa';

export const MobileNav = () => {
  return (
    <nav className="mobile-nav">
      <Link to="/customers" className="nav-item">
        <FaUsers className="nav-icon" />
        <span>Customers</span>
      </Link>
      <Link to="/subregions" className="nav-item">
        <FaMapMarkerAlt className="nav-icon" />
        <span>Subregions</span>
      </Link>
      <Link to="/sales" className="nav-item">
        <FaChartLine className="nav-icon" />
        <span>Sales</span>
      </Link>
      <Link to="/targets" className="nav-item">
        <FaBullseye className="nav-icon" />
        <span>Targets</span>
      </Link>
    </nav>
  );
};