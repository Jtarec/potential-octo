## bind, call, apply 手写
### bind, call, apply 语法和区别

**apply：fn.apply(thisObj, 数组参数）**
定义：应用某一个对象的一个方法，用另一个对象替换当前对象
说明：如果参数不是数组类型的，则会报一个TypeError错误。

**call：fn.call(thisObj, arg1, arg2, argN)**
apply与call的唯一区别就是接收参数的格式不同。

**bind：fn.bind(thisObj, arg1, arg2, argN)**
bind()方法创建一个新的函数，在bind()被调用时，这个新函数的this被bind的第一个参数指定，其余的参数将作为新函数的参数供调用时使用。

**区别**
call、bind 和 apply 的第一个参数都是要改变上下文的对象
call、bind 从第二个参数开始以参数列表的形式展现，apply 第二个参数是数组参数；
call、apply改变了函数的this上下文后便**立刻执行**该函数，bind 则是返回改变了上下文后的一个函数；
### 手写
apply
```javascript
Function.prototype.myApply= function(context, args = []){
  // 1. 限制参数类型为数组
  if(!Array.isArray(args)) throw new Error('apply的第二个参数必须是数组') 
  if (!context || context === null) context = window;
  
  // 创造唯一的key值  作为我们构造的context内部方法名
  const fn = Symbol();
  // 2.将函数挂载到传入的对象
  context[fn] = this;
  
  // 3.执行对象的方法
  return context[fn](...args);
}

// Test:
var obj = {
  name: "obj",
  sayName: function(params){
    return this.name + params
  }
}

var sayNameApply = obj.sayName;

console.log(sayNameApply.myApply(obj, ["test"]) === "objtest") // true
```

call，与apply的唯一区别就是参数格式不同
```javascript
Function.prototype.myCall= function(context, ...args){
  if (!context || context === null) context = window;
  
  // 创造唯一的key值  作为我们构造的context内部方法名
  const fn = Symbol();
  // 2.将函数挂载到传入的对象
  context[fn] = this;
  
  // 3.执行对象的方法
  return context[fn](args);
}

// Test:
var obj = {
  name: "obj",
  sayName: function(params){
    return this.name + params
  }
}

var sayNameCall = obj.sayName;

console.log(sayNameCall.myCall(obj, "test") === "objtest") // true
```

bind
```javascript
Function.prototype.myBind = function (context, ...args) {
  if (!context || context === null) {
    context = window;
  }
  const fn = Symbol();
  context[fn] = this;
  
  let _this = this;
  const result = function (...innerArgs) {
    if (this instanceof _this === true) {
      // 此时this指向指向result的实例  这时候不需要改变this指向
      this[fn] = _this;
      return this[fn](...[...args, ...innerArgs]);
    } else {
      // 如果只是作为普通函数调用  那就很简单了 直接改变this指向为传入的context
      return context[fn](...[...args, ...innerArgs]);
    }
  };
  // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
  // 实现继承的方式: 使用Object.create
  result.prototype = Object.create(this.prototype);
  return result;
};

// Test:
var obj = {
  name: "obj",
  sayName: function(params){
    return this.name + params
  }
}
var sayNameBind = obj.sayName;
console.log(sayNameBind.myBind(obj, "test")() === "objtest") // true

```
