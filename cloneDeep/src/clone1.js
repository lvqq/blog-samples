// 简单深拷贝
function cloneDeep(data) {
  if(typeof data !== 'object') return data
  const retVal = Array.isArray(data) ? [] : {}
  for(let key in data) {
    retVal[key] = cloneDeep(data[key])
  }
  return retVal
}

module.exports = cloneDeep
