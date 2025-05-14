import React from 'react';
import { CustomerForm } from '../components/CustomerForm';
import { CustomerList } from '../components/CustomerList';
import { useAppStore } from '../store';

export const CustomersPage = () => {
  const { customers, addCustomer, deleteCustomer } = useAppStore();

  return (
    <div>
      <h1>Customer Management</h1>
      <div className="row">
        <div className="col-md-6">
          <CustomerForm onAddCustomer={addCustomer} />
        </div>
        <div className="col-md-6">
          <CustomerList customers={customers} onDeleteCustomer={deleteCustomer} />
        </div>
      </div>
    </div>
  );
};