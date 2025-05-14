import { useState, useEffect } from 'react';

export const useAppStore = () => {
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('customers');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [subregions, setSubregions] = useState(() => {
    const saved = localStorage.getItem('subregions');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('sales');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [targets, setTargets] = useState(() => {
    const saved = localStorage.getItem('targets');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist data to localStorage
  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('subregions', JSON.stringify(subregions));
  }, [subregions]);

  useEffect(() => {
    localStorage.setItem('sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('targets', JSON.stringify(targets));
  }, [targets]);

  // Customer actions
  const addCustomer = (customer) => {
    setCustomers([...customers, { ...customer, id: Date.now().toString() }]);
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  // Subregion actions
  const addSubregion = (subregion) => {
    setSubregions([...subregions, { ...subregion, id: Date.now().toString() }]);
  };

  const deleteSubregion = (id) => {
    setSubregions(subregions.filter(subregion => subregion.id !== id));
  };

  // Sales actions
  const addSale = (sale) => {
    setSales([...sales, { ...sale, id: Date.now().toString(), date: new Date().toISOString() }]);
  };

  // Target actions
  const setCustomerTarget = (target) => {
    setTargets([...targets.filter(t => !(t.customerId === target.customerId && t.period === target.period)), target]);
  };

  const setSubregionTarget = (target) => {
    setTargets([...targets.filter(t => !(t.subregionId === target.subregionId && t.period === target.period)), target]);
  };

  return {
    customers,
    subregions,
    sales,
    targets,
    addCustomer,
    deleteCustomer,
    addSubregion,
    deleteSubregion,
    addSale,
    setCustomerTarget,
    setSubregionTarget
  };
};