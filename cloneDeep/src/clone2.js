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

// 深拷贝
const cloneDeep = (data) => {
  if (!data || typeof data !== 'object') return data
  let cloneData = data
  const Constructor = data.constructor;
  const dataType = getType(data)
  // data 初始化
  if (dataType === TYPE.Array) {
    cloneData = []
  } else if (dataType === TYPE.Object) {
    // 获取原对象的原型
    cloneData = Object.create(Object.getPrototypeOf(data))
  } else if (dataType === TYPE.Date) {
    cloneData = new Constructor(data.getTime())
  } else if (dataType === TYPE.RegExp) {
    const reFlags = /\w*$/
    // 特殊处理regexp，拷贝过程中lastIndex属性会丢失
    cloneData = new Constructor(data.source, reFlags.exec(data))
    cloneData.lastIndex = data.lastIndex
  } else if (dataType === TYPE.Set || dataType === TYPE.Map) {
    cloneData = new Constructor()
  }
  
  // 遍历 data
  if (dataType === TYPE.Set) {
    for (let value of data) {
      cloneData.add(cloneDeep(value))
    }
  } else if (dataType === TYPE.Map) {
    for (let [mapKey, mapValue] of data) {
      // Map的键、值都可以是引用类型，因此都需要拷贝
      cloneData.set(cloneDeep(mapKey), cloneDeep(mapValue))
    }
  } else {
    for (let key in data) {
      // 不考虑继承的属性
      if (data.hasOwnProperty(key)) {
        cloneData[key] = cloneDeep(data[key])
      }
    }
  }
  return cloneData
}

module.exports = cloneDeep
