# TSPrism
A prism of type helpers and testing utilities for Typescript!

`npm i -D tsprism`

# Testing Utilities
`tsprism` includes a set of utilities to help you test and document the expected output of generic, mapped or dynamic types.

## Import
```TS
import { Expect, TypeOf, TS, ToBe, ToNotBe, ToEqual } from 'tsprism'
```
- [Expect](#Expect)
- [TypeOf](#TypeOf)
- [TS](#TS)
- [ToBe](#ToBe)
- [ToNotBe](#ToNotBe)
- [ToEqual](#ToEqual)

## Expect
The main assertion wrapper for our type test cases. It needs to be assigned to a type for the TS compiler. It takes in a type which returns a boolean as argument `T`.  

```TS
import { Expect } from 'tsprism'

type test = Expect<T>
```


## TypeOf
Our main assertion type to make the comparison of our test cases. It takes three arguments to make the assertion. 

- `Input` - The type we want to test
- `Comparison Operator` - The comperison type we want to use to make the assertion.
  - [ToBe](#ToBe)
  - [ToNotBe](#ToNotBe)
  - [ToEqual](#ToEqual)
- `Expected Result` - The type schema we expect

```TS
import { Expect, TypeOf, ToBe, ToNotBe, ToEqual } from 'tsprism'

type TEST = Expect<TypeOf<Input, Comparison, Expected>>
```
We can simplify this required type assignment (type TEST) by nesting multiple tests into a single test object type like so: 

```TS
type TEST = {
  🟢 toBe: Expect<TypeOf<true, ToBe, boolean>>
  🔴 toNotBe: Expect<TypeOf<true, ToNotBe, boolean>>
  🔴 ToEqualFail: Expect<TypeOf<true, ToEqual, boolean>>
  🟢 ToEqual: Expect<TypeOf<true, ToEqual, true>>
}
```
> This helps prevents pollution of the namepsace by test case types. 

### TS
This type is a semantic alias for `TypeOf`. They can be used interchangeably. It's purpose is to improve readability when the `typeof` keyword needs to be used before a runtime value in the test case. 

For example:

```TS
import { Expect, TypeOf, TS, ToBe } from 'tsprism'

const myObj = { ts: 'test', prism: 'utilities' }
type Obj = typeof myObj

type TEST = {
  🟢 typeOf: Expect<TypeOf<Obj, ToBe, { ts: string, prism: string }>>
  🟢 ts: Expect<TS<typeof myObj, ToBe, { ts: string, prism: string }>> 
}
```
## Comparison operators

### ToBe
A comparison operator for primitive types (==).
```TS
import { Expect, TypeOf, ToBe } from 'tsprism'

const myObj = { ts: 'test', prism: 'utilities' }
type Obj = keyof typeof myObj

type TEST = {
  🟢 pass: Expect<TypeOf<Obj, ToBe, 'ts' | 'prism'>>
  🔴 fail: Expect<TypeOf<Obj>, ToBe, typeof myObj>
//                ˄˄ 🚁 Type 'false' does not satisfy the constraint 'true'.ts(2344)
}
```

### ToNotBe
The inverse comparison operator for ***ToBe*** (!=).
```TS
import { Expect, TypeOf, ToNotBe } from 'tsprism'

const myObj = { ts: 'test', prism: 'utilities' }
type Obj = keyof typeof myObj

type TEST = {
  🟢 pass: Expect<TypeOf<Obj, ToNotBe, typeof myObj>>
  🔴 fail: Expect<TypeOf<Obj, ToNotBe, 'ts' | 'prism'>>
//                ˄˄ 🚁 Type 'false' does not satisfy the constraint 'true'.ts(2344)
}
```

### ToEqual
Strict comparison operator for complex types (===).
```TS
import { Expect, TypeOf, ToBe, ToEqual } from 'tsprism'

const myObj = { ts: 'test', prism: 'utilities' } as const
type Obj = typeof myObj

type TEST = {
  🟢 pass:Expect<TypeOf<Obj, ToEqual, Readonly<{ ts: 'test', prism: 'utilities' }>>>
  🔴 fail: Expect<TypeOf<Obj, ToEqual, Readonly<{ ts: string, prism: string }>>>
//                ˄˄ 🚁 Type 'false' does not satisfy the constraint 'true'.ts(2344)
  🔴 fail2: Expect<TypeOf<Obj, ToEqual, { ts: 'test', prism: 'utilities' }>>
//                 ˄˄ 🚁 Type 'false' does not satisfy the constraint 'true'.ts(2344)
}
```
> Both failing test cases would pass with the ***ToBe*** comparison operator.

## Enjoy 🧪🚀