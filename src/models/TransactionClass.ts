export class TransactionClass {
  constructor(
    public name: string,
    public cases: RegExp[],
    public color: string,
  ) { }

  matches(str: string) {
    return this.cases.some(c => !!str.match(c))
  }

  toObject(): TransactionClassJSON {
    return {
      name: this.name,
      cases: this.cases.map(c => c.source),
      color: this.color,
    }
  }

  static fromObject(json: any) {
    if (typeof json.name !== 'string') throw new Error('Could not create TransactionClass instance')
    if (!Array.isArray(json.cases)) throw new Error('Could not create TransactionClass instance')

    return new TransactionClass(
      json.name,
      json.cases.map((c: string) => new RegExp(c, 'i')),
      json.color || '#FFFFFF',
    )
  }

  addCase(source: string) {
    this.cases.push(new RegExp(source, 'i'))
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
