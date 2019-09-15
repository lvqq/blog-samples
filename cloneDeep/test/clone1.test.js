// 简单深拷贝验证
const cloneDeep = require('../src/clone1')

const data = {
  str: 'test',
  obj: {
    foo: 'test'
  },
  arr: ['test', {foo: 'test'}]
}

const dataCopy = cloneDeep(data)

console.log('dataCopy:\n', dataCopy)
