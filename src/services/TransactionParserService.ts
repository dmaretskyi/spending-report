import moment from "moment";
import { Transaction, TransactionType } from "../models/Transaction";

export class TransactionParserService {
  parse(data: string) {
    return parseFile(data)
  }
}

export function parseFile(str: string) {
  return str
    .split('\n')
    .slice(1)
    .map(parseLine)
    .filter(validateTransaction)
}

function parseLine(str: string): Transaction {
  const [operationDate, orderDate, type, amount, currency, balance, ...details] = str
    .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/g)
    .map(v => v.replace(/(^"|"$)/g, ''))

  const additionalInfo = details.map(tryParseDetails).reduce<string[]>((acc, x) => typeof x === 'string' ? [...acc, x] : acc, [])
  const info = details.map(tryParseDetails).reduce<Partial<Transaction>>((acc, x) => typeof x === 'string' ? acc : { ...acc, ...x }, {})

  return {
    operationDate: moment(operationDate),
    orderDate: moment(orderDate),
    type: tryParseType(type),
    amount: +amount,
    currency,
    balance: +balance,
    ...info,
    details: additionalInfo.filter(x => x.length),
    id: `${operationDate}-${info.title || info.ownReferences}`,
    time: info.time || moment(orderDate),
  }
}

function tryParseType(str: string): TransactionType {
  switch (str) {
    case 'Płatność kartą': return 'CARD_PAYMENT'
    case 'Przelew na rachunek': return 'INCOMING_TRANSFER'
    case 'Przelew z rachunku': return 'OUTGOING_TRANSFER'
    case 'Wypłata z bankomatu': return 'ATM_WITHDRAWAL'
    case 'Zakup w terminalu - kod mobilny': return 'TERMINAL_CODE_PAYMENT'
    case 'Płatność web - kod mobilny': return 'WEB_CODE_PAYMENT'
    case 'Wpłata gotówkowa w kasie': return 'DEPOSIT'
    default: return str
  }
}

function tryParseDetails(str: string) {
  let m
  if (m = tryMatch(/Lokalizacja: Kraj: (?<country>\S+) Miasto: (?<city>\S+) Adres: (?<address>.+)$/g, str)) {
    return m
  } else if (m = tryMatch(/Nazwa nadawcy: (?<senderName>.+)$/g, str)) {
    return m
  } else if (m = tryMatch(/Tytuł: (?<title>.+)$/g, str)) {
    return m
  } else if (m = tryMatch(/Referencje własne zleceniodawcy: (?<ownReferences>.+)$/g, str)) {
    return m
  } else if (m = tryMatch(/Data i czas operacji: (?<time>.+)$/g, str)) {
    const time = moment(m.time, 'YYYY-MM-DD HH:mm:ss')
    if (time.isValid()) {
      return { time }
    } else {
      return str
    }
  } else {
    return str
  }
}

function tryMatch(re: RegExp, str: string) {
  const match = re.exec(str)
  if (match) {
    return match.groups
  }
}

function validateTransaction(t: Transaction): boolean {
  return !!t &&
    !!t.amount &&
    !!t.balance &&
    !!t.currency &&
    !!t.details &&
    !!t.id &&
    !!t.operationDate &&
    !!t.orderDate
}
