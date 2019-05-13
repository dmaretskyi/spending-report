import { TransactionStorageService } from "./TransactionStorageService";

export function setup() {
  const transactionStorageService = new TransactionStorageService()

  return {
    transactionStorageService,
  }
}

export type Services = ReturnType<typeof setup>
