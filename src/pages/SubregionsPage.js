import React from 'react';
import { SubregionForm } from '../components/SubregionForm';
import { SubregionList } from '../components/SubregionList';
import { useAppStore } from '../store';

export const SubregionsPage = () => {
  const { subregions, addSubregion, deleteSubregion } = useAppStore();

  return (
    <div>
      <h1 className="page-title">Subregion Management</h1>
      <div className="row">
        <div className="col-12 col-md-6 mb-3">
          <SubregionForm onAddSubregion={addSubregion} />
        </div>
        <div className="col-12 col-md-6">
          <SubregionList subregions={subregions} onDeleteSubregion={deleteSubregion} />
        </div>
      </div>
    </div>
  );
};