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