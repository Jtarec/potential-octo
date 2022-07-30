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

export function throttleAtLast(fn, delay = 300) {
  let timer: NodeJS.Timeout | null = null
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