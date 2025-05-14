import React from 'react';
import { SubregionForm } from '../components/SubregionForm';
import { SubregionList } from '../components/SubregionList';
import { useAppStore } from '../store';

export const SubregionsPage = () => {
  const { subregions, addSubregion, deleteSubregion } = useAppStore();

  return (
    <div>
      <h1>Subregion Management</h1>
      <div className="row">
        <div className="col-md-6">
          <SubregionForm onAddSubregion={addSubregion} />
        </div>
        <div className="col-md-6">
          <SubregionList subregions={subregions} onDeleteSubregion={deleteSubregion} />
        </div>
      </div>
    </div>
  );
};