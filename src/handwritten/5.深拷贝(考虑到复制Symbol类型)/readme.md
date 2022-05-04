## 深拷贝

### 题目详解

深拷贝主要是要注意当遇到属性值为 `引用类型` 的时候，需要新建一个引用类型并将对应的值复制给它。

因此对象获得的一个新的引用类型而不是一个原有类型的引用。

也就是说，深拷贝中的任何对象/数组的修改，都不能影响到原拷贝对象中的对应对象/数组。

另外的，我们还需要注意对 key 为 Symbol 类型的拷贝。

代码详情：
```ts
function deepClone(obj) {
  // is Object ?
  if (!obj || typeof obj !== "object") return obj
  // 根据当前的 obj 的类型初始化一个 newObj 来做后续的存储
  let newObj = Array.isArray(obj) ? [] : {}
  // Reflect.ownKeys 可以遍历到 Symbol 的key
  Reflect.ownKeys(obj).forEach(key => {
    // 判断当前的属性是否是这个对象自己原有的
    if (obj.hasOwnProperty(key)) {
      // typeof 对于 对象/数组 都是返回的 "object"，也就是说当 这个值 是对象/数组 的时候，继续去深拷贝
      newObj[key] = typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key]
    }
  })
  return newObj
}
```

我们还可以利用 `weakMap` 做记忆化缓存，提高这个 deepClone 的效率：
```ts
function deepClone(obj, hash = new WeakMap()) {
  // is Object ?
  if (!obj || typeof obj !== "object") return obj
  if (hash.has(obj)) return hash.get(obj)
  // 根据当前的 obj 的类型初始化一个 newObj 来做后续的存储
  let newObj = Array.isArray(obj) ? [] : {}
  hash.set(obj, newObj)
  // Reflect.ownKeys 可以遍历到 Symbol 的key
  Reflect.ownKeys(obj).forEach(key => {
    // 判断当前的属性是否是这个对象自己原有的
    if (obj.hasOwnProperty(key)) {
      // typeof 对于 对象/数组 都是返回的 "object"，也就是说当 这个值 是对象/数组 的时候，继续去深拷贝
      newObj[key] = typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key]
    }
  })
  return newObj
}
```

### 拓展

- JSON.parse(JSON.stringify(obj)) 实现深拷贝的缺点？

我们有时候能看见 `JSON.parse(JSON.stringify(obj))` 来做一个深拷贝，它的原理就是利用 `JSON.stringify` 将 js 对象序列化，再使用 `JSON.parse` 来反序列化 js 对象

这个方法能够简单粗暴的实现深拷贝，但假如对象中存在 `函数、undefined、symbol`，使用 JSON.stringify 进行处理之后都会消失