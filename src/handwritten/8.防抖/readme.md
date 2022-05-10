## 手写防抖

题目描述: 手写防抖函数。

防抖函数 debounce 指的是某个函数在某段时间内，无论触发了多少次回调，都只执行最后一次。

防抖的处理可以通过setTimeout来指定一定时间后执行处理函数，如果在这之前事件再次触发，则清空计时器，重新计时。

```ts
export function debounce(fn, delay = 300) {
  let timer;
  return function () {
    const args = arguments;
    if (timer) {
      // 清空计时器，重新计时
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // 改变this指向为调用debounce所指的对象
      fn.apply(this, args);
    }, delay);
  };
}
```

## 使用

```ts
window.addEventListener(
  "scroll",
  debounce(() => {
    console.log(111);
  }, 1000)
);
```
