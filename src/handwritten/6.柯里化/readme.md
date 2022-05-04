## 柯里化

### 题目详解

柯里化（Currying），又称部分求值（Partial Evaluation）

概念：把接受多个参数的函数转变为接受一个单一参数的函数，并且返回接受余下的参数且返回结果的新函数的技术

核心思想：把多参数传入的函数拆成单参数(或部分)函数，内部再返回调用下一个单参数(或部分)函数，依次处理剩余的参数

举个例子，我们现在有一个函数：
```ts
const add = (a, b, c) => a + b + c
```

柯里化的作用就是把这个需要多个参数的函数，拆分开，也就是说我可以多次传参数

实现如下：
```ts
function currying(fn, ...args) {
  // 获取到传入函数需要的参数个数
  const len = fn.length
  // 收集参数
  let allArgs = [...args]
  const res = (...newArgs) => {
    // 参数收集到 allArgs 中
    allArgs = [...allArgs, ...newArgs]
    // 当收集到的参数大于等于 传入函数 所需参数的个数时候执行这个函数
    if (allArgs.length >= len) return fn(...allArgs)
    // 否则继续返回这个 res 函数
    else return res
  }
  return res
}
```

### 拓展

敬请补充...