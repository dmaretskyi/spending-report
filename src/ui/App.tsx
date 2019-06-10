import React, { useState } from 'react';
import { ServicesContext } from './services';
import { setup } from '../services';
import { TransactionsPage } from './Transactions/TransactionsPage';
import styled, { createGlobalStyle } from 'styled-components';
import { Reset } from './Reset';
import { CircleButton } from './common/CircleButton';
import classes from '../assets/classes.svg';
import { ClassesModal } from './classes/ClassesModal';

function App() {
  const services = setup()

  const [classModalOpen, setClassModalOpen] = useState(false)

  return (
    <ServicesContext.Provider value={services}>
      <Reset />
      <TransactionsPage />
      <ButtonBar>
        <CircleButton src={classes} onClick={() => setClassModalOpen(true)} />
      </ButtonBar>
      {classModalOpen && <ClassesModal onClose={() => setClassModalOpen(false)} />}
    </ServicesContext.Provider>
  );
}

const ButtonBar = styled.div`
  position: fixed;
  bottom: 20px;
  right: 30px;
  display: grid;
  grid-column-gap: 15px;
`

export default App;

