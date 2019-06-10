import { StorageService } from "./StorageService";
import { TransactionClass } from "../models/TransactionClass";
import { Storage } from "./property/Storage";
import { worker } from "cluster";

export class ClassStorageService {
  private storageClasses = new Storage<TransactionClass[]>('CLASSES', [])

  constructor() {
  }

  get classes() {
    return this.storageClasses.map(cs => cs.map(c => TransactionClass.fromObject(c)))
  }

  addClass(name: string) {
    this.storageClasses.set([
      ...this.storageClasses.get(),
      new TransactionClass(name, []).toObject()
    ])
  }
}
