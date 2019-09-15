// 验证非递归深拷贝

const cloneDeep = require('../src/clone4')

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

// 验证引用关系
console.log(data.obj === dataClone.obj)                 // false
console.log(data.arr === dataClone.arr)                 // false
console.log(data.reg === dataClone.reg)                 // false
console.log(data.date === dataClone.date)               // false
console.log(data.func === dataClone.func)               // true
console.log([...data.set][0] === [...dataClone.set][0]) // false
console.log([...data.map.keys()][0] === [...dataClone.map.keys()][0])     // false
console.log([...data.map.values()][0] === [...dataClone.map.values()][0]) // false

const temp = {}
const data1 = {
	a: temp,
  b: temp,
}
const dataClone1 = cloneDeep(data1)

const obj = {}
obj.obj = obj

const arr = []
arr[0] = arr

const set = new Set()
set.add(set)

const map = new Map()
map.set(map, map)

// 验证引用关系
console.log('dataClone1.a === dataClone1.b: ', dataClone1.a === dataClone1.b) // true

// 验证循环引用
console.log('obj:\n', cloneDeep(obj))
console.log('arr:\n', cloneDeep(arr))
console.log('set:\n', cloneDeep(set))
console.log('map:\n', cloneDeep(map))