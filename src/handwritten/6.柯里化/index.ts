export function currying(fn, ...args) {
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