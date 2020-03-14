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

// 深拷贝
const cloneDeep = (data, hash = new WeakMap()) => {
  let cloneData = data
  const Constructor = data.constructor;
  // 查询是否已拷贝
  if(hash.has(data)) return hash.get(data)
  switch (getType(data)) {
    case TYPE.Array:
      cloneData = []
      hash.set(data, cloneData)
      data.forEach(value => cloneData.push(cloneDeep(value, hash)))
      break
    case TYPE.Object:
      // 获取原对象的原型
      cloneData = Object.create(Object.getPrototypeOf(data))
      // 对于循环引用，需要在递归循环之前写入hash，否则栈依旧会溢出
      hash.set(data, cloneData)
      for (let key in data) {
        // 不考虑继承的属性
        if (data.hasOwnProperty(key)) {
          cloneData[key] = cloneDeep(data[key], hash)
        }
      }
      // 处理Object中Symbol类型的键名
      Object.getOwnPropertySymbols(data).forEach(symbol => {
        cloneData[symbol] = cloneDeep(data[symbol], hash)
      })
      break
    case TYPE.Date:
      cloneData = new Constructor(data.getTime())
      hash.set(data, cloneData)
      break
    case TYPE.RegExp:
      const reFlags = /\w*$/
      // 特殊处理regexp，拷贝过程中lastIndex属性会丢失
      cloneData = new Constructor(data.source, reFlags.exec(data))
      cloneData.lastIndex = data.lastIndex
      hash.set(data, cloneData)
      break
    case TYPE.Set:
      cloneData = new Constructor()
      hash.set(data, cloneData)
      data.forEach(value => cloneData.add(cloneDeep(value, hash)))
      break
    case TYPE.Map:
      cloneData = new Constructor()
      hash.set(data, cloneData)
      for (let [mapKey, mapValue] of data) {
        // Map的键、值都可以是引用类型，因此都需要拷贝
        cloneData.set(cloneDeep(mapKey, hash), cloneDeep(mapValue, hash))
      }
  }
  return cloneData
}

module.exports = cloneDeep
