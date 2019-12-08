import { Sanitizer } from '@restless/sanitizers'
import { Storage } from './Storage'

export class StorageMap<T> {
  private cache = new CachedMap(key => new Storage(
    `${this.key}/${key}`,
    this.initialValue,
    this.sanitizer,
  ))

  constructor(
    private key: string,
    private initialValue: T,
    private sanitizer: Sanitizer<T>,
  ) {}

  get(key: string) {
    return this.cache.get(key)
  }

  keys() {
    getLocalStorageKeys()
      .filter(key => key.startsWith(`${this.key}/`))
  }
}

class CachedMap<T> {
  private cache = new Map<string, T>()

  constructor(private init: (key: string) => T) {
  }

  get(key: string) {
    if(this.cache.has(key)) {
      return this.cache.get(key)
    } else {
      const value = this.init(key)
      this.cache.set(key, value)
      return value
    }
  }
}

function getLocalStorageKeys() {
  const count = localStorage.length
  const keys: string[] = []

  for (let i = 0; i < count; i++) {
    keys.push(localStorage.key(i)!)
  }
  return keys
}
