// 验证 JSON.parse(JSON.stringify(data)) 
// 当 data 的子数据为基本类型
const data = {
	a: 1,
  b: 'str',
  c: true,
  d: null,
  e: undefined,
  f: NaN,
  g: Infinity,
}

const dataCopy = JSON.parse(JSON.stringify(data))

console.log('dataCopy:\n', dataCopy)
