import React, { useState, useEffect } from 'react';
import { UploadFile } from './UploadFile';
import { parseFile } from '../parser';
import { group } from '../grouper';
import { TransactionsList } from './TransactionList';
import { loadTransactions, saveTransactions } from '../storage';

function App() {
  const [transactions, setTransactions] = useState(loadTransactions())

  useEffect(() => {
    saveTransactions(transactions)
  }, [transactions])


  return (
    <div>
      <UploadFile onUpload={file => setTransactions(parseFile(file))} />
      <TransactionsList groups={group(transactions)} />
    </div>
  );
}

export default App;
