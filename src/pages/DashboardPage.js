import React from 'react';
import { useAppStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaChartLine, FaMapMarkedAlt } from 'react-icons/fa';
import { format, subMonths } from 'date-fns';

export const DashboardPage = () => {
  const { sales, customers, subregions } = useAppStore();
  const navigate = useNavigate();

  // Calculate YTD sales
  const currentYear = new Date().getFullYear();
  const ytdSales = sales
    .filter(sale => new Date(sale.date).getFullYear() === currentYear)
    .reduce((sum, sale) => sum + sale.amount, 0);

  // Calculate current month sales
  const currentMonth = new Date().getMonth();
  const currentMonthSales = sales
    .filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate.getFullYear() === currentYear && saleDate.getMonth() === currentMonth;
    })
    .reduce((sum, sale) => sum + sale.amount, 0);

  // Calculate month-over-month growth
  const previousMonthSales = sales
    .filter(sale => {
      const saleDate = new Date(sale.date);
      const prevMonthDate = subMonths(new Date(), 1);
      return (
        saleDate.getFullYear() === prevMonthDate.getFullYear() &&
        saleDate.getMonth() === prevMonthDate.getMonth()
      );
    })
    .reduce((sum, sale) => sum + sale.amount, 0);

  const momGrowth = previousMonthSales
    ? ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100
    : 0;

  return (
    <div className="dashboard">
      <h1 className="page-title">Sales Dashboard</h1>
      
      <div className="dashboard-cards">
        {/* Overview Card */}
        <div className="dashboard-card overview-card">
          <div className="card-content">
            <h3>Sales Overview</h3>
            <div className="metrics-grid">
              <div className="metric-item">
                <FaUsers className="metric-icon" />
                <span className="metric-value">{customers.length}</span>
                <span className="metric-label">Customers</span>
              </div>
              <div className="metric-item">
                <FaMapMarkedAlt className="metric-icon" />
                <span className="metric-value">{subregions.length}</span>
                <span className="metric-label">Subregions</span>
              </div>
            </div>
          </div>
        </div>

        {/* YTD Sales Card */}
        <div 
          className="dashboard-card sales-card" 
          onClick={() => navigate('/sales')}
        >
          <div className="card-content">
            <h3>Year to Date Sales</h3>
            <div className="metric-value">${ytdSales.toLocaleString()}</div>
            <div className="metric-label">All Subregions</div>
            <div className="metric-trend">
              <FaChartLine className="trend-icon" />
              <span>Current Year</span>
            </div>
          </div>
        </div>

        {/* Monthly Sales Card */}
        <div 
          className="dashboard-card monthly-card"
          onClick={() => navigate('/sales')}
        >
          <div className="card-content">
            <h3>Monthly Sales</h3>
            <div className="metric-value">${currentMonthSales.toLocaleString()}</div>
            <div className="metric-label">
              {format(new Date(), 'MMMM yyyy')}
            </div>
            <div className={`metric-trend ${momGrowth >= 0 ? 'positive' : 'negative'}`}>
              <FaChartLine className="trend-icon" />
              <span>
                {momGrowth >= 0 ? '+' : ''}
                {momGrowth.toFixed(1)}% vs last month
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};