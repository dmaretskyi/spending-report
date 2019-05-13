import moment from "moment"

export class TransactionStorageService {
  loadTransactions(): any[] {
    try {
      const json = localStorage.getItem(KEY)
      if (!json) return []

      const data = JSON.parse(json)
      return data.map((t: any) => ({
        ...t,
        time: moment(t.time),
        operationDate: moment(t.operationDate),
        orderDate: moment(t.orderDate),
      }))
    } catch (err) {
      console.warn('An error occurred while trying to load transactions from storage, storage will be cleared.')
      console.warn(err)

      localStorage.removeItem(KEY)
      return []
    }
  }

  saveTransactions(transactions: any[]) {
    localStorage.setItem(KEY, JSON.stringify(transactions))
  }
}

const KEY = 'transactions'
