## 实现 LazyMan

### 题目详解

题目要求：
```
实现一个LazyMan，可以按照以下方式调用:
LazyMan("Hank")输出:
Hi! This is Hank!

LazyMan("Hank").sleep(10).eat("dinner”)输出
Hi! This is Hank!
// 等待10秒..
Wake up after 10
Eat dinner~

LazyMan("Hank").eat("dinner”).eat("supper”)输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan("Hank").eat("supper”).sleepFirst(5)输出
// 等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
```

代码实现：
```ts
class _LazyMan {
  constructor(name) {
    this.tasks = []
    const task = () => {
      console.log(`Hi my name is ${name}`)
      this.next()
    }
    this.tasks.push(task)
    setTimeout(() => {
      this.next()
    }, 0)
  }
  next() {
    const task = this.tasks.shift()
    task && task()
  }
  sleep(time) {
    this._sleepWrapper(time, false)
    return this
  }
  sleepFirst(time) {
    this._sleepWrapper(time, true)
    return this
  }
  _sleepWrapper(time, first) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`)
        this.next()
      }, time * 1000)
    }
    if (first) {
      this.tasks.unshift(task)
    } else {
      this.tasks.push(task)
    }
  }
  eat(name) {
    const task = () => {
      console.log(`Eat ${name}`)
      this.next()
    }
    this.tasks.push(task)
    return this
  }
}
function LazyMan(name) { return new _LazyMan(name) }
```