// 解决异步

const STATE = {
  PENDING: 'pending',
  FULLFILLED: 'fullfilled',
  REJECTED: 'rejected'
}

class MyPromise {
  constructor(fn) {
    // 初始化
    this.state = STATE.PENDING
    this.value = null
    this.reason = null
    // 保存数组
    this.fullfilledCallbacks = []
    this.rejectedCallbacks = []
    // 成功
    const fullfill = (value) => {
      // 只有 state 为 pending 时，才可以更改状态
      if (this.state === STATE.PENDING) {
        this.state = STATE.FULLFILLED
        this.value = value
        this.fullfilledCallbacks.forEach(cb => cb())
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
      fn(fullfill, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFullfill, onReject) {
    if (this.state === STATE.FULLFILLED) {
      onFullfill(this.value)
    }
    if (this.state === STATE.REJECTED) {
      onReject(this.reason)
    }
    // 当 then 是 pending 时，将这两个状态写入数组中
    if (this.state === STATE.PENDING) {
      this.fullfilledCallbacks.push(() => {
        onFullfill(this.value)
      })
      this.rejectedCallbacks.push(() => {
        onReject(this.reason)
      })
    }
  }
}

module.exports = MyPromise