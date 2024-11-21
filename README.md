# TSPrism
A prism of type helpers and testing utilities for Typescript!

## Install
`npm i -D tsprism`

# Testing Utilities
`tsprism` includes a set of utilities to help you test and document the expected output of generic, mapped or advanced types.

## Import
```TS
import { Expect, TypeOf, ToBe, ToNotBe, ToEqual, TS } from 'tsprism'
```

## ToBe
A comparison operator for primitive types. 
```TS
import { Expect, TypeOf, ToBe } from 'tsprism'

const myObj = { ts: 'test', prism: 'utilities' }
type Obj = keyof typeof myObj

🟢 type testObj1 = Expect<TypeOf<Obj, ToBe, 'ts' | 'prism'>>

🔴 type testObj2 = Expect<TypeOf<Obj>, ToBe, typeof myObj>
//                        ˄˄ 🚁 Type 'false' does not satisfy the constraint 'true'.ts(2344)
```

## ToNotBe
The inverse comparison operator for ***ToBe***.
```TS
import { Expect, TypeOf, ToNotBe } from 'tsprism'

const myObj = { ts: 'test', prism: 'utilities' }
type Obj = keyof typeof myObj

🟢 type testObj1 = Expect<TypeOf<Obj>, ToNotBe, typeof myObj>

🔴 type testObj2 = Expect<TypeOf<Obj, ToNotBe, 'ts' | 'prism'>>
//                        ˄˄ 🚁 Type 'false' does not satisfy the constraint 'true'.ts(2344)
```

## ToEqual
Strict comparison operator for complex types.
```TS
import { Expect, TypeOf, ToBe, ToEqual } from 'tsprism'

const myObj = { ts: 'test', prism: 'utilities' } as const
type Obj = typeof myObj


🟢 type testObj = Expect<TypeOf<Obj, ToEqual, Readonly<{ ts: 'test', prism: 'utilities' }>>>

🔴 type testObj2 = Expect<TypeOf<Obj, ToEqual, Readonly<{ ts: string, prism: string }>>>
//                        ˄˄ 🚁 Type 'false' does not satisfy the constraint 'true'.ts(2344)
🔴 type testObj3 = Expect<TypeOf<Obj, ToEqual, { ts: 'test', prism: 'utilities' }>>
//                        ˄˄ 🚁 Type 'false' does not satisfy the constraint 'true'.ts(2344)
```
> Both failing test cases would pass with the ***ToBe*** comparison operator.

## TS
This type is a semantic alias for `TypeOf`. They can be used interchangeably. It's purpose is to improve readability when the `typeof` keyword needs to be used before a runtime value in the test case. 

For example:

```TS
import { Expect, TypeOf, TS, ToBe } from 'tsprism'

const myObj = { ts: 'test', prism: 'utilities' }
type Obj = typeof myObj

🟢 type testObj1 = Expect<TypeOf<Obj, ToBe, { ts: string, prism: string }>>

🟢 type testObj2 = Expect<TS<typeof myObj, ToBe, { ts: string, prism: string }>>
```
