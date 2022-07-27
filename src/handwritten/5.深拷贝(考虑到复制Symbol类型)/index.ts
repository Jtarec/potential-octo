export function deepClone(obj) {
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