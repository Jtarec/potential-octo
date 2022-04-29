const problems = [
    {
        "filename": "compose函数",
        "funcname": "compose"
    },
    {
        "filename": "setTimeout模拟setInterval",
        "funcname": "mySetInterval"
    },
    {
        "filename": "手写类型判断",
        "funcname": "myTypeof"
    },
    {
        "filename": "手写数组去重",
        "funcname": "myUniq"
    },
    {
        "filename": "深拷贝(考虑到复制Symbol类型)",
        "funcname": "deepClone"
    },
    {
        "filename": "柯里化",
        "funcname": "currying"
    },
    {
        "filename": "实现LazyMan",
        "funcname": "lazyMan"
    },
    {
        "filename": "防抖",
        "funcname": "debounce"
    },
    {
        "filename": "节流",
        "funcname": "throttle"
    },
    {
        "filename": "写版本号排序的方法",
        "funcname": "versionSort"
    },
    {
        "filename": "LRU算法",
        "funcname": "LRUCache"
    },
    {
        "filename": "Promise以及相关方法的实现",
        "funcname": "myPromise"
    },
    {
        "filename": "实现一个add方法",
        "funcname": "add"
    },
    {
        "filename": "DOM节点输出JSON的格式",
        "funcname": "DOM2JSON"
    },
    {
        "filename": "类数组转化为数组的方法",
        "funcname": "arrayLike"
    },
    {
        "filename": "ObjectIs实现",
        "funcname": "ObjectIs"
    },
    {
        "filename": "AJAX",
        "funcname": "AJAX"
    },
    {
        "filename": "分片思想解决大数据量渲染问题",
        "funcname": "slicing"
    },
    {
        "filename": "将虚拟Dom转化为真实Dom",
        "funcname": "renderVnode"
    },
    {
        "filename": "实现模板字符串解析功能",
        "funcname": "parseTemplate"
    },
    {
        "filename": "实现一个对象的flatten方法",
        "funcname": "flatten"
    },
    {
        "filename": "列表转成树形结构",
        "funcname": "list2Tree"
    },
    {
        "filename": "树形结构转成列表",
        "funcname": "tree2List"
    },
    {
        "filename": "大数相加",
        "funcname": "bigintAdd"
    },
    {
        "filename": "ObjectCreate实现",
        "funcname": "ObjectCreate"
    },
    {
        "filename": "数组扁平化",
        "funcname": "flatter"
    },
    {
        "filename": "寄生组合继承",
        "funcname": "parasiticInheritance"
    },
    {
        "filename": "实现有并行限制的Promise调度器",
        "funcname": "promiseScheduler"
    },
    {
        "filename": "new操作符",
        "funcname": "myNew"
    },
    {
        "filename": "call apply bind",
        "funcname": "myCall"
    }
]

const update = require('./scripts/generate/file')
for (let index = 0; index < problems.length; index++) {
    const element = problems[index];
    (async () => {
        await update({ dirPath: "handwritten", id: index + 1, fileName: element.filename, funcName: element.funcname })
    })()
}