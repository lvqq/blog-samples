/* =============== 字面量类型 =============== */

const num_literal: 1 | 2 = 1
const str_literal: "text1" | "text2" = "text1"


/* =============== 枚举 =============== */

enum TestEnum {
  key1 = 'value1',
  key2 = 2
}

// 常量枚举
const enum TestEnum1 {
  key1 = 'value1',
  key2 = 2
}
const val = TestEnum1.key2


/* =============== 接口 =============== */

// 可选
interface Person {
  name: string
  addr?: string
}

/* =============== readonly =============== */

interface Person {
  name: string
  readonly age: number
}

const person: Person = { name: 'LiHua', age: 18 }
person.age = 20 // Cannot assign to 'age' because it is a read-only property

const list: readonly number[] = [1, 2]
list.push(3) // Property 'push' does not exist on type 'readonly number[]'.
list[0] = 2 // Index signature in type 'readonly number[]' only permits reading


/* =============== 类型别名 =============== */

type Person1 = {
  name: string;
  readonly age: number;
  addr?: string;
}


/* =============== 定义对象与扩展 =============== */

type Person2 = {
  name: string
}

// 接口通过继承的方式实现类型扩展：
interface Person3 extends Person2 {
    age: number
}

// 类型别名通过交叉类型的方式实现类型扩展：
type Person4 = Person2 & {
    age: number
}


type str = string
type num = number
type union = string | number
type tup = [string, number]


/* =============== 类型合并 =============== */

interface Person5 {
  name: string
}
interface Person5 {
    age: string
}
let person1: Person5 // { name: string; age: string } 
type Person6 {
    name: string
}
// Error: Duplicate identifier 'Person2'
type Person6 {
    age: string
}


/* =============== 索引签名问题 =============== */
interface Test1 {
  name: string
}
type Test2 = {
  name: string
}
const data1: Test1 = { name: 'name1' }
const data2: Test2 = { name: 'name2' }
interface PropType {
  [key: string]: string
}
let prop: PropType
prop = data1 // Error: Type 'Test2' is not assignable to type 'PropType'. Index signature for type 'string' is missing in type 'Test2'
prop = data2 // success


/* =============== 联合类型 =============== */
const union: string | number = 'text'

/* =============== 交叉类型 =============== */
interface A {
  field1: string
}

interface B {
  field2: number
}

const test9: A & B = { field1: 'text', field2: 1 };

/* =============== 类型不存在 =============== */

type A1 = number
type B1 = string
type Union = A1 & B1 // never


/* =============== 同名属性交叉 =============== */

interface A2 {
  field1: string
  common: {
  fieldA: string
}
}

interface B2 {
  field2: number
  common: {
  fieldB: number
}
}

const fields: A2 & B2 = { 
field1: 'text1', 
field2: 1, 
common: { fieldA: 'text2', fieldB: 2 } 
} 
// success

/* =============== 鸭子类型 =============== */

interface Param {
  field1: string
}

const func = (param: Param) => param
func({ field1: '111', field2: 2 }) // Error

const param1 = { field1: '111', field2: 2 }
func(param1); // success


/* =============== 类型断言 =============== */


interface Param {
  field1: string
}

const func1 = (param: Param) => param
func1({ field1: '111', field2: 2 } as Param) // success



const func2 = (str: string) => str
const param = ['text1', 'text2'].find(str => str === 'text1')
func2(param) // Error
func2(param!) // success
