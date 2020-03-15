// 简易版 promise
// 实现了链式调用、异步执行
// then 方法未对返回数据作处理

const STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

class MyPromise {
  constructor(fn) {
    this.state = STATE.PENDING
    this.value = null
    this.reason = null
    this.fulfilledCallbacks = []
    this.rejectedCallbacks = []

    const fulfill = (value) => {
      this.state = STATE.FULFILLED
      this.value = value
      this.fulfilledCallbacks.forEach(cb => cb())
    }

    const reject = (reason) => {
      this.state = STATE.REJECTED
      this.reason = reason
      this.rejectedCallbacks.forEach(cb => cb())
    }

    try {
      fn(fulfill, reject)
    } catch(e) {
      reject(e)
    }
  }

  then(onFulfill, onReject) {
    return new MyPromise((fulfill, reject) => {
      if (this.state === STATE.FULFILLED) {
        const x = onFulfill(this.value)
        fulfill(x)
      }
      if (this.state === STATE.REJECTED) {
        const x = onReject(this.reason)
        reject(x)
      }
      if (this.state === STATE.PENDING) {
        this.fulfilledCallbacks.push(() => {
          const x = onFulfill(this.value)
          fulfill(x)
        })
        this.rejectedCallbacks.push(() => {
          const x = onReject(this.reason)
          reject(x)
        })
      }
    })
  }
}

module.exports = MyPromise
