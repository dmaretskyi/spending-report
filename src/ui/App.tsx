import React from 'react';
import { ServicesContext } from './services';
import { setup } from '../services';
import { TransactionsPage } from './TransactionsPage';

function App() {
  const services = setup()

  return (
    <ServicesContext.Provider value={services}>
      <TransactionsPage />
    </ServicesContext.Provider>
  );
}

export default App;
