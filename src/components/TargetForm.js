import React, { useState } from 'react';

export const TargetForm = ({
  targetType,
  customers,
  subregions,
  onSetCustomerTarget,
  onSetSubregionTarget
}) => {
  const [entityId, setEntityId] = useState('');
  const [period, setPeriod] = useState('monthly');
  const [targetAmount, setTargetAmount] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());

  const handleSubmit = (e) => {
    e.preventDefault();
    const target = {
      entityId,
      period,
      amount: parseFloat(targetAmount),
      year
    };

    if (targetType === 'customer') {
      onSetCustomerTarget({ ...target, customerId: entityId });
    } else {
      onSetSubregionTarget({ ...target, subregionId: entityId });
    }

    setTargetAmount('');
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>Set {targetType === 'customer' ? 'Customer' : 'Subregion'} Target</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{targetType === 'customer' ? 'Customer' : 'Subregion'}</label>
            <select
              className="form-control"
              value={entityId}
              onChange={(e) => setEntityId(e.target.value)}
              required
            >
              <option value="">Select {targetType === 'customer' ? 'Customer' : 'Subregion'}</option>
              {(targetType === 'customer' ? customers : subregions).map((entity) => (
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
              required
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
              required
            >
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Target Amount</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Set Target
          </button>
        </form>
      </div>
    </div>
  );
};