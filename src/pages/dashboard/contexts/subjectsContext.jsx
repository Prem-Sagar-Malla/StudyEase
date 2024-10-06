import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const subjectsContext = createContext();

export const SubjectsProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);

  const addSubject = (newSubject) => {
    console.log('Adding Subject:', newSubject); // Debugging line
    setSubjects((prevSubjects) => [
      ...prevSubjects,
      { ...newSubject, id: uuidv4() } // Assign a unique ID
    ]);
  };

  const updateSubject = (updatedSubject) => {
    console.log('Updating Subject:', updatedSubject); // Debugging line
    setSubjects(subjects.map(sub =>
      sub.id === updatedSubject.id ? updatedSubject : sub
    ));
  };

  const deleteSubject = (id) => {
    console.log('Deleting Subject with ID:', id); // Debugging line
    setSubjects(subjects.filter(sub => sub.id !== id));
  };

  return (
    <subjectsContext.Provider value={{ subjects, addSubject, updateSubject, deleteSubject }}>
      {children}
    </subjectsContext.Provider>
  );
};

export const useSubjects = () => {
  return useContext(subjectsContext);
};
