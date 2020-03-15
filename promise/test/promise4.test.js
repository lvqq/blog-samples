const MyPromise = require('../src/promise4')

const promise = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 100)
})

promise.then((value) => {
  console.log('value1', value);
  return 333
})
.then((value) => {
  console.log('value2', value);
})