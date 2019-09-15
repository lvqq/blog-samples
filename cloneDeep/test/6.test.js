// 循环引用 验证解除引用
const cloneDeep = require('../src/clone2')

const temp = {}
const data = {
	a: temp,
  b: temp,
}
const dataJson = JSON.parse(JSON.stringify(data))
const dataClone = cloneDeep(data)

// 验证对于其他数据的引用关系
console.log('data.a === data.b: ', data.a === data.b)
console.log('dataJson.a === dataJson.b: ', dataJson.a === dataJson.b)
console.log('dataClone.a === dataClone.b: ', dataClone.a === dataClone.b)