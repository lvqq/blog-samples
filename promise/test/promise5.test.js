const MyPromise = require('../src/promise5')

const promise = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 100)
})

// catch、finally test
promise.then((value) => {
  console.log('value1', value);
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      reject(2)
    }, 100)
  })
})
.then((value) => {
  console.log('value2', value);
})
.catch(e => {
  console.log('err', e);
})
.finally(() => {
  console.log('fin');
})

// resolve test
const thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

MyPromise.resolve(thenable)
.then(val => {
  console.log('resolve1', val);
})

console.log('resolve2', MyPromise.resolve(1))

// race test
MyPromise.race([new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
}), new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(2)
  }, 500)
})])
.then(val => {
  console.log('race', val);
})

// all test
MyPromise.all([new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
}), new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(2)
  }, 500)
})])
.then(val => {
  console.log('all1', val);
})

MyPromise.all([new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
}), new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(2)
  }, 500)
})])
.catch(e => {
  console.log('all2', e);
})