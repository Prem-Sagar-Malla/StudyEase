import React, { createContext, useContext, useState } from 'react';

const quotesContext = createContext();

export const QuotesProvider = ({ children }) => {
  const [quotes, setQuotes] = useState([]);

  const addQuote = (newQuote) => {
    setQuotes((prevQuote) => [...prevQuote, newQuote]);
  };

  const updateQuote = (updatedQuote) => {
    setQuotes(quotes.map(qts => qts.id === updatedQuote.id ? updatedQuote : qts));
  };

  const deleteQuote = (id) => {
    setQuotes(quotes.filter(qts => qts.id !== id));
  };

  return (
    <quotesContext.Provider value={{ quotes, addQuote, updateQuote, deleteQuote }}>
      {children}
    </quotesContext.Provider>
  );
};

export const useQuotes = () => {
  return useContext(quotesContext);
};
