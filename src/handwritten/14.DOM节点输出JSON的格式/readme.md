## DOM2JSON

题目描述: 请实现 DOM2JSON 一个函数，可以把一个 DOM 节点输出 JSON 的格式

```html
<div>
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div>
```

把上述 DOM 结构转成下面的 JSON 格式

```json
{
  tag: 'DIV',
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] }
      ]
    }
  ]
}
```