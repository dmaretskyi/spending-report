import React, { useState, useEffect, useMemo } from 'react'
import { useServices } from "../services";
import { UploadFile } from "../UploadFile";
import { TransactionsList } from "./TransactionList";

export const TransactionsPage = () => {
  const { transactionStorageService, transactionParserService, transactionGroupingService } = useServices()

  const [transactions, setTransactions] = useState(transactionStorageService.loadTransactions())

  useEffect(() => {
    transactionStorageService.saveTransactions(transactions)
  }, [transactions])


  const groups = useMemo(() => transactionGroupingService.group(transactions), [transactions])

  return (
    <div>
      <UploadFile onUpload={file => setTransactions(transactionParserService.parse(file))} />
      <TransactionsList groups={groups} />
    </div>
  );
}
