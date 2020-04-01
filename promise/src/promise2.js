// 解决异步

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

  then(onFulfilled, onRejected) {
    if (this.state === STATE.FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.state === STATE.REJECTED) {
      onRejected(this.reason)
    }
    // 当 then 是 pending 时，将这两个状态写入数组中
    if (this.state === STATE.PENDING) {
      this.fulfilledCallbacks.push(() => {
        onFulfilled(this.value)
      })
      this.rejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}

module.exports = MyPromise