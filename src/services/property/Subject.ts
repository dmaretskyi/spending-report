import { Property } from "./Property";

export class Subject<T> extends Property<T> {
  constructor(private getter: () => T) { super() }

  get() { return this.getter() }

  notify() { super.notify() }

  static empty() { return new Subject<undefined>(() => undefined) }
}
