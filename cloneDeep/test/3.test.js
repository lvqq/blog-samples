// 验证 JSON.parse(JSON.stringify(data)) 
// 当 data 的子数据为引用类型
const data = {
  a: [1, 2, 3],
  b: {foo: 'obj'},  
	c: new Date('2019-08-28'),
  d: /^abc$/g,
  e: function() {},
  f: new Set([1, 2, 3]),
  g: new Map([['foo', 'map']]),
}

const dataCopy = JSON.parse(JSON.stringify(data))

console.log('dataCopy:\n', dataCopy)
