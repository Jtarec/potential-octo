## compose函数实现

### 题目详解

compose 函数也叫做 `组合函数`

顾名思义就是把我们的函数当成乐高一样拼接组合，比如我们现在有这么两个函数
- rawHandle 原料加工函数，传入原料 raw 得到加工后的 食品 food
- foodPack 食物包装函数，传入失误 food 得到包装后的产品 prod

那这种单一参数的函数我们其实就可以这么去调用：
```js
const prod = foodPack(rawHandle(raw))
```

ok，那这样的话就可以得到我们的 prod 了

但是这样的实现不够优雅太过麻烦了，于是我们 遇事不决包一层

```js
function prodGen(raw) {
  return foodPack(rawHandle(raw))
}
const prod = prodGen(raw)
```

我们封装多了一层函数，将这两个单一参数的函数 `组合` 起来了，我们不再关心他中间做了什么，我们只看到给进去一个 原料 它就直接给我们一个包装好的产品了，就很棒！

那我们现在希望有一个函数，我们只需要传入多个函数作为它的参数，它就自动帮我们组合起来

类似这么来使用的，我们要怎么做呢？

```ts
const prodGen = compose(foodPack, rawHandle)
const prod = prodGen(raw)
```

代码实现如下：
```ts
// 调用 compose 的时候一定是传入多个函数
function compose(...fns) {
  // 没有传任何参数函数，直接返回一个 给什么返回什么的 函数
  if (!fns.length) return v => v
  // 如果 参数函数的数量只有一个 那就返回这个函数
  if (fns.length === 1) return fns[0]
  // 利用 reduce 实现层层套用
  return fns.reduce((a, b) => (...args) => a(b(...args)))
}
```

具体的，我们的 compose 已经实现了三个特点：
1. 第一个函数是多元的，可以接收多个参数；后面的函数都是单元的，接收一个参数
2. 执行顺序应该是`从右向左`的
3. 所有的函数的执行是`同步`的

### 拓展

- compose函数 其实就是 `redux` 中间件的实现原理

