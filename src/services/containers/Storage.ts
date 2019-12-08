import { Property } from 'reactive-properties'
import { cast, Sanitizer } from '@restless/sanitizers'

export class Storage<T> extends Property<T> {
  private subscriptions = new Set<() => void>();

  constructor(
    private key: string,
    private initialValue: T,
    private sanitizer: Sanitizer<T>,
  ) {
    super()
  }

  get (): T {
    const storedValue = localStorage.getItem(this.key)
    if(storedValue === null) return this.initialValue

    try {
      const json = JSON.parse(storedValue)
      return cast(json, this.sanitizer)
    } catch {
      return this.initialValue
    }
  }

  subscribe (cb: () => void): () => void {
    this.subscriptions.add(cb)

    return () => this.subscriptions.delete(cb)
  }

  set(value: T) {
    localStorage.setItem(this.key, JSON.stringify(value))
  }
}
