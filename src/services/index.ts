import { TransactionStorageService } from "./TransactionStorageService";
import { TransactionParserService } from "./TransactionParserService";
import { TransactionGroupingService } from "./TransactionGroupingService";
import { StorageService } from "./StorageService";
import { ClassStorageService } from "./ClassesService";

export function setup() {
  const storageService = new StorageService()
  const transactionStorageService = new TransactionStorageService()
  const transactionParserService = new TransactionParserService()
  const transactionGroupingService = new TransactionGroupingService()
  const classStorageService = new ClassStorageService()

  return {
    transactionStorageService,
    transactionParserService,
    transactionGroupingService,
    classStorageService,
  }
}

export type Services = ReturnType<typeof setup>
