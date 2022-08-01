## ArrayLike

题目描述: 类数组拥有 length 属性，可以使用下标来访问元素，但是不能使用数组的方法。如何把类数组转化为数组？

### 代码实现

```js
// 借助扩展运算符，实际上调用的是遍历器接口
export function arrayLikeWithSpread(arrayLike) {
  return [...arrayLike]
}

// Array.from()是ES6中新增的方法
// 可以将两类对象转为真正的数组：类数组对象和可遍历（iterable）对象
export function arrayLikeWithFrom(arrayLike) {
  return Array.from(arrayLike)
}

// 借助数组原型中的slice方法，返回一个数组
export function arrayLikeWithPrototype(arrayLike) {
  return Array.prototype.slice.call(arrayLike)
}

// 借助数组原型中，够造返回一个数组
export function arrayLikeWithApply(arrayLike) {
  return Array.apply(null, arrayLike)
}

// 同slice
export function arrayLikeWithConcat(arrayLike) {
  return Array.prototype.concat.apply([], arrayLike)
}
```