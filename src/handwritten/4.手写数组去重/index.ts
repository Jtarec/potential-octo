export function myUniqBySet(arr) {
  return [...new Set(arr)]
}

// 默认不要求掌握，如果需要的话 可以到 index.spec.ts 删除 .skip
export function myUniq(arr) {
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
