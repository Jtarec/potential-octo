## 手写类型判断

类型判断即需要判断传入的值是以下哪种类型

number、string、boolean、function、object、bigint、symbol、null、undefined

我们可以利用 Object.prototype.toString.call 来处理

```ts
function myTypeof(val) {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
}
```

`slice(8, -1)` 其实就是根据 `[object target]` 剪切掉 `[object ]` 来得到和这个目标的类型

`toLowerCase()` 的作用其实是为了使得返回出来的类型统一小写，方便后续使用全等判断更精确，少了一些心智负担

### 拓展

typeof 判断 null 的时候会返回 'object'

这是因为:

在js第一个版本中所有值都存储在32位的单元中，每个单元包含一个小的 `类型标签(1-3 bits)` 以及当前要存储值的真实数据。类型标签存储在每个单元的低位中，共有`五种`数据类型:
- 000: object  - 当前存储的数据指向一个对象
- 001: int     - 当前存储的数据是一个31位的有符号整数
- 010: double  - 当前存储的数据指向一个双精度的浮点数
- 100: string  - 当前存储的数据指向一个字符串
- 110: boolean - 当前存储的数据是布尔值

有两种特殊数据类型：
- undefined 的值是(-2)30 （一个超出整数范围的数字）
- null 的值是机器码 NULL 指针 `(null 指针的值全是0)`

也就是说 `null 的类型标签是000 和 object 的类型标签一致，所以被判定为 object`


---


instanceof 只能用于判断引用类型 左侧只要是原始数据类型 直接返回 false

