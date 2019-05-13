import React, { useState, useEffect } from 'react'
import { useServices } from "./services";
import { UploadFile } from "./UploadFile";
import { group } from "../grouper";
import { TransactionsList } from "./TransactionList";

export const TransactionsPage = () => {
  const { transactionStorageService, transactionParserService } = useServices()

  const [transactions, setTransactions] = useState(transactionStorageService.loadTransactions())

  useEffect(() => {
    transactionStorageService.saveTransactions(transactions)
  }, [transactions])


  return (
    <div>
      <UploadFile onUpload={file => setTransactions(transactionParserService.parse(file))} />
      <TransactionsList groups={group(transactions)} />
    </div>
  );
}
