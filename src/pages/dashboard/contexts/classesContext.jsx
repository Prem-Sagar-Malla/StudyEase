import React, { createContext, useContext, useState } from 'react';

const classesContext = createContext();

export const ClassesProvider = ({ children }) => {
  const [classes, setClasses] = useState([]);

  const addClass = (newClass) => {
    setClasses((prevClasses) => [...prevClasses, newClass]);
  };

  const updateClass = (updatedClass) => {
    setClasses(classes.map(cls => cls.id === updatedClass.id ? updatedClass : cls));
  };

  const deleteClass = (id) => {
    setClasses(classes.filter(cls => cls.id !== id));
  };

  return (
    <classesContext.Provider value={{ classes, addClass, updateClass, deleteClass }}>
      {children}
    </classesContext.Provider>
  );
};

export const useClasses = () => {
  return useContext(classesContext);
};
