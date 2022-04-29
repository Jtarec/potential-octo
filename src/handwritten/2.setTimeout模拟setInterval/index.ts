export function mySetInterval(cb, wait) {
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

export function mySetTimeout(cb, wait) {
  let timer = setInterval(() => {
    clearInterval(timer)
    cb()
  }, wait)
}