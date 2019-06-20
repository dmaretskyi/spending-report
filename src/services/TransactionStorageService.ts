import moment from "moment"
import { Transaction } from "../models/Transaction";

export class TransactionStorageService {
  loadTransactions(): Transaction[] {
    try {
      const json = localStorage.getItem(KEY)
      if (!json) return []

      const data = JSON.parse(json)
      console.log(data)
      return data.map((t: any) => ({
        ...t,
        time: moment(t.time),
        operationDate: moment(t.operationDate),
        orderDate: moment(t.orderDate),
      })).filter((t: any) => t.time.isAfter(moment().subtract(1, 'month').startOf('month')))
    } catch (err) {
      console.warn('An error occurred while trying to load transactions from storage, storage will be cleared.')
      console.warn(err)

      localStorage.removeItem(KEY)
      return []
    }
  }

  saveTransactions(transactions: Transaction[]) {
    localStorage.setItem(KEY, JSON.stringify(transactions))
  }
}

const KEY = 'transactions'
