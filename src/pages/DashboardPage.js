import React from 'react';
import { useAppStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaChartLine, FaMapMarkedAlt, FaDollarSign } from 'react-icons/fa';
import { format, subMonths, startOfYear, isThisYear } from 'date-fns';

export const DashboardPage = () => {
  const { sales, customers, subregions, getSubregionSales } = useAppStore();
  const navigate = useNavigate();

  // Calculate YTD sales
  const currentYear = new Date().getFullYear();
  const ytdSales = sales
    .filter(sale => {
      const saleDate = new Date(sale.date);
      return isThisYear(saleDate);
    })
    .reduce((sum, sale) => sum + sale.amount, 0);

  // Calculate current month sales
  const currentMonth = format(new Date(), 'MMMM');
  const currentMonthSales = sales
    .filter(sale => {
      const saleDate = new Date(sale.date);
      return format(saleDate, 'MMMM yyyy') === format(new Date(), 'MMMM yyyy');
    })
    .reduce((sum, sale) => sum + sale.amount, 0);

  // Calculate month-over-month growth
  const previousMonthSales = sales
    .filter(sale => {
      const saleDate = new Date(sale.date);
      return format(saleDate, 'MMMM yyyy') === format(subMonths(new Date(), 1), 'MMMM yyyy');
    })
    .reduce((sum, sale) => sum + sale.amount, 0);

  const momGrowth = previousMonthSales
    ? ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100
    : 0;

  // Get top performing subregion
  const subregionPerformance = subregions.map(subregion => {
    const subregionSales = getSubregionSales(subregion.id);
    const currentMonthSubregionSales = subregionSales
      .filter(sale => format(new Date(sale.date), 'MMMM yyyy') === format(new Date(), 'MMMM yyyy'))
      .reduce((sum, sale) => sum + sale.amount, 0);
    
    return {
      name: subregion.name,
      sales: currentMonthSubregionSales
    };
  }).sort((a, b) => b.sales - a.sales);

  const topSubregion = subregionPerformance[0]?.name || 'N/A';

  return (
    <div className="dashboard">
      <h1 className="page-title">Sales Dashboard</h1>
      
      <div className="dashboard-cards">
        {/* Overview Card */}
        <div className="dashboard-card overview-card">
          <div className="card-content">
            <div className="card-header">
              <FaUsers className="card-icon" />
              <h3>Business Overview</h3>
            </div>
            <div className="metrics-grid">
              <div className="metric-item">
                <span className="metric-value">{customers.length}</span>
                <span className="metric-label">Total Customers</span>
              </div>
              <div className="metric-item">
                <span className="metric-value">{subregions.length}</span>
                <span className="metric-label">Subregions</span>
              </div>
              <div className="metric-item">
                <span className="metric-value">{topSubregion}</span>
                <span className="metric-label">Top Subregion</span>
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
            <div className="card-header">
              <FaChartLine className="card-icon" />
              <h3>Year to Date</h3>
            </div>
            <div className="metric-value">${ytdSales.toLocaleString()}</div>
            <div className="metric-label">All Subregions Combined</div>
            <div className="metric-trend">
              <span>Since {format(startOfYear(new Date()), 'MMM d')}</span>
            </div>
          </div>
        </div>

        {/* Monthly Sales Card */}
        <div 
          className="dashboard-card monthly-card"
          onClick={() => navigate('/sales')}
        >
          <div className="card-content">
            <div className="card-header">
              <FaDollarSign className="card-icon" />
              <h3>{currentMonth} Sales</h3>
            </div>
            <div className="metric-value">${currentMonthSales.toLocaleString()}</div>
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