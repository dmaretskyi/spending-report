import React, { useState, useEffect, useMemo } from 'react'
import moment from 'moment'
import { useServices } from "../services";
import { UploadFile } from "../UploadFile";
import { TransactionsList } from "./TransactionList";
import { MonthSelector } from './MonthSelector';

export const TransactionsPage = () => {
  const { transactionStorageService, transactionParserService, transactionGroupingService } = useServices()

  const availableMonths = transactionStorageService.listSavedMonths()
  const [selectedMonth, setSelectedMonth] = useState(availableMonths.length - 1)

  const [transactions, setTransactions] = useState(transactionStorageService.loadTransactions(availableMonths[selectedMonth] || moment()))

  function loadTransactions(file: string) {
    const txs = transactionParserService.parse(file)
    transactionStorageService.saveTransactions(txs)

    setTransactions(transactionStorageService.loadTransactions(availableMonths[selectedMonth] || moment()))
  }

  useEffect(() => {
    setTransactions(transactionStorageService.loadTransactions(availableMonths[selectedMonth] || moment()))
  }, [selectedMonth])

  const groups = useMemo(() => transactionGroupingService.group(transactions), [transactions])

  return (
    <div>
      <UploadFile onUpload={loadTransactions} />
      <MonthSelector months={availableMonths} selected={selectedMonth} onSelected={setSelectedMonth} />
      <TransactionsList groups={groups} />
    </div>
  );
}
