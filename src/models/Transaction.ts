import moment, { Moment } from "moment";
import { asAnyOf, asArray, asFlatMapped, asNumber, asObject, asString, Result } from '@restless/sanitizers'

export type TransactionType
  = 'CARD_PAYMENT'
  | 'INCOMING_TRANSFER'
  | 'OUTGOING_TRANSFER'
  | 'ATM_WITHDRAWAL'
  | 'TERMINAL_CODE_PAYMENT'
  | 'WEB_CODE_PAYMENT'
  | 'DEPOSIT'
  | string

export interface Transaction {
  amount: number
  balance: number
  description: string
  details: string[]
  currency: string
  id: string
  time: Moment
  operationDate: Moment
  orderDate: Moment
  type: TransactionType
  country?: string
  city?: string
  address?: string
  title?: string
  ownReferences?: string
}

const asMoment = asFlatMapped<string, Moment>(
  asString,
  (str, path) => {
    const val = moment(str)
    if(!val.isValid()) return Result.error([{ expected: 'date', path }])
    return Result.ok(val)
  }
)

const asExact<T>

const asEnum = <T extends string> (...variants: T[]) => asAnyOf(variants.map(variant => ())

export const asTransactionType = as

export const asTransaction = asObject({
  amount: asNumber,
  balance: asNumber,
  description: asString,
  details: asArray(asString),
  currency: asString,
  id: asString,
  time: asMoment,
  operationDate: asMoment,
  orderDate: asMoment,
  type: TransactionType
  country?: string
  city?: string
  address?: string
  title?: string
  ownReferences?: string
})
