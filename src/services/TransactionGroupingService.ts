import { groupBy, mapValues, sumBy, last, sortBy, reverse, Dictionary } from 'lodash'
import { Transaction } from '../models/Transaction';

export type MonthlyGrouping = Dictionary<MonthGroup>

export interface MonthGroup {
  dailyGrouping: DailyGrouping
  totalSpent: number
  totalGained: number
  resultingBalance: number
}

export type DailyGrouping = Dictionary<DayGroup>

export interface DayGroup {
  transactions: Transaction[]
  totalSpent: number
  totalGained: number
  resultingBalance: number
}

export class TransactionGroupingService {
  group(transactions: Transaction[]): MonthlyGrouping {
    const sorted = reverse(sortBy(transactions, t => t.time.format('YYYY-MM-DD HH:mm')))
    console.log(sorted)
    return mapValues(
      groupBy(sorted, t => t.time.format('YYYY-MM')),
      transactions => ({
        dailyGrouping: mapValues(
          groupBy(transactions, t => t.time.format('YYYY-MM-DD')),
          transactions => ({
            transactions,
            totalSpent: calculateSpentTotal(transactions),
            totalGained: calculateGainedTotal(transactions),
            resultingBalance: last(transactions)!.balance,
          }),
        ),
        totalSpent: calculateSpentTotal(transactions),
        totalGained: calculateGainedTotal(transactions),
        resultingBalance: last(transactions)!.balance,
      }),
    )
  }

}

function calculateSpentTotal(transactions: Transaction[]) {
  return -sumBy(
    transactions.filter(t => t.amount < 0),
    'amount',
  )
}

function calculateGainedTotal(transactions: Transaction[]) {
  return sumBy(
    transactions.filter(t => t.amount > 0),
    'amount',
  )
}
