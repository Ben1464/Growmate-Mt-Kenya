import React, { useState } from 'react';

export const CustomerForm = ({ onAddCustomer }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subregion, setSubregion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCustomer({ name, email, phone, subregion });
    setName('');
    setEmail('');
    setPhone('');
    setSubregion('');
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>Add New Customer</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Customer name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@example.com"
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
            />
          </div>
          <div className="form-group">
            <label>Subregion</label>
            <input
              type="text"
              className="form-control"
              value={subregion}
              onChange={(e) => setSubregion(e.target.value)}
              placeholder="Subregion name"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Add Customer
          </button>
        </form>
      </div>
    </div>
  );
};