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

// 初始化item并入栈
function generate(item, stack, hash) {
  if (!item || typeof item !== 'object') return item
  if(hash.has(item)) return hash.get(item)
  let cloneItem = item
  const Constructor = item.constructor
  const itemType = getType(item)
  // data 初始化
  if (itemType === TYPE.Array) {
    cloneItem = []
  } else if (itemType === TYPE.Object) {
    // 获取原对象的原型
    cloneItem = Object.create(Object.getPrototypeOf(item))
  } else if (itemType === TYPE.Date) {
    cloneItem = new Constructor(item.getTime())
  } else if (itemType === TYPE.RegExp) {
    const reFlags = /\w*$/
    // 特殊处理regexp，拷贝过程中lastIndex属性会丢失
    cloneItem = new Constructor(item.source, reFlags.exec(item))
    cloneItem.lastIndex = item.lastIndex
  } else if (itemType === TYPE.Set || itemType === TYPE.Map) {
    cloneItem = new Constructor()
  }
  stack.push({
    target: cloneItem,
    source: item,
  })
  hash.set(item, cloneItem)
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
    const type = getType(source)
    // 遍历 source
    if (type === TYPE.Set) {
      for (let value of source) {
        target.add(generate(value, stack, hash))
      }
    } else if (type === TYPE.Map) {
      for (let [mapKey, mapValue] of source) {
        target.set(generate(mapKey, stack, hash), generate(mapValue, stack, hash))
      }
    } else {
      for (let key in source) {
        // 不考虑继承的属性
        if (source.hasOwnProperty(key)) {
          target[key] = generate(source[key], stack, hash)
        }
      }
    }
  }
  return cloneData
}

module.exports = cloneDeep
