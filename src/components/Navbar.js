import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/customers">Customers</Link></li>
        <li><Link to="/subregions">Subregions</Link></li>
        <li><Link to="/sales">Sales</Link></li>
        <li><Link to="/targets">Targets</Link></li>
      </ul>
    </nav>
  );
};