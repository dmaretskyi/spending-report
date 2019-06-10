import { Property } from "./Property";

export class State<T> extends Property<T> {
  constructor(private value: T) { super() }

  get() { return this.value }

  set(data: T) {
    this.value = data
    this.notify()
  }
}
