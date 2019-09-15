// 验证层级过深递归栈溢出

function create(depth, breadth) {
  const data = {}
  let temp = data
  let i = j = 0
  while(i < depth) {
    temp = temp['data'] = {}
    while(j < breadth) {
      temp[j] = j
      j++
    }
    i++
  }
  return data
}

const data = create(10000, 100)
cloneDeep(data)