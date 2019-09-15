// 验证 JSON.parse(JSON.stringify(data)) 
// 当 data 为自定义构造函数的实例对象

function Person(name) {
  // 构造函数实例属性name
	this.name = name
  // 构造函数实例方法getName
  this.getName = function () { 
  	return this.name
  }
}
// 构造函数原型属性age
Person.prototype.age = 18

const person = new Person('xxx')
const personCopy = JSON.parse(JSON.stringify(person))

console.log('person: ', person)
console.log('personCopy: ', personCopy)
console.log('person.age: ', person.age)
console.log('personCopy.age: ', personCopy.age)
console.log('person.constructor:\n', person.constructor)
console.log('personCopy.constructor:\n', personCopy.constructor)
