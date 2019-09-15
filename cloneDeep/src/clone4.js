// 使用非递归实现cloneDeep

// 可遍历type
const GENERATE_TYPE = {
  Object: 'Object',
  Array: 'Array',
  Set: 'Set',
  Map: 'Map',
}

const TYPE = {
  ...GENERATE_TYPE,
  Date: 'Date',
  RegExp: 'RegExp',
}

// 获取数据类型
const getType = (data) => Object.prototype.toString.call(data).slice(8, -1)

// 初始化data
function dataInit(data, type) {
  const reFlags = /\w*$/
  const Constructor = data.constructor;
  switch(type) {
    case TYPE.Object:
      // 获取原对象的原型
      return Object.create(Object.getPrototypeOf(data))
    case TYPE.Array:
      return []
    case TYPE.Date:
      return new Constructor(data.getTime())
    case TYPE.RegExp:
      // 特殊处理regexp，拷贝过程中lastIndex属性会丢失
      const reg = new Constructor(data.source, reFlags.exec(data))
      reg.lastIndex = data.lastIndex
      return reg
    case TYPE.Set:
    case TYPE.Map:
      return new Constructor()
    default:
      return data
  }
}

// 判断item是否入栈
function generate(item, stack, hash) {
  if(hash.has(item)) return hash.get(item)
  const type = getType(item)
  const init = dataInit(item, type)
  // 如果 item 可遍历，入栈
  if(GENERATE_TYPE[type]) {
    stack.push({
      target: init,
      source: item,
      type,
    })
  }
  // 如果 item 为引用类型，写入 weakmap 中
  if(TYPE[type]) hash.set(item, init)
  return init
}

function cloneDeep(data) {
  const dataType = getType(data)
  const retVal = dataInit(data, dataType)
  // 初始化hash
  const hash = new WeakMap()
  hash.set(data, retVal)
  // 如果是非可遍历数据，返回retVal
  if(!GENERATE_TYPE[dataType]) return retVal
  // 初始化stack
  const stack = [{
    target: retVal,
    source: data,
    type: dataType,
  }]
  while(stack.length > 0) {
    // 栈顶节点出栈
    const node = stack.pop()
    const { target, source, type } = node
    switch (type) {
      case GENERATE_TYPE.Array:
        source.forEach(value => {
          target.push(generate(value, stack, hash))
        })
        break
      case GENERATE_TYPE.Object:
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
      case GENERATE_TYPE.Set:
        source.forEach(value => {
          target.add(generate(value, stack, hash))
        })
        break
      case GENERATE_TYPE.Map:
        for (let [mapKey, mapValue] of source) {
          target.set(generate(mapKey, stack, hash), generate(mapValue, stack, hash))
        }
        break
    }
  }
  return retVal
}

module.exports = cloneDeep
