import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { format, parseISO, eachMonthOfInterval, startOfYear, endOfYear, eachQuarterOfInterval } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const SalesReport = ({ sales, customers }) => {
  const [reportType, setReportType] = useState('monthly');
  const [customerId, setCustomerId] = useState('all');
  const [year, setYear] = useState(new Date().getFullYear());

  const filteredSales = sales.filter(sale => {
    const saleDate = parseISO(sale.date);
    const saleYear = saleDate.getFullYear();
    
    if (customerId !== 'all' && sale.customerId !== customerId) return false;
    if (saleYear !== parseInt(year)) return false;
    
    return true;
  });

  const generateReportData = () => {
    if (reportType === 'monthly') {
      const months = eachMonthOfInterval({
        start: startOfYear(new Date(year, 0, 1)),
        end: endOfYear(new Date(year, 11, 31))
      }).map(month => format(month, 'MMM'));
      
      const monthlyData = months.map((month, index) => {
        const monthSales = filteredSales.filter(sale => {
          const saleDate = parseISO(sale.date);
          return saleDate.getMonth() === index;
        });
        return monthSales.reduce((sum, sale) => sum + sale.amount, 0);
      });
      
      return {
        labels: months,
        datasets: [
          {
            label: 'Monthly Sales',
            data: monthlyData,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      };
    } else if (reportType === 'quarterly') {
      const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
      
      const quarterlyData = quarters.map((quarter, index) => {
        const quarterSales = filteredSales.filter(sale => {
          const saleDate = parseISO(sale.date);
          const saleMonth = saleDate.getMonth();
          return Math.floor(saleMonth / 3) === index;
        });
        return quarterSales.reduce((sum, sale) => sum + sale.amount, 0);
      });
      
      return {
        labels: quarters,
        datasets: [
          {
            label: 'Quarterly Sales',
            data: quarterlyData,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      };
    } else {
      // Annual
      const annualTotal = filteredSales.reduce((sum, sale) => sum + sale.amount, 0);
      
      return {
        labels: ['Annual Sales'],
        datasets: [
          {
            label: 'Annual Sales',
            data: [annualTotal],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };
    }
  };

  const reportData = generateReportData();

  return (
    <div className="card">
      <div className="card-header">
        <h3>Sales Report</h3>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label>Report Type</label>
          <select
            className="form-control"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annual">Annual</option>
          </select>
        </div>
        <div className="form-group">
          <label>Customer</label>
          <select
            className="form-control"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          >
            <option value="all">All Customers</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Year</label>
          <select
            className="form-control"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className="chart-container">
          <Bar data={reportData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};