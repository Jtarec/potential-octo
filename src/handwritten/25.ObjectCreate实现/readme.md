## Object.create实现

### 作用

Object.create() 方法可以创建一个新的对象，使用现有的对象来提供新创建对象的__proto__

### 实现
```ts
function ObjectCreate(obj) {
  // 创建一个构造函数 F
  const F = function() {}
  // 将他的 prototype 指向 传入对象
  F.prototype = obj
  // 创建这个对象的实例
  return new F()
}
```

### 扩展
- 怎样创建一个干净的空对象？
```ts
// 创建一个原型为 null 的空对象
const cleanObj = Object.create(null)
```