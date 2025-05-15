import { useState, useEffect } from 'react';

export const useAppStore = () => {
  // Initialize state from localStorage or empty arrays
  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem('customers');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing customers:", error);
      return [];
    }
  });
  
  const [subregions, setSubregions] = useState(() => {
    try {
      const saved = localStorage.getItem('subregions');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing subregions:", error);
      return [];
    }
  });
  
  const [sales, setSales] = useState(() => {
    try {
      const saved = localStorage.getItem('sales');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing sales:", error);
      return [];
    }
  });
  
  const [targets, setTargets] = useState(() => {
    try {
      const saved = localStorage.getItem('targets');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing targets:", error);
      return [];
    }
  });

  // Persist data to localStorage with error handling
  useEffect(() => {
    try {
      localStorage.setItem('customers', JSON.stringify(customers));
    } catch (error) {
      console.error("Error saving customers:", error);
    }
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem('subregions', JSON.stringify(subregions));
    } catch (error) {
      console.error("Error saving subregions:", error);
    }
  }, [subregions]);

  useEffect(() => {
    try {
      localStorage.setItem('sales', JSON.stringify(sales));
    } catch (error) {
      console.error("Error saving sales:", error);
    }
  }, [sales]);

  useEffect(() => {
    try {
      localStorage.setItem('targets', JSON.stringify(targets));
    } catch (error) {
      console.error("Error saving targets:", error);
    }
  }, [targets]);

  // Customer actions
  const addCustomer = (customer) => {
    setCustomers(prev => [
      ...prev, 
      { 
        ...customer, 
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      }
    ]);
  };

  const deleteCustomer = (id) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
    // Also delete any targets associated with this customer
    setTargets(prev => prev.filter(target => target.customerId !== id));
  };

  // Subregion actions
  const addSubregion = (subregion) => {
    setSubregions(prev => [
      ...prev, 
      { 
        ...subregion, 
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      }
    ]);
  };

  const deleteSubregion = (id) => {
    setSubregions(prev => prev.filter(subregion => subregion.id !== id));
    // Also delete any targets associated with this subregion
    setTargets(prev => prev.filter(target => target.subregionId !== id));
  };

  // Sales actions - enhanced with validation
  const addSale = (sale) => {
    if (!sale.customerId || !sale.amount || isNaN(sale.amount)) {
      console.error("Invalid sale data:", sale);
      return false;
    }

    const newSale = {
      ...sale,
      id: Date.now().toString(),
      date: sale.date || new Date().toISOString(),
      amount: parseFloat(sale.amount),
      recordedAt: new Date().toISOString()
    };

    setSales(prev => [...prev, newSale]);
    return true;
  };

  // Target actions with validation
  const setCustomerTarget = (target) => {
    if (!target.customerId || !target.amount || isNaN(target.amount) || !target.period) {
      console.error("Invalid customer target:", target);
      return false;
    }

    const newTarget = {
      ...target,
      amount: parseFloat(target.amount),
      setAt: new Date().toISOString()
    };

    setTargets(prev => [
      ...prev.filter(t => !(t.customerId === target.customerId && t.period === target.period)),
      newTarget
    ]);
    return true;
  };

  const setSubregionTarget = (target) => {
    if (!target.subregionId || !target.amount || isNaN(target.amount) || !target.period) {
      console.error("Invalid subregion target:", target);
      return false;
    }

    const newTarget = {
      ...target,
      amount: parseFloat(target.amount),
      setAt: new Date().toISOString()
    };

    setTargets(prev => [
      ...prev.filter(t => !(t.subregionId === target.subregionId && t.period === target.period)),
      newTarget
    ]);
    return true;
  };

  // Additional utility functions
  const getCustomerSales = (customerId) => {
    return sales.filter(sale => sale.customerId === customerId);
  };

  const getSubregionCustomers = (subregionId) => {
    return customers.filter(customer => customer.subregion === subregionId);
  };

  const getSubregionSales = (subregionId) => {
    const subregionCustomers = getSubregionCustomers(subregionId);
    return sales.filter(sale => 
      subregionCustomers.some(customer => customer.id === sale.customerId)
    );
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
    setSubregionTarget,
    getCustomerSales,
    getSubregionSales
  };
};