// 使用非递归实现cloneDeep

const TYPE = {
  Object: 'Object',
  Array: 'Array',
  Date: 'Date',
  RegExp: 'RegExp',
  Set: 'Set',
  Map: 'Map',
}

// 获取数据类型
const getType = (data) => Object.prototype.toString.call(data).slice(8, -1)

// 判断item是否入栈并初始化
function generate(item, stack, hash) {
  const Constructor = item.constructor
  const type = getType(item)
  let cloneItem = item
  if(hash.has(item)) return hash.get(item)
  switch(type) {
    case TYPE.Object:
      // 获取原对象的原型
      cloneItem = Object.create(Object.getPrototypeOf(item))
      stack.push({
        target: cloneItem,
        source: item,
      })
      break
    case TYPE.Array:
      cloneItem = []
      stack.push({
        target: cloneItem,
        source: item,
      })
      break
    case TYPE.Date:
      cloneItem = new Constructor(item.getTime())
      break
    case TYPE.RegExp:
      const reFlags = /\w*$/
      // 特殊处理regexp，拷贝过程中lastIndex属性会丢失
      cloneItem = new Constructor(item.source, reFlags.exec(item))
      cloneItem.lastIndex = item.lastIndex
      break
    case TYPE.Set:
    case TYPE.Map:
      cloneItem = new Constructor()
      stack.push({
        target: cloneItem,
        source: item,
      })
  }
  if (TYPE[type]) {
    hash.set(item, cloneItem)
  }
  return cloneItem
}

function cloneDeep(data) {
  // 初始化hash
  const hash = new WeakMap()
  // 初始化stack
  const stack = []
  const cloneData = generate(data, stack, hash)
  while(stack.length > 0) {
    // 栈顶节点出栈
    const node = stack.pop()
    const { target, source } = node
    switch (getType(source)) {
      case TYPE.Array:
        source.forEach(value => {
          target.push(generate(value, stack, hash))
        })
        break
      case TYPE.Object:
        for (let key in source) {
          // 不考虑继承的属性
          if (source.hasOwnProperty(key)) {
            target[key] = generate(source[key], stack, hash)
          }
        }
        // 处理Object中Symbol类型的键名
        Object.getOwnPropertySymbols(source).forEach(symbol => {
          target[symbol] = generate(source[symbol], stack, hash)
        })
        break
      case TYPE.Set:
        source.forEach(value => {
          target.add(generate(value, stack, hash))
        })
        break
      case TYPE.Map:
        for (let [mapKey, mapValue] of source) {
          target.set(generate(mapKey, stack, hash), generate(mapValue, stack, hash))
        }
    }
  }
  return cloneData
}

module.exports = cloneDeep
