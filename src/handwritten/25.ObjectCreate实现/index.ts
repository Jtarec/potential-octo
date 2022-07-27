export function ObjectCreate(obj) {
  // 创建一个构造函数 F
  const F = function () { }
  // 将他的 prototype 指向 传入对象
  F.prototype = obj
  // 创建这个对象的实例
  return new F()
}