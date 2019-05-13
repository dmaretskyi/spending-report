import { groupBy, mapValues, sumBy, last } from 'lodash'

export function group(transactions) {
  return mapValues(
    groupBy(transactions, t => t.orderDate.format('YYYY-MM-DD')),
    ts => ({
      transactions: ts,
      total: sumBy(ts, 'amount'),
      currency: last(ts).currency,
      balance: last(ts).balance
    })
  )
}
