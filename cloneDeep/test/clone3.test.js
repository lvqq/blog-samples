// 验证循环引用
const cloneDeep = require('../src/clone3')

const temp = {}
const data = {
	a: temp,
  b: temp,
}
const dataClone = cloneDeep(data)

const obj = {}
obj.obj = obj

const arr = []
arr[0] = arr

const set = new Set()
set.add(set)

const map = new Map()
map.set(map, map)

// 验证引用关系
console.log('dataClone.a === dataClone.b: ', dataClone.a === dataClone.b) // true

// 验证环
console.log('obj:\n', cloneDeep(obj))
console.log('arr:\n', cloneDeep(arr))
console.log('set:\n', cloneDeep(set))
console.log('map:\n', cloneDeep(map))
