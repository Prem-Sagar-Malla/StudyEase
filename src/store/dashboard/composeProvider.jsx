import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

const composeProviders = (...providers) => {
  return ({ store, children }) => 
    providers.reduceRight(
      (acc, Provider) => 
        Provider === ReduxProvider
          ? <ReduxProvider store={store}>{acc}</ReduxProvider>
          : <Provider>{acc}</Provider>,
      children
    );
};

export default composeProviders;
