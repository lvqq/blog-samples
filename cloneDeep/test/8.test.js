// 比较不同深拷贝方法耗时
const { JSDOM } = require('jsdom')
const { window } = new JSDOM(`<!DOCTYPE html>`)
const $ = require('jquery')(window)
const _ = require('loadsh')
const cloneDeep = require('../src/clone3')

// 创建深度为depth，广度为breadth的数组
function create(depth, breadth) {
  const data = {}
  let temp = data
  let i = j = 0
  while(i < depth) {
    temp = temp['data'] = {}
    while(j < breadth) {
      temp[j] = j
      j++
    }
    i++
  }
  return data
}

const data = create(1000, 1000)
const counts = 10000  // 循环次数
let i

// JSON
i = 0
const jsonStart = new Date().getTime()
while(i < counts) {
  JSON.parse(JSON.stringify(data))
  i++
}
const jsonEnd = new Date().getTime()
console.log('Running JSON 10000 times cost:')
console.log(`${jsonEnd - jsonStart} ms`)


// $.extend
i = 0
const extendStart = new Date().getTime()
while(i < counts) {
  $.extend(true, {}, data)
  i++
}
const extendEnd = new Date().getTime()
console.log('Running $.extend 10000 times cost:')
console.log(`${extendEnd - extendStart} ms`)

// cloneDeep
i = 0
const cloneStart = new Date().getTime()
while(i < counts) {
  cloneDeep(data)
  i++
}
const cloneEnd = new Date().getTime()
console.log('Running cloneDeep 10000 times cost:')
console.log(`${cloneEnd - cloneStart} ms`)


// _.cloneDeep
i = 0
const _cloneStart = new Date().getTime()
while(i < counts) {
  _.cloneDeep(data)
  i++
}
const _cloneEnd = new Date().getTime()
console.log('Running cloneDeep 10000 times cost:')
console.log(`${_cloneEnd - _cloneStart} ms`)