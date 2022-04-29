## 使用setTimeout模拟setInterval

题目描述: setInterval 用来实现循环定时调用 可能会存在一定的问题 能用 setTimeout 解决吗

```ts
function mySetInterval(cb, wait) {
  let timer, flag = true
  function interval() {
    cb()
    clearTimeout(timer)
    if (flag)
      timer = setTimeout(interval, wait)
  }
  interval()
  return {
    cancel: () => {
      flag = false
      clearTimeout(timer)
    }
  }
}
// 测试用例  jest的不好使
let count = 0
let timer = mySetInterval(() => {
    console.log(count++)
    if (count === 10) timer.cancel()
}, 1000)
```


## 使用 setInterval 模拟setTimeout

```ts
function mySetTimeout(cb, wait) {
  let timer = setInterval(() => {
    clearInterval(timer)
    cb()
  }, wait)
}

mySetTimeout(() => console.log('123123123'), 1000)
```