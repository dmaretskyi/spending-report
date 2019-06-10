export abstract class Property<T> {
  private listeners = new Set<() => void>()

  abstract get(): T

  subscribe(cb: () => void): () => void {
    this.listeners.add(cb)

    return () => {
      this.listeners.delete(cb)
    }
  }

  protected notify() {
    this.listeners.forEach(cb => cb())
  }

  map<U>(fn: (x: T) => U): Property<U> {
    return new MapProperty(this, fn)
  }
}

class MapProperty<T, U> extends Property<U> {
  constructor(
    private source: Property<T>,
    private fn: (x: T) => U,
  ) {
    super()
  }

  subscribe(cb: () => void): () => void {
    return this.source.subscribe(cb)
  }

  get() {
    return this.fn(this.source.get())
  }
}
