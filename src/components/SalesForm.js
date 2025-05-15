import React, { useState } from 'react';
import { format } from 'date-fns';

export const SalesForm = ({ customers, onAddSale }) => {
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!customerId || !amount || !date) {
      setSubmissionStatus('error');
      return;
    }

    onAddSale({
      customerId,
      amount: parseFloat(amount),
      date,
      id: Date.now().toString() // Generate unique ID
    });

    // Reset form
    setCustomerId('');
    setAmount('');
    setDate(format(new Date(), 'yyyy-MM-dd'));
    setSubmissionStatus('success');
    
    // Clear success message after 3 seconds
    setTimeout(() => setSubmissionStatus(null), 3000);
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Customer *</label>
            <select
              className="form-control"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              required
            >
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Amount *</label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          
          {submissionStatus === 'success' && (
            <div className="alert alert-success mt-3">
              Sale recorded successfully!
            </div>
          )}
          
          {submissionStatus === 'error' && (
            <div className="alert alert-danger mt-3">
              Please fill all required fields correctly.
            </div>
          )}
          
          <button type="submit" className="btn btn-primary btn-block mt-3">
            Record Sale
          </button>
        </form>
      </div>
    </div>
  );
};