import React, { useState, useEffect, useMemo } from 'react'
import moment from 'moment'
import { useServices } from "../services";
import { UploadFile } from "../UploadFile";
import { TransactionsList } from "./TransactionList";
import { MonthSelector } from './MonthSelector';
import { useProperty } from '../hooks/useProperty';

export const TransactionsPage = () => {
  const { transactionStorageService, transactionParserService, transactionGroupingService } = useServices()

  const availableMonths = useProperty(transactionStorageService.savedMonths, [])
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(availableMonths.length - 1)
  const selectedMonth = availableMonths[selectedMonthIdx] || moment()

  const transactions = useProperty(transactionStorageService.transactionsFor(selectedMonth), [selectedMonth])

  console.log(transactions)

  const groups = useMemo(() => transactionGroupingService.group(transactions), [transactions])

  function loadTransactions(file: string) {
    const txs = transactionParserService.parse(file)
    transactionStorageService.saveTransactions(txs)
  }

  return (
    <div>
      <UploadFile onUpload={loadTransactions} />
      <MonthSelector months={availableMonths} selected={selectedMonthIdx} onSelected={setSelectedMonthIdx} />
      <TransactionsList groups={groups} />
    </div>
  );
}
