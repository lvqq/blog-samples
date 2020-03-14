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
  let cloneData = data
  const Constructor = data.constructor;
  // 判断data类型
  switch (getType(data)) {
    case TYPE.Array:
      return data.map(value => cloneDeep(value))
    case TYPE.Object:
      // 获取原对象的原型
      cloneData = Object.create(Object.getPrototypeOf(data))
      for (let key in data) {
        // 不考虑继承的属性
        if (data.hasOwnProperty(key)) {
          cloneData[key] = cloneDeep(data[key])
        }
      }
      // 处理Object中Symbol类型的键名
      Object.getOwnPropertySymbols(data).forEach(symbol => {
        cloneData[symbol] = cloneDeep(data[symbol])
      })
      break
    case TYPE.Date:
      return new Constructor(data.getTime())
    case TYPE.RegExp:
      const reFlags = /\w*$/
      // 特殊处理regexp，拷贝过程中lastIndex属性会丢失
      cloneData = new Constructor(data.source, reFlags.exec(data))
      cloneData.lastIndex = data.lastIndex
      break
    case TYPE.Set:
      cloneData = new Constructor()
      data.forEach(value => cloneData.add(cloneDeep(value)))
      break
    case TYPE.Map:
      cloneData = new Constructor()
      for (let [mapKey, mapValue] of data) {
        // Map的键、值都可以是引用类型，因此都需要拷贝
        cloneData.set(cloneDeep(mapKey), cloneDeep(mapValue))
      }
  }
  return cloneData
}

module.exports = cloneDeep
