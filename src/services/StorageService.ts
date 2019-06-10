export class StorageService {
  constructor() {

  }

  get<T>(key: string): T | undefined {
    try {
      return JSON.parse(localStorage.getItem(key)!)
    } catch (err) {
      localStorage.removeItem(key)
      return undefined
    }
  }

  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
