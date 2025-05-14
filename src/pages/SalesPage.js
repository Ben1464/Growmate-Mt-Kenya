import React, { useState } from 'react';
import { SalesForm } from '../components/SalesForm';
import { SalesReport } from '../components/SalesReport';
import { useAppStore } from '../store';
import { FaPlus, FaChartBar } from 'react-icons/fa';

export const SalesPage = () => {
  const [activeTab, setActiveTab] = useState('record');
  const { customers } = useAppStore();

  return (
    <div>
      <h1 className="page-title">Sales Management</h1>
      
      <div className="mb-3">
        <div className="btn-group" style={{ width: '100%' }}>
          <button
            className={`btn ${activeTab === 'record' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('record')}
            style={{ width: '50%' }}
          >
            <FaPlus style={{ marginRight: '5px' }} />
            Record Sale
          </button>
          <button
            className={`btn ${activeTab === 'report' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('report')}
            style={{ width: '50%' }}
          >
            <FaChartBar style={{ marginRight: '5px' }} />
            Reports
          </button>
        </div>
      </div>
      
      {activeTab === 'record' ? (
        <SalesForm customers={customers} />
      ) : (
        <SalesReport />
      )}
    </div>
  );
};