## 实现有并发限制的 Promise 调度器 Scheduler

### 题目详解

需要有一个带并发限制的异步调度器 Scheduler，可以设置同时运行的任务上限数

比如，现在有一个保证同时最多只能运行两个任务的调度器
```
addTask(1000,"1");
addTask(500,"2");
addTask(300,"3");
addTask(400,"4");
的输出顺序是：2 3 1 4
整个的完整执行流程：

一开始1、2两个任务开始执行
500ms时，2任务执行完毕，输出2，任务3开始执行
800ms时，3任务执行完毕，输出3，任务4开始执行
1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
1200ms时，4任务执行完毕，输出4
```

代码实现如下
```ts
class Scheduler {
  // 默认限制并发数为 2 
  constructor(limit = 2) {
    this.maxCount = limit
    this.queue = []
    this.runCount = 0
  }
  add(time, order) {
    const promiseCreator = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(order)
          resolve(order)
        }, time)
      })
    }
    this.queue.push(promiseCreator)
  }
  taskStart() {
    for (let i = 0; i < this.maxCount; ++i) {
      this.request()
    }
  }
  request() {
    if (!this.queue || !this.queue.length > 0 || this.runCount >= this.maxCount) return
    this.runCount++
    this.queue.shift()().then(() => {
      this.runCount--
      this.request()
    })
  }
}
const scheduler = new Scheduler(2)
const addTask = (time, order) => {
  scheduler.add(time, order)
};
addTask(1000, "1")
addTask(500, "2")
addTask(300, "3")
addTask(400, "4")
scheduler.taskStart()
```

### 拓展