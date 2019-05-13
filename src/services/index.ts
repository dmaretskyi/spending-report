import { TransactionStorageService } from "./TransactionStorageService";
import { TransactionParserService } from "./TransactionParserService";
import { TransactionGroupingService } from "./TransactionGroupingService";

export function setup() {
  const transactionStorageService = new TransactionStorageService()
  const transactionParserService = new TransactionParserService()
  const transactionGroupingService = new TransactionGroupingService()

  return {
    transactionStorageService,
    transactionParserService,
    transactionGroupingService,
  }
}

export type Services = ReturnType<typeof setup>
