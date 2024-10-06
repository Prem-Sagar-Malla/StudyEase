import React, { createContext, useContext, useState } from 'react';

const servicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);

  const addService = (newService) => {
    setServices((prevServices) => [...prevServices, newService]);
  };

  const updateService = (updatedService) => {
    setServices(services.map(srv => srv.id === updatedService.id ? updatedService : srv));
  };

  const deleteService = (id) => {
    setServices(services.filter(srv => srv.id !== id));
  };

  return (
    <servicesContext.Provider value={{ services, addService, updateService, deleteService }}>
      {children}
    </servicesContext.Provider>
  );
};

export const useServices = () => {
  return useContext(servicesContext);
};
