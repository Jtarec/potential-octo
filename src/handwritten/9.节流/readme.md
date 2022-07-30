## 手写节流

题目描述: 手写节流函数。

节流函数 throttle 指的是某个函数在n秒内只执行一次函数。

对于节流有时间戳和定时器两种版本，分为[时间段内开始的时候执行]还是[时间段内结束的时候执行]两种场景。

时间戳版本：

```ts
export function throttle(fn, delay = 300) {
  let prev = 0;
  return function () {
    let now = Date.now()
    const args = arguments;
    if (now - prev > delay) {
      fn.apply(this, args)
      prev = now
    }
  };
}
```

定时器版本：
```ts
function throttle(fn, delay = 300) {
  let timer = null
  return function () {
    const args = arguments
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, args)
      }, delay)
    }
  }
}
```

## 使用

```ts
window.addEventListener(
  "scroll",
  throttle(() => {
    console.log(111);
  }, 1000)
);
```
