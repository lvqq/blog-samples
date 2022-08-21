/* =============== 泛型 =============== */


// 定义
type Test3<T> = T | string;
// 使用
const test: Test3<number> = 1
// react 中的例子
// const [state, setState] = useState<number>(0)



// 函数式声明
function func3<T>(param: T): T {
  return param;
}

// 表达式声明
const func4: <T>(param: T) => T = (param) => {
  return param;
}


/* =============== typeof =============== */

const str4 = 'text'
type Str = typeof str // string




const obj = {
  field1: 'text',
  field2: 1,
  field3: {
      field: 'text'
  }
}

type ObjType = typeof obj
// {
// field1: string;
// field2: number;
// field3: {
// field: string;
// };
// }


/* =============== keyof =============== */
interface Test4 {
  field1: string;
  field2: number;
}

type Fields1 = keyof Test4
// "field1" | "field2"


/* =============== in =============== */

type Fields2 = 'field1' | 'field2'
type Test5 = {
  [key in Fields2]: string
}
// Test: { field1: string; field2: string }



/* =============== extends =============== */


type Test6<T extends string | number> = T[]
type TestExtends1 = Test6<string> // success
type TestExtends2 = Test6<boolean> // Type 'boolean' does not satisfy the constraint 'string | number'.



type Test7<T> = T extends string | number ? T[] : T
type TestExtends3 = Test7<string> // string[]
type TestExtends4 = Test7<boolean> // boolean



/* =============== infer =============== */
type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R ? R : any


/* =============== 索引类型 =============== */

interface Test8 {
  [key: string]: string;
}



interface Test9 {
  // Error: Property 'field' of type 'number' is not assignable to 'string' index type 'string'
  field: number;
  [key: string]: string;
}



interface Test10 {
  field1: string;
  field2: number;
}

type Fields3 = keyof Test10
// "field1" | "field2"



interface Test11 {
  field1: string;
  field2: number
}

type Field1 = Test11["field1"] // string
type Field2 = Test11["field2"] // number
// 配合 keyof，可以获取索引签名对应类型的联合类型
type Fields4 = Test11[keyof Test11] // string | number



interface Test12 {
  [key: string]: number;
}

type Field3 = Test12[string] // number



/* =============== 映射类型 =============== */

type ToString<T> = {
  [key in keyof T]: string
}

interface Test13 {
    field1: string;
    field2: number;
    field3: boolean;
}

type Fields5 = ToString<Test13>
