## 手写数组去重

### 题目详解

数组去重是比较常考的题目，说到数组去重我们可能第一时间想到用 `Set` 来做去重，简单好记又方便

没错， `Set` 来做数组去重能够做到大部分数据类型的去重，严格来说 `Set` 已经是完美去重了

比如:
```ts
const obja = {}, objb = { b: 1 }
const s = Symbol(), t = Symbol()
const fn = function() {}, fn1 = function() {}
const arr = [null, null, NaN, NaN, 666, 666, '123', '123', true, true, obja, obja, objb, objb, undefined, undefined, s, s, t, fn, fn, fn1, (function () {}), (function () {}), (function () {console.log(1)})]

myUniqBySet(arr) // [null, NaN, 666, '123', true, {…}, {…}, undefined, Symbol(), Symbol(), ƒ, ƒ, ƒ, ƒ, ƒ]
```
Set 的去重是根据内存地址去重的，我们可以看到同样的 obja、objb、fn、Symbol s、都被成功去重了

所以我们认为 Set 是一个完美去重的，代码也是非常的好记：
```ts
function myUniqBySet(arr) {
  return [...new Set(arr)]
}
```

### 拓展

- 特殊去重

可是往往这个面试官可能会给你出一些难题，比如这个对象直接在数组内使用，尽管长得一样但是他们实际上是在不同的内存地址，但是呢他就是非要你去重，这个时候我们怎么处理呢？

先看一下我们的目标测试用例：
```ts
const s = Symbol(), t = Symbol()
const fn = function() {}, fn1 = function() {}
const arr = [null, null, NaN, NaN, 666, 666, '123', '123', true, true, {}, {}, { a: 1 }, { a: 1 }, undefined, undefined, s, s, t, fn, fn, fn1, (function () {}), (function () {}), (function () {console.log(1)})]

myUniq(arr) // [null, NaN, 666, '123', true, {…}, {…}, undefined, Symbol(), Symbol(), ƒ, ƒ, ƒ, ƒ, ƒ]
```

代码实现如下：
```ts
function myUniq(arr) {
  // 定义一个映射对象，只要有的值就可以作为这个对象的key 用来判断是否重复
  const map = {}
  return arr.filter(item => {
    let key
    if (typeof item === 'symbol') {
      key = item
    } else if (typeof item === 'function') {
      // 匿名函数处理
      if (!item.name) return true
      key = typeof item + JSON.stringify(item.name)
    } else {
      // 这个 key 的实现其实比较巧妙就是利用 本身的类型判断加上它对应的 json 来做拼接
      key = typeof item + JSON.stringify(item) 
    }
    // 只要 map 有这个key了那么说明是重复的了，直接返回 false ，否则就是给这个key存起来
    return map.hasOwnProperty(key) ? false : (map[key] = true)
  })
}
```

---

- 其它去重及对应缺点：

1. indexOf 去重
```ts
// 没办法处理 NaN
function myUniqByIndexOf(arr) {
  const res = []
  arr.forEach(item => {
    if (res.indexOf(item) === -1) res.push(item)
  })
  return res
}
// or
// NaN 会直接被干掉
function myUniqByIndexOf(arr) {
  return arr.filter((item, i) => arr.indexOf(item) === i)
}
```

还有什么去重 等你来补充...