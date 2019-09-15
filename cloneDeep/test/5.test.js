// 循环引用，验证栈溢出
const cloneDeep = require('../src/clone2')

const a = {}
a.a = a

cloneDeep(a)
