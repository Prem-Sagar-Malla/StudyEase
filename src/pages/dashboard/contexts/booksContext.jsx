import React, { createContext, useContext, useState } from 'react';

const booksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const addBook = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const updateBook = (updatedBook) => {
    setBooks(books.map(bks => bks.id === updatedBook.id ? updatedBook : bks));
  };

  const deleteBook = (id) => {
    setBooks(books.filter(bks => bks.id !== id));
  };

  return (
    <booksContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </booksContext.Provider>
  );
};

export const useBooks = () => {
  return useContext(booksContext);
};