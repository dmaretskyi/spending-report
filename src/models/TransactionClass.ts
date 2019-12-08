import { asArray, asMapped, asObject, asString } from '@restless/sanitizers'

export class TransactionClass {

  constructor(
    public name: string,
    public cases: RegExp[],
    public color: string,
  ) { }

  matches(str: string) {
    return this.cases.some(c => !!str.match(c))
  }

  toJSON() {
    return {
      name: this.name,
      cases: this.cases.map(c => c.source),
      color: this.color,
    }
  }

  static sanitizer = asMapped(
    asObject({
      name: asString,
      cases: asArray(asString),
      color: asString,
    }),
    json => new TransactionClass(
      json.name,
      json.cases.map(regex => new RegExp(regex, 'i')),
      json.color,
    )
  )

  addCase(source: string) {
    this.cases.push(new RegExp(source, 'i'))
  }

  equals(other: TransactionClass) {
    return this.name === other.name
  }
}
