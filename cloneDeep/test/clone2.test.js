// 验证其他数据类型处理
const cloneDeep = require('../src/clone2')
const symbol = Symbol('sym')

const data = {
	obj: {},
  arr: [],
  reg: /reg/g,
  date: new Date('2019'),
  person: new Person('xxx'),
  [symbol]: 'symbol',
  set: new Set([{foo: 'set'}]),
  map: new Map([[{key: 'map'}, {value: 'map'}]])
}

function Person(name) {
	this.name = name
}

const dataClone = cloneDeep(data)

console.log('dataClone:\n', dataClone)

// // 比较引用地址
// console.log(data.obj === dataClone.obj)                 // false
// console.log(data.arr === dataClone.arr)                 // false
// console.log(data.reg === dataClone.reg)                 // false
// console.log(data.date === dataClone.date)               // false
// console.log(data.func === dataClone.func)               // true
// console.log([...data.set][0] === [...dataClone.set][0]) // false
// console.log([...data.map.keys()][0] === [...dataClone.map.keys()][0])     // false
// console.log([...data.map.values()][0] === [...dataClone.map.values()][0]) // false
