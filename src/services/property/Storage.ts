import { Property } from "./Property";

export class Storage<T> extends Property<T> {
  constructor(private key: string, private initialValue: T) { super() }

  get(): T {
    try {
      return JSON.parse(localStorage.getItem(this.key)!)
    } catch (err) {
      localStorage.removeItem(this.key)
      return this.initialValue
    }
  }

  set(value: T) {
    localStorage.setItem(this.key, JSON.stringify(value))
    this.notify()
  }
}
