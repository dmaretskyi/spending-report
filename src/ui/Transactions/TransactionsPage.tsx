import React, { useState, useEffect } from 'react'
import { useServices } from "../services";
import { UploadFile } from "../UploadFile";
import { TransactionsList } from "./TransactionList";

export const TransactionsPage = () => {
  const { transactionStorageService, transactionParserService, transactionGroupingService } = useServices()

  const [transactions, setTransactions] = useState(transactionStorageService.loadTransactions())

  useEffect(() => {
    transactionStorageService.saveTransactions(transactions)
  }, [transactions])


  return (
    <div>
      <UploadFile onUpload={file => setTransactions(transactionParserService.parse(file))} />
      <TransactionsList groups={transactionGroupingService.group(transactions)} />
    </div>
  );
}
