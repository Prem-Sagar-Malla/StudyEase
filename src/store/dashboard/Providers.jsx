import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BlogsProvider } from '../../pages/dashboard/contexts/blogsContext';
import { ClassesProvider } from '../../pages/dashboard/contexts/classesContext';
import store from './store';
import composeProviders from './composeProvider';
import { BooksProvider } from '../../pages/dashboard/contexts/booksContext';
import { SubjectsProvider } from '../../pages/dashboard/contexts/subjectsContext';
import { ServicesProvider } from '../../pages/dashboard/contexts/servicesContext';
import { QuotesProvider } from '../../pages/dashboard/contexts/quotesContext';

const AppProviders = composeProviders(
  ClassesProvider,
  BlogsProvider,
  BooksProvider,
  SubjectsProvider,
  ServicesProvider,
  QuotesProvider,
);

const Providers = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <AppProviders>
        {children}
      </AppProviders>
    </ReduxProvider>
  );
};

export default Providers;
