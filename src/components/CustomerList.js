import React from 'react';

export const CustomerList = ({ customers, onDeleteCustomer }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>Customer List</h3>
      </div>
      <div className="card-body">
        {customers.length === 0 ? (
          <p className="text-center">No customers found</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Subregion</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <div className="font-weight-bold">{customer.name}</div>
                      <div className="text-muted small">{customer.email}</div>
                      <div className="text-muted small">{customer.phone}</div>
                    </td>
                    <td>{customer.subregion}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDeleteCustomer(customer.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};