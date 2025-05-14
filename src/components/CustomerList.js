import React from 'react';

export const CustomerList = ({ customers, onDeleteCustomer }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>Customer List</h3>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Subregion</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
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
    </div>
  );
};