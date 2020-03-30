// 完整版 promise
// 实现 promise/A+ 规范
// 实现 promise 链式调用、异步执行

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
      if (this.state === STATE.FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            generatePromise(promise2, x, fulfill, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.state === STATE.REJECTED) {
        setTimeout(() => {
          try {
            const x = onReject(this.reason)
            generatePromise(promise2, x, fulfill, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      // 当 then 是 pending 时，将这两个状态写入数组中
      if (this.state === STATE.PENDING) {
        this.fulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              generatePromise(promise2, x, fulfill, reject)
            } catch(e) {
              reject(e)
            }
          }, 0)
        })
        this.rejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onReject(this.reason)
              generatePromise(promise2, x, fulfill, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise2
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

module.exports = MyPromise
