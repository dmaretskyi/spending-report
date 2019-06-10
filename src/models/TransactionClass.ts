export class TransactionClass {
  constructor(
    public name: string,
    private cases: RegExp[]
  ) { }

  matches(str: string) {
    return this.cases.some(c => !!str.match(c))
  }

  toObject() {
    return {
      name: this.name,
      cases: this.cases.map(c => c.source),
    }
  }

  static fromObject(json: any) {
    if (typeof json.name !== 'string') throw new Error('Could not create TransactionClass instance')
    if (!Array.isArray(json.cases)) throw new Error('Could not create TransactionClass instance')

    return new TransactionClass(json.name, json.cases.map((c: string) => new RegExp(c, 'i')))
  }
}
