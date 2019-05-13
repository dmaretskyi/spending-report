import moment from "moment"

export function saveTransactions(transactions) {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

export function loadTransactions() {
  try {
    const data = JSON.parse(localStorage.getItem('transactions'))
    return data.map(t => ({
      ...t,
      time: moment(t.time),
      operationDate: moment(t.operationDate),
      orderDate: moment(t.orderDate),
    }))
  } catch (err) {
    localStorage.removeItem('transactions')
  }
}
