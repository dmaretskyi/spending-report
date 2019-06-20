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
