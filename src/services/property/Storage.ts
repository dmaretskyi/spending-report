import { Property } from "./Property";

export class Storage<T> extends Property<T> {
  constructor(private key: string, private initialValue: T) { super() }

  get(): T {
    try {
      const data = localStorage.getItem(this.key)
      if (data === null) return this.initialValue
      return JSON.parse(data)
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
