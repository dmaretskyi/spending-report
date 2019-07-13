import moment, { Moment } from "moment"
import { groupBy, sortBy } from 'lodash'
import { Transaction } from "../models/Transaction";

export class TransactionStorageService {
  loadTransactions(month: Moment): Transaction[] {
    const key = keyFor(month.format('YYYY-MM'));
    try {
      const json = localStorage.getItem(key)
      if (!json) return []

      const data = JSON.parse(json)
      console.log(data)
      return data.map((t: any) => ({
        ...t,
        time: moment(t.time),
        operationDate: moment(t.operationDate),
        orderDate: moment(t.orderDate),
      }))
    } catch (err) {
      console.warn('An error occurred while trying to load transactions from storage, storage will be cleared.')
      console.warn(err)

      localStorage.removeItem(key)
      return []
    }
  }

  saveTransactions(transactions: Transaction[]) {
    const groups = groupBy(transactions, t => t.time.format('YYYY-MM'))

    Object.entries(groups).forEach(([month, txs]) => {
      localStorage.setItem(keyFor(month), JSON.stringify(txs))
    })

  }

  listSavedMonths() {
    const res = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const match = key && key.match(REGEX_KEY)
      if (match) {
        res.push(moment(match[1], 'YYYY-MM'))
      }
    }

    return sortBy(res)
  }
}

const keyFor = (month: string) => `transactions/${month}`

const REGEX_KEY = /transactions\/(\d{4}-\d{2})/
