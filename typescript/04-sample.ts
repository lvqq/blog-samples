/* =============== Partial =============== */

type MyPartial<T> = { 
  [P in keyof T]?: T[P] | undefined; 
}



interface Person7 {
  name: string;
  age?: number;
}
type PersonPartial = Partial<Person7>
// { name?: string | undefined; age?: number | undefined }



type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] | undefined
}

/* =============== Required =============== */

type MyRequired<T> = { 
  [P in keyof T]-?: T[P]; 
}



interface Person8 {
  name: string;
  age?: number;
}

type PersonRequired = Required<Person8>
// { name: string; age: number }

/* =============== Readonly =============== */
type MyReadonly<T> = { 
  readonly [P in keyof T]: T[P]; 
}



interface Person9 {
  name: string;
  age?: number;
}

type PersonReadonly = Readonly<Person9>
// { readonly name: string; readonly age?: number | undefined }


/* =============== Record =============== */
type MyRecord<K extends string | number | symbol, T> = { 
  [P in K]: T; 
}

/* =============== Exclude =============== */
type MyExclude<T, U> = T extends U ? never : T



type Test14 = string | number
type TestExclude = Exclude<Test14, string> // number

/* =============== Extract =============== */
type MyExtract<T, U> = T extends U ? T : never


type Test15 = string | number
type TestExtract = Extract<Test15, string> // string

/* =============== NonNullable =============== */
type MyNonNullable<T> = T extends null | undefined ? never : T


type Test16 = string | number | null | undefined
type TestNonNullable = NonNullable<Test16> // string | number

/* =============== Pick =============== */
type MyPick<T, K extends keyof T> = { 
  [P in K]: T[P]; 
}



interface Person10 {
  name: string;
  age?: number;
}

type PersonPick = Pick<Person10, 'age'>
// { age?: number }

/* =============== Omit =============== */
type MyOmit<T, K extends string | number | symbol> = { 
  [P in Exclude<keyof T, K>]: T[P]; 
}


interface Person11 {
  name: string;
  age?: number;
}

type PersonOmit = Omit<Person11, 'name'>
// { age?: number }

/* =============== Parameters =============== */

type MyParameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any ? P : never



type Func1 = (param: string) => string[]
type FuncParam = Parameters<Func1> // [param: string]

/* =============== ReturnType =============== */

type MyReturnType2<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R ? R : any

type Func2 = (param: string) => string[]
type FuncReturn = ReturnType<Func2> // string[]