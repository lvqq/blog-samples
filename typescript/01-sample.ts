/* =============== 原始数据类型 =============== */
const str: string = 'text'
const num: number = 1
const bool: boolean = true
const undef: undefined = undefined
const empty: null = null
const symb: symbol = Symbol('symb')
const bigint: bigint = BigInt(9007199254740993)

/* object */

let demo: object 
demo = []
demo = {}
demo = () => {}
demo = 1 // Error: Type 'number' is not assignable to type 'object'

/* =============== Object 与 {} =============== */

let demo1: Object
demo1 = []
demo1 = {}
demo1 = 1
// null, undefined 需要在 strictNullChecks=false 时才可以
demo1 = null 
demo1 = undefined 

let demo2: {}
demo2 = []
demo2 = {}
demo2 = 1
demo2 = null // Error: Type 'null' is not assignable to type '{}'
demo2 = undefined // Error: Type 'undefined' is not assignable to type '{}'


/* =============== 数组 =============== */

const arr1: string[] = []
// 等价于
const arr2: Array<string> = []

/* =============== 元组 =============== */

const tup: [string, number] = ['LiHua', 18]

// 支持可选
const tup1: [string, number?] = ['LiHua']
// 支持对属性命名
const tup2: [name: string, age?: number] = ['LiHua']

/* =============== 函数 =============== */

// 函数式声明
function test1(x: number, y: number): number {
  return x + y
}
// 表达式声明
const test2: (x: number, y: number) => number = (x, y) => {
  return x + y
}
// 或
const test3 = (x: number, y: number): number => {
  return x + y
}

/* =============== void =============== */


// case 1
function test4() {}

// case 2
function test5() {
    return;
}

// case 3
function test6() {
    return undefined;
}


/* =============== any 与 unknown =============== */

let type1: any
// 被任意类型赋值
type1 = 1
// 赋值给任意类型
let type2: number = type1 

let type3: unknown
// 被任意类型赋值
type3 = 1 
// 赋值给任意类型
let type4: number = type3 // Error: Type 'unknown' is not assignable to type 'number'



let str1: unknown = 'string';
str1.slice(0, 1) // Error: Object is of type 'unknown'.

let str2: any = 'string';
str2.slice(0, 1) // Success



let str3: unknown = 'string';
// 1. 通过 as 类型断言
(str3 as string).slice(0, 1) 

// 2. 通过 typeof 类型推断
if (typeof str3 === 'string') {
    str3.slice(0, 1)
}

/* =============== never =============== */

// 1.抛出异常
function test7(): never {
  throw new Error('err')
}

// 2. 死循环
function test8(): never {
  while(true) {}
}



const checkValueType = (value: string | number) => {
  if (typeof value === 'string') {
      // do something
  } else if (typeof value === 'number') {
      // do something
  } else {
      const check: never = value
      // do something
  }
}



const checkValueType1 = (value: string | number | boolean) => {
  if (typeof value === 'string') {
      // do something
  } else if (typeof value === 'number') {
      // do something
  } else {
      const check: never = value // Error: Type 'boolean' is not assignable to type 'never'.
      // do something
  }
}