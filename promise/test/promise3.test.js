const MyPromise = require('../src/promise3')

const promise = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 100)
})

promise.then((value) => {
  console.log('value1', value);
  return new MyPromise((resolve) => {
    setTimeout(() => {
      resolve(2)
    }, 100)
  })
})
.then((value) => {
  console.log('value2', value);
})