import { TransactionClass } from "../models/TransactionClass";
import { asArray } from '@restless/sanitizers'
import { Property } from 'reactive-properties'
import { Storage } from './containers/Storage'

export class ClassStorageService {
  private transactionClassesStorage = new Storage<TransactionClass[]>('CLASSES', [], asArray(TransactionClass.sanitizer))
  transactionClasses: Property<TransactionClass[]> = this.transactionClassesStorage

  addClass(name: string) {
    this.transactionClassesStorage.set([
      ...this.transactionClassesStorage.get(),
      new TransactionClass(name, [], '#FFFFFF')
    ])
  }

  saveClass(tc: TransactionClass) {
    this.transactionClassesStorage.set(this.transactionClassesStorage.get().map(
      c => c.name === tc.name ? tc : c
    ))
  }

  classify(description: string) {
    const c = this.transactionClassesStorage.get().find(c => c.matches(description))
    return c ? c.name : 'Other'
  }

  getClass(name: string) {
    return this.transactionClassesStorage.get().find(c => c.name === name)
  }

  getClassOrDefault(name: string) {
    return this.getClass(name) || new TransactionClass(name, [], '#FFFFFF')
  }
}
