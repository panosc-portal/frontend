import {curry, of} from 'ramda'

import {toggleValueInList, toggleIsActive, assign} from './new'
const state = {isActive: false, value: 0, operator: 'gt'}
const index = 0
test('should toggle filter prop isActive', () => {
  const newState = {...state, isActive: true}
  const inputState = of(state)
  const e = undefined
  const result = toggleIsActive(index, e, inputState)
  expect(result).toStrictEqual(of(newState))
})
test('should update filter prop value', () => {
  const value = [800, 1100]
  const inputState = of(state)
  const result = assign(index, 'value', value, inputState)
  const desiredState = {...state, value}
  expect(result).toStrictEqual(of(desiredState))
})
test('update operator', () => {
  const operator = 'between'
  const inputState = of(state)
  const result = assign(index, 'operator', operator, inputState)
  const desired = {...state, operator}
  expect(result).toStrictEqual(of(desired))
})
test('update unit', () => {
  const unit = 'between'
  const inputState = of(state)
  const result = assign(index, 'unit', unit, inputState)
  const desired = {...state, unit}
  expect(result).toStrictEqual(of(desired))
})
test('update list of values', () => {
  const initialList = ['musli', 'rice', 'apricot', 'cheese']
  const value = 'butter'
  const stateWithList = {...state, value: [...initialList, value]}
  const inputState = of(stateWithList)
  const result = toggleValueInList(index, value, inputState)
  const desired = {...state, value: initialList}
  expect(result).toStrictEqual(of(desired))
})
test('update list of values 2', () => {
  const initialList = ['musli', 'rice', 'apricot', 'cheese']
  const value = 'butter'
  const stateWithList = {...state, value: initialList}
  const inputState = of(stateWithList)
  const result = toggleValueInList(index, value, inputState)
  const desired = {...state, value: [...initialList, value]}
  expect(result).toStrictEqual(of(desired))
})
