import moment from "moment"

export class TransactionStorageService {
  loadTransactions(): any[] {
    try {
      const data = JSON.parse(localStorage.getItem(KEY)!)
      return data.map((t: any) => ({
        ...t,
        time: moment(t.time),
        operationDate: moment(t.operationDate),
        orderDate: moment(t.orderDate),
      }))
    } catch (err) {
      localStorage.removeItem(KEY)
      return []
    }
  }

  saveTransactions(transactions: any[]) {
    localStorage.setItem(KEY, JSON.stringify(transactions))
  }
}

const KEY = 'transactions'
