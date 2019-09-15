// 处理其他数据类型

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

function cloneDeep(data) {
  const dataType = getType(data)
  // 如果是其他类型，直接返回
  if(!TYPE[dataType]) return data
  // 初始化data
  const retVal = dataInit(data, dataType)
  // 遍历可遍历类型
  switch (dataType) {
    case TYPE.Array:
      data.forEach(value => retVal.push(cloneDeep(value)))
      break
    case TYPE.Object:
      for (let key in data) {
        // 不考虑继承的属性
        if (data.hasOwnProperty(key)) {
          retVal[key] = cloneDeep(data[key])
        }
      }
      // 处理Object中Symbol类型的键名
      Object.getOwnPropertySymbols(data).forEach(symbol => {
        retVal[symbol] = cloneDeep(data[symbol])
      })
      break
    case TYPE.Set:
      data.forEach(value => retVal.add(cloneDeep(value)))
      break
    case TYPE.Map:
      for (let [mapKey, mapValue] of data) {
        // Map的键、值都可以是引用类型，因此都需要拷贝
        retVal.set(cloneDeep(mapKey), cloneDeep(mapValue))
      }
      break
  }
  return retVal
}

module.exports = cloneDeep
