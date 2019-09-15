// 验证原生浅拷贝方法
const arr = ['test', { foo: 'test' }]

const obj = {
  str: 'test',
  obj: {
    foo: 'test'
  }
}

const arr1 = arr.slice()
const arr2 = arr.concat()
const arr3 = Array.from(arr)
const arr4 = [...arr]

const obj1 = Object.assign({}, obj)
const obj2 = {...obj}

//修改arr
arr[0] = 'test1'
arr[1].foo = 'test1'
// 修改obj
obj.str = 'test1'
obj.obj.foo = 'test1'

//验证引用关系
console.log('arr: ', arr) 
console.log('arr1: ', arr1) 
console.log('arr2: ', arr2) 
console.log('arr3: ', arr3) 
console.log('arr4: ', arr4)
console.log('obj: ', obj)
console.log('obj1: ', obj1)
console.log('obj2: ', obj2)
