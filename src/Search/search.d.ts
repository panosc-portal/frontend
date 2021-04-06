interface Base {
  name: string
  type: 'range' | 'string' | 'boolean'
}
interface NumericParameter {
  minValue: number
  maxValue: number
  defaultUnit?: string
}
