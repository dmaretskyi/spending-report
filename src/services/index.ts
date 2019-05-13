import { TransactionStorageService } from "./TransactionStorageService";
import { TransactionParserService } from "./TransactionParserService";

export function setup() {
  const transactionStorageService = new TransactionStorageService()
  const transactionParserService = new TransactionParserService()

  return {
    transactionStorageService,
    transactionParserService,
  }
}

export type Services = ReturnType<typeof setup>
