import React, { useMemo } from 'react';
import { useAppStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaChartLine, FaMapMarkedAlt, FaDollarSign } from 'react-icons/fa';
import { format, subMonths, startOfYear, isThisYear } from 'date-fns';

interface DashboardCardProps {
  title: string;
  value: React.ReactNode;
  description?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  description,
  icon,
  onClick,
  className = '',
  children,
}) => {
  return (
    <div 
      className={`dashboard-card ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      <div className="card-content">
        <div className="card-header">
          <div className="card-icon">{icon}</div>
          <h3>{title}</h3>
        </div>
        <div className="metric-value">{value}</div>
        {description && <div className="metric-label">{description}</div>}
        {children}
      </div>
    </div>
  );
};

interface MetricItemProps {
  value: React.ReactNode;
  label: string;
}

const MetricItem: React.FC<MetricItemProps> = ({ value, label }) => (
  <div className="metric-item">
    <span className="metric-value">{value}</span>
    <span className="metric-label">{label}</span>
  </div>
);

export const DashboardPage = () => {
  const { sales, customers, subregions, getSubregionSales, isLoading } = useAppStore();
  const navigate = useNavigate();

  // Memoized calculations
  const { ytdSales, currentMonthSales, previousMonthSales, momGrowth, topSubregion } = useMemo(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = format(currentDate, 'MMMM yyyy');
    const prevMonth = format(subMonths(currentDate, 1), 'MMMM yyyy');

    // Calculate YTD sales
    const ytdSales = sales
      .filter(sale => isThisYear(new Date(sale.date)))
      .reduce((sum, sale) => sum + sale.amount, 0);

    // Calculate current month sales
    const currentMonthSales = sales
      .filter(sale => format(new Date(sale.date), 'MMMM yyyy') === currentMonth)
      .reduce((sum, sale) => sum + sale.amount, 0);

    // Calculate previous month sales
    const previousMonthSales = sales
      .filter(sale => format(new Date(sale.date), 'MMMM yyyy') === prevMonth)
      .reduce((sum, sale) => sum + sale.amount, 0);

    // Calculate month-over-month growth
    const momGrowth = previousMonthSales
      ? ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100
      : currentMonthSales > 0 ? 100 : 0;

    // Get top performing subregion
    const subregionPerformance = subregions.map(subregion => {
      const subregionSales = getSubregionSales(subregion.id);
      const currentMonthSubregionSales = subregionSales
        .filter(sale => format(new Date(sale.date), 'MMMM yyyy') === currentMonth)
        .reduce((sum, sale) => sum + sale.amount, 0);
      
      return {
        name: subregion.name,
        sales: currentMonthSubregionSales
      };
    }).sort((a, b) => b.sales - a.sales);

    const topSubregion = subregionPerformance[0]?.name || 'N/A';

    return {
      ytdSales,
      currentMonthSales,
      previousMonthSales,
      momGrowth,
      topSubregion
    };
  }, [sales, subregions, getSubregionSales]);

  const currentMonth = format(new Date(), 'MMMM');
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  if (isLoading) {
    return <div className="dashboard-loading">Loading dashboard data...</div>;
  }

  if (sales.length === 0 || customers.length === 0) {
    return (
      <div className="dashboard-empty">
        <h1 className="page-title">Sales Dashboard</h1>
        <p>No data available. Please add sales or customer data to view dashboard metrics.</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1 className="page-title">Sales Dashboard</h1>
      
      <div className="dashboard-cards">
        {/* Overview Card */}
        <DashboardCard
          title="Growmate Mt Kenya"
          icon={<FaUsers className="card-icon" />}
          value={
            <div className="metrics-grid">
              <MetricItem value={customers.length} label="Total Customers" />
              <MetricItem value={subregions.length} label="Subregions" />
              <MetricItem value={topSubregion} label="Top Subregion" />
            </div>
          }
          className="overview-card"
        />

        {/* YTD Sales Card */}
        <DashboardCard
          title="Year to Date"
          icon={<FaChartLine className="card-icon" />}
          value={currencyFormatter.format(ytdSales)}
          description="All Subregions Combined"
          onClick={() => navigate('/sales')}
          className="sales-card"
        >
          <div className="metric-trend">
            <span>Since {format(startOfYear(new Date()), 'MMM d')}</span>
          </div>
        </DashboardCard>

        {/* Monthly Sales Card */}
        <DashboardCard
          title={`${currentMonth} Sales`}
          icon={<FaDollarSign className="card-icon" />}
          value={currencyFormatter.format(currentMonthSales)}
          onClick={() => navigate('/sales')}
          className="monthly-card"
        >
          <div className={`metric-trend ${momGrowth >= 0 ? 'positive' : 'negative'}`}>
            <FaChartLine className="trend-icon" />
            <span>
              {momGrowth >= 0 ? '+' : ''}
              {momGrowth.toFixed(1)}% vs last month
            </span>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};