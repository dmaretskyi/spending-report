import { groupBy, mapValues, sumBy, last, sortBy, reverse, Dictionary } from 'lodash'
import { Transaction } from '../models/Transaction';
import { ClassStorageService } from './ClassesService';

export type MonthlyGrouping = Dictionary<MonthGroup>

export interface MonthGroup {
  dailyGrouping: DailyGrouping
  totalSpent: number
  totalGained: number
  resultingBalance: number
}

export type DailyGrouping = Dictionary<DayGroup>

export interface DayGroup {
  transactions: ClassifiedTransaction[]
  totalSpent: number
  totalGained: number
  resultingBalance: number
}

export interface ClassifiedTransaction extends Transaction {
  transactionClass: string
}

export class TransactionGroupingService {
  constructor(private classesService: ClassStorageService) { }

  group(transactions: Transaction[]): MonthlyGrouping {
    const sorted = reverse(sortBy(transactions, t => t.time.format('YYYY-MM-DD HH:mm')))
    return mapValues(
      groupBy(sorted, t => t.time.format('YYYY-MM')),
      transactions => this.formatMonth(transactions),
    )
  }

  private formatMonth(transactions: Transaction[]): MonthGroup {
    const withClasses = transactions.map(t => ({
      ...t,
      transactionClass: this.classesService.classify(t.description)
    }))

    return {
      dailyGrouping: mapValues(
        groupBy(withClasses, t => t.time.format('YYYY-MM-DD')),
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
    }
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
