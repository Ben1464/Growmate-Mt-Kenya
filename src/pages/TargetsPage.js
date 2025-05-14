import React, { useState } from 'react';
import { TargetForm } from '../components/TargetForm';
import { ProgressChart } from '../components/ProgressChart';
import { useAppStore } from '../store';

export const TargetsPage = () => {
  const { customers, subregions, targets, setCustomerTarget, setSubregionTarget } = useAppStore();
  const [targetType, setTargetType] = useState('customer');

  return (
    <div>
      <h1>Targets Management</h1>
      <div className="mb-3">
        <div className="btn-group">
          <button
            className={`btn ${targetType === 'customer' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTargetType('customer')}
          >
            Customer Targets
          </button>
          <button
            className={`btn ${targetType === 'subregion' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTargetType('subregion')}
          >
            Subregion Targets
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <TargetForm
            targetType={targetType}
            customers={customers}
            subregions={subregions}
            onSetCustomerTarget={setCustomerTarget}
            onSetSubregionTarget={setSubregionTarget}
          />
        </div>
        <div className="col-md-6">
          <ProgressChart
            targetType={targetType}
            customers={customers}
            subregions={subregions}
            targets={targets}
          />
        </div>
      </div>
    </div>
  );
};