import React from 'react';

export const SubregionList = ({ subregions, onDeleteSubregion }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>Subregion List</h3>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subregions.map((subregion) => (
              <tr key={subregion.id}>
                <td>{subregion.name}</td>
                <td>{subregion.description}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDeleteSubregion(subregion.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};