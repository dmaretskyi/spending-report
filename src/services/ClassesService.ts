import { TransactionClass, TransactionClassJSON } from "../models/TransactionClass";
import { Storage } from "./property/Storage";

export class ClassStorageService {
  private storageClasses = new Storage<TransactionClassJSON[]>('CLASSES', [])

  constructor() {
  }

  get classes() {
    return this.storageClasses.map(cs => cs.map(c => TransactionClass.fromObject(c)))
  }

  addClass(name: string) {
    this.storageClasses.set([
      ...this.storageClasses.get(),
      new TransactionClass(name, [], '#FFFFFF').toObject()
    ])
  }

  saveClass(tc: TransactionClass) {
    this.storageClasses.set(this.storageClasses.get().map(
      c => c.name === tc.name ? tc.toObject() : c
    ))
  }

  classify(description: string) {
    const c = this.classes.get().find(c => c.matches(description))
    return c ? c.name : 'Other'
  }

  getClass(name: string) {
    return this.classes.map(c => c.find(c => c.name === name))
  }

  getClassOrDefault(name: string) {
    return this.getClass(name).map(c => c || new TransactionClass(name, [], '#FFFFFF'))
  }
}
