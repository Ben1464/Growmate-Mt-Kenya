import React from 'react';
import { SalesForm } from '../components/SalesForm';
import { SalesReport } from '../components/SalesReport';
import { useAppStore } from '../store';

export const SalesPage = () => {
  const { customers, sales, addSale } = useAppStore();

  return (
    <div>
      <h1>Sales Management</h1>
      <div className="row">
        <div className="col-md-6">
          <SalesForm customers={customers} onAddSale={addSale} />
        </div>
        <div className="col-md-6">
          <SalesReport sales={sales} customers={customers} />
        </div>
      </div>
    </div>
  );
};