export class TransactionClass {
  constructor(
    public name: string,
    public cases: string[],
    public color: string,
  ) { }

  matches(str: string) {
    const lower = str.toLowerCase()
    return this.cases.some(c => lower.startsWith(c.toLowerCase()))
  }

  toObject(): TransactionClassJSON {
    return {
      name: this.name,
      cases: this.cases,
      color: this.color,
    }
  }

  static fromObject(json: any) {
    if (typeof json.name !== 'string') throw new Error('Could not create TransactionClass instance')
    if (!Array.isArray(json.cases)) throw new Error('Could not create TransactionClass instance')

    return new TransactionClass(
      json.name,
      json.cases,
      json.color || '#FFFFFF',
    )
  }

  addCase(source: string) {
    this.cases.push(source.toLowerCase())
  }

  equals(other: TransactionClass) {
    return this.name === other.name
  }
}

export interface TransactionClassJSON {
  name: string
  cases: string[]
  color: string
}
