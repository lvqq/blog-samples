// 运行 npm run test4 进行测试
const MyPromise = require('../src/promise4')

MyPromise.defer = MyPromise.deferred = () => {
  let d = {}
  d.promise = new MyPromise((resolve, reject) => {
    d.resolve = resolve;
    d.reject = reject;
  });
  return d;
}

module.exports = MyPromise
