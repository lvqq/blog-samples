const MyPromise = require('../src/promise1')

// 同步
const promise1 = new MyPromise((resolve, reject) => {
  resolve(1)
})

promise1.then((value) => {
  console.log('value1', value)
})

// 异步
const promise2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 2000)
})

promise2.then((value) => {
  console.log('value2', value)
})