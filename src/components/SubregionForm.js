import React, { useState } from 'react';

export const SubregionForm = ({ onAddSubregion }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSubregion({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>Add New Subregion</h3>
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
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Subregion
          </button>
        </form>
      </div>
    </div>
  );
};