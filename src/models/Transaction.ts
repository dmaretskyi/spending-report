import { Moment } from "moment";

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
  address: string
  amount: number
  balance: number
  city: string
  country: string
  currency: string
  details: string[]
  id: string
  operationDate: Moment
  orderDate: Moment
  time: Moment
  title: string
  type: TransactionType
}
