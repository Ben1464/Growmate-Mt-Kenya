import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { format, parseISO, eachMonthOfInterval, startOfYear, endOfYear } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ProgressChart = ({ targetType, customers, subregions, targets, sales = [] }) => {
  const [entityId, setEntityId] = useState('');
  const [period, setPeriod] = useState('monthly');
  const [year, setYear] = useState(new Date().getFullYear());

  const entities = targetType === 'customer' ? customers : subregions;
  const entitySales = sales.filter(sale => 
    (targetType === 'customer' ? sale.customerId === entityId : sale.subregionId === entityId) &&
    new Date(sale.date).getFullYear() === parseInt(year)
  );

  const selectedTarget = targets.find(target => 
    (targetType === 'customer' ? target.customerId === entityId : target.subregionId === entityId) && 
    target.period === period && 
    target.year === parseInt(year)
  );

  // Calculate actual sales data based on period
  const getActualData = () => {
    if (!entityId || entitySales.length === 0) return Array(period === 'monthly' ? 12 : period === 'quarterly' ? 4 : 1).fill(0);

    if (period === 'monthly') {
      const monthlySales = Array(12).fill(0);
      entitySales.forEach(sale => {
        const month = new Date(sale.date).getMonth();
        monthlySales[month] += sale.amount;
      });
      return monthlySales;
    } else if (period === 'quarterly') {
      const quarterlySales = Array(4).fill(0);
      entitySales.forEach(sale => {
        const month = new Date(sale.date).getMonth();
        const quarter = Math.floor(month / 3);
        quarterlySales[quarter] += sale.amount;
      });
      return quarterlySales;
    } else {
      // Annual
      const annualTotal = entitySales.reduce((sum, sale) => sum + sale.amount, 0);
      return [annualTotal];
    }
  };

  const actualData = getActualData();
  const targetData = selectedTarget 
    ? period === 'monthly' 
      ? Array(12).fill(selectedTarget.amount / 12)
      : period === 'quarterly'
        ? Array(4).fill(selectedTarget.amount / 4)
        : [selectedTarget.amount]
    : Array(period === 'monthly' ? 12 : period === 'quarterly' ? 4 : 1).fill(0);

  const chartData = {
    labels: period === 'monthly' ? 
      ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] :
      period === 'quarterly' ? ['Q1', 'Q2', 'Q3', 'Q4'] : ['Annual'],
    datasets: [
      {
        label: 'Target',
        data: targetData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Actual',
        data: actualData,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  const calculateProgress = () => {
    if (!selectedTarget || selectedTarget.amount === 0) return 0;
    const totalActual = actualData.reduce((a, b) => a + b, 0);
    return Math.min(100, (totalActual / selectedTarget.amount * 100));
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>{targetType === 'customer' ? 'Customer' : 'Subregion'} Progress</h3>
      </div>
      <div className="card-body">
        <div className="form-group">
          <label>{targetType === 'customer' ? 'Customer' : 'Subregion'}</label>
          <select
            className="form-control"
            value={entityId}
            onChange={(e) => setEntityId(e.target.value)}
          >
            <option value="">Select {targetType === 'customer' ? 'Customer' : 'Subregion'}</option>
            {entities.map((entity) => (
              <option key={entity.id} value={entity.id}>
                {entity.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Period</label>
          <select
            className="form-control"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annual">Annual</option>
          </select>
        </div>
        <div className="form-group">
          <label>Year</label>
          <select
            className="form-control"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        {entityId && (
          <div className="chart-container">
            <Bar data={chartData} options={{ responsive: true }} />
            {selectedTarget && (
              <div className="mt-3">
                <p>
                  <strong>Progress:</strong> {calculateProgress().toFixed(2)}%
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};