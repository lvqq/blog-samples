// 完整版 promise
// 实现 promise 链式调用、异步执行
// 实现 catch、finally
// 实现 resolve、reject、race、all

const STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

class MyPromise {
  constructor(fn) {
    // 初始化
    this.state = STATE.PENDING
    this.value = null
    this.reason = null
    // 保存数组
    this.fulfilledCallbacks = []
    this.rejectedCallbacks = []
    // 成功
    const fulfill = (value) => {
      // 只有 state 为 pending 时，才可以更改状态
      if (this.state === STATE.PENDING) {
        this.state = STATE.FULFILLED
        this.value = value
        this.fulfilledCallbacks.forEach(cb => cb())
      }
    }

    // 失败
    const reject = (reason) => {
      if (this.state === STATE.PENDING) {
        this.state = STATE.REJECTED
        this.reason = reason
        this.rejectedCallbacks.forEach(cb => cb())
      }
    }
    // 执行函数出错时调用 reject
    try {
      fn(fulfill, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onReject) {
    // Promises/A+ 规范规定： 
    // 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
    // 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onReject = typeof onReject === 'function' ? onReject : e => { throw e }
    const promise2 = new MyPromise((fulfill, reject) => {
      // setTimeout 宏任务，确保onFulfilled 和 onReject 异步执行
      setTimeout(() => {
        if (this.state === STATE.FULFILLED) {
          try {
            const x = onFulfilled(this.value)
            generatePromise(promise2, x, fulfill, reject)
          } catch (e) {
            reject(e)
          }
        }
        if (this.state === STATE.REJECTED) {
          try {
            const x = onReject(this.reason)
            generatePromise(promise2, x, fulfill, reject)
          } catch (e) {
            reject(e)
          }
        }
        // 当 then 是 pending 时，将这两个状态写入数组中
        if (this.state === STATE.PENDING) {
          this.fulfilledCallbacks.push(() => {
            const x = onFulfilled(this.value)
            generatePromise(promise2, x, fulfill, reject)
          })
          this.rejectedCallbacks.push(() => {
            try {
              const x = onReject(this.reason)
              generatePromise(promise2, x, fulfill, reject)
            } catch (e) {
              reject(e)
            }
          })
        }
      }, 0)
    })
    return promise2
  }
  catch(onReject) {
    return this.then(null, onReject)
  }
  finally(callback) {
    return this.then(callback, callback)
  }
}

function generatePromise(promise2, x, fulfill, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  // 如果 x 是 promise，继续遍历
  if (x instanceof MyPromise) {
    x.then((value) => {
      generatePromise(promise2, value, fulfill, reject)
    }, (e) => {
      reject(e)
    })
  } else if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    // 防止重复调用，成功和失败只能调用一次
    let called;
    // 如果 x 是对象或函数
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (called) return;
          called = true;
          // 说明 y是 promise，继续遍历
          generatePromise(promise2, y, fulfill, reject)
        }, (r) => {
          if (called) return;
          called = true;
          reject(r)
        })
      } else {
        fulfill(x)
      }
    } catch(e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    fulfill(x)
  }
}

MyPromise.resolve = (value) => {
  // 传入 promise 类型直接返回
  if (value instanceof MyPromise) return value
  // 传入 thenable 对象时，立即执行 then 方法
  if (value !== null && typeof value === 'object' && value.then && typeof value.then === 'function') {
    return new MyPromise(value.then)
  }
  return new MyPromise((resolve) => {
    resolve(value)
  })
}

MyPromise.reject = (reason) => {
  // 传入 promise 类型直接返回
  if (reason instanceof MyPromise) return reason
  return new MyPromise((resolve, reject) => {
    reject(reason)
  })
}

MyPromise.race = (promises) => {
  return new MyPromise((resolve, reject) => {
    promises.forEach(promise => {
      // 如果当前值不是 Promise，通过 resolve 方法转为 promise
      if (promise instanceof MyPromise) {
        promise.then(resolve,reject)
      } else {
        MyPromise.resolve(promise).then(resolve, reject)
      }
    })
  })
}

MyPromise.all = (promises) => {
  return new MyPromise((resolve, reject) => {
    const arr = []
    let count = 0
    promises.forEach((promise, index) => {
      // 如果当前值不是 Promise，通过 resolve 方法转为 promise
      if (!(promise instanceof MyPromise)) {
        promise = MyPromise.resolve(promise)
      } 
      promise.then((value) => {
        arr[index] = value
        count++
        if (count === promises.length) {
          resolve(arr)
        }
      }, reject)
    })
  })
}

module.exports = MyPromise