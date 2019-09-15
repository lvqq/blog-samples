// 处理循环引用

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

function cloneDeep(data, hash = new WeakMap()) {
  const dataType = getType(data)
  // 如果是其他类型，直接返回
  if(!TYPE[dataType]) return data
  // 查询是否已拷贝
  if(hash.has(data)) return hash.get(data)
  const retVal = dataInit(data, dataType)
  // 对于循环引用，需要在递归循环之前写入hash，否则栈依旧会溢出
  hash.set(data, retVal)
  switch (dataType) {
    case TYPE.Array:
      data.forEach(value => retVal.push(cloneDeep(value, hash)))
      break
    case TYPE.Object:
      for (let key in data) {
        // 不考虑继承的属性
        if (data.hasOwnProperty(key)) {
          retVal[key] = cloneDeep(data[key], hash)
        }
      }
      // 处理Object中Symbol类型的键名
      Object.getOwnPropertySymbols(data).forEach(symbol => {
        retVal[symbol] = cloneDeep(data[symbol], hash)
      })
      break
    case TYPE.Set:
      data.forEach(value => retVal.add(cloneDeep(value, hash)))
      break
    case TYPE.Map:
      for (let [mapKey, mapValue] of data) {
        // Map的键、值都可以是引用类型，因此都需要拷贝
        retVal.set(cloneDeep(mapKey, hash), cloneDeep(mapValue, hash))
      }
      break
  }
  return retVal
}

module.exports = cloneDeep
