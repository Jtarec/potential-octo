## JS 继承 ———— 寄生组合式继承

### 题目详解

`寄生组合式继承` 也叫做 `完美继承`

代码实现如下：
```ts
function clone(parent, child) {
  // 用 Object.create 可以减少组合继承中多进行一次构造的过程
  child.prototype = Object.create(parent.prototype)
  child.prototype.constructor = child // 将父类的构造函数的原型的 constructor 指向子类，因为实例后对象是子类的
}
function Parent(name) {
  this.name = name
}
Parent.prototype.getName = function() {
  console.log(`my name is ${this.name}`)
}
function Child(name, age) {
  // 构造函数继承用法
  Parent.call(this, name)
  this.age = age
}
clone(Parent, Child)
const c1 = new Child('Btrya', 20)
c1.getName() // my name is Btrya
```

寄生组合式继承的优点就是：
1. 可以向父类构造函数传参
2. 存在私有变量
3. 父类构造函数只调用了一次，不会出现冗余的属性或方法
4. 可以共享原型上的方法或属性
5. 可以继承多个父类

### 拓展

寄生组合式继承是怎么发展而来的呢？

实际上在寄生组合式继承之前还有 5 种继承，我们来一一讲解他们的特点以及缺点吧

#### 1. 原型链继承

最早的继承方式，原理就是利用原型链来实现继承，代码实现如下：
```ts
function Parent() {}
Parent.prototype.userInfo = { name: 'Btrya' }
Parent.prototype.getName = function() {
  console.log(`my Name is ${this.userInfo.name}`)
}
Parent.prototype.setName = function(name) {
  this.userInfo.name = name
}

function Child() {}
// 将 Parent 的实例赋值给 Child 的原型
Child.prototype = new Parent() // Child.prototype.__proto__ === Parent.prototype
const c1 = new Child()
const c2 = new Child()
c1.getName() // my Name is Btrya
c1.setName('xiao ming') 
c2.getName() // my Name is xiao ming  注意这里 c2 的 name 他也跟着变了而不是原来的 Btrya
```

特点：
- 原型链上的方法和父类自身属性或方法都能够被所有的子类继承

缺点：
- 所有子类共享原型上的方法，当改变的属性或者方法是一个引用类型的时候，所有子类实例的属性或方法都会被改变。因为子类实例上存储的是栈内指向堆的地址，更改的是堆的数据，所以所有的子类实例都被修改到了
- 不能向构造函数传参
- 继承单一，一个子类只能继承一个父类


#### 2. 构造函数继承

为了解决 `原型链继承` 的痛点(不能向构造函数传参、继承单一)，有了构造函数继承

代码实现：
```ts
function Parent1(name, colors) {
  this.name = name
  this.color = [...colors]
  this.getName = function() {
    console.log(`my Name is ${this.name}`)
  }
}
function Parent2(age) {
  this.age = age
}
function Child(name, age, colors) {
  Parent1.call(this, name, colors)
  Parent2.call(this, age)
}
Child.prototype.addColor = function(color) {
  this.color.push(color)
}
const c1 = new Child('Btrya', 20, ['blue'])
const c2 = new Child('Asaki', 18, ['pink'])
c1.addColor('black')
console.log(c1) // { name: 'Btrya', color: ['blue', 'black'], age: 20, getName: f }
console.log(c2) // { name: 'Asaki', color: ['pink'], age: 18, getName: f }
c1.getName() // my Name is Btrya
c2.getName() // my Name is Asaki
```

特点：
- 通过 `call` 或 `apply` 方法将父类的属性或方法拷贝到自身，实现私有化
- 可以对父类构造函数传参
- 可以继承多个父类构造函数

缺点：
- 每次创建子类实例的时候，如果父类有函数，比如上边代码的 `getName`，假设新建了 1000 个子类实例，那么你每个子类实例里都有一个 `getName` 方法，它完全可以放到原型上去，也就是说`方法在构造函数中定义，无法复用`
- 只能继承父类中的属性或者方法，不能继承父类原型链上的方法

#### 3.组合继承

为了解决 `构造函数继承` 的痛点(方法无法复用、原型链上方法无法继承)，有了组合继承

代码实现：
```ts
function Parent(name, ...colors) {
  this.name = name
  this.color = [...colors]
}
function Child(name, colors) {
  // 组合继承用法
  Parent.call(this, name, colors)
}
Parent.prototype.addColor = function(color) {
  this.color.push(color)
}
// 原型链继承用法
Child.prototype = new Parent()
const c1 = new Child('Btrya', ['blue'])
const c2 = new Child('Asaki', ['pink'])
c1.addColor('black')
console.log(c1) // { name: 'Btrya', color: ['blue', 'black'] }
console.log(c2) // { name: 'Asaki', color: ['pink'] }
```

特点：
- 可以向构造函数传参
- 每个新实例所存储的属性或方法都是私有的
- 可以共享一些公共方法

缺点：
- 调用了两次父类构造函数：第一次是执行 `Child.prototype = new Parent()`，这时候原型上有了 name、color 属性；第二次是在执行 `Parent.call(this, name, colors)` 的时候，给 `Child` 构造函数内部定义了 name、color 属性，屏蔽原型上的方法。这样`原型上的部分属性和方法就是冗余的`。

![组合继承冗余部分展示](https://cdn.jsdelivr.net/gh/Btrya/image-hostiting@master/20220504/组合继承展示.5ul92xrsv2g0.webp)

#### 4.原型式继承

`组合继承` 太难记了，太复杂了，我不想关心你怎么实现的继承，然后有了原型式继承

代码实现：
```ts
// 其实就是 Object.create 这里写出来也是为了让大家更好的看清楚里边干了什么
function ObjectCreate(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}
const Person = {
  name: 'Btrya',
  color: ['blue']
}
const p1 = ObjectCreate(Person) // 创建一个实例出来 p1.__proto__ === Person
p1.color.push('black') // 给 p1 这个实例的 color 数组增加一个 black
console.log(Person) // { name: "Btrya", color: ["blue", "black"] }  注意这里 log 了Person发现它的数组也跟着改变了
```

特点：
- 工厂模式，不关心你的具体创建过程，只需要知道结果。拓展性比较高，想创建不同的实例对象的时候，就传入不同的原型就可以了

缺点：
- 和原型链继承一样，所有的实例都会共享原型，如果是引用类型的话，当一个实例修改了这个原型上的引用类型，其余的实例的相应属性都会跟着变化


#### 5.寄生式继承

增强原型式继承

代码实现：
```ts
// 其实就是 Object.create 这里写出来也是为了让大家更好的看清楚里边干了什么
function ObjectCreate(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}
// 包一层
function createChild(prototype) {
  const instance = ObjectCreate(prototype)
  instance.getName = function() {
    console.log(`my name is ${instance.name}`)
  }
  return instance
}
const Person = { 
  name: "Btrya", 
  color: ['blue']
}
const c1 = createChild(Person)
const c2 = createChild(Person)
c1.name // 'Btrya'
c1.name = 'Asaki'
c1.getName // my name is Asaki
c2.getName // my name is Btrya
c1.color.push('black')
c2.color // ['blue', 'black']
```

特点：
- 可以在 createChild 这个包装函数中增加一些方法或者属性

#### 6. 寄生组合式继承

那最后就是寄生组合式继承啦，集所有继承的优点与一身，规避了所有的缺点，详细实现回到最开始的题解详情吧

#### 7. es6 利用 extends 实现的继承

代码实现：
```ts
class Parent {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}
class Child extends Parent {
  constructor(name, age, color) {
 	  super(name, age)
    this.color = color
  }
}
```

ES6的 `class` 以及 `extends` 其实是寄生组合式继承的的语法糖

子类在构造函数中，必须调用super()方法，这个super指的是父类的构造函数。从而先获取父类实例。对应的ES5的代码是`_createSuper`。与ES5组合继承一样，父类需要将this指向子类的实例。我们都知道在`ES5`中我们用的是:

`parent.call(this, ...arguments)`。

在上面那个代码块中，parent就指的是父类的构造函数。

那么在`ES6`中，父类的构造函数指的是`class`中的`constructor`。他在子类的`class`中的构造函数中，用`super`表示，这也就是说为什么需要在子类构造函数中，需要首先调用`super`获取一个上下文this，然后在在这个this上面添加子类的属性或方法。对应的转义后的代码块是：

```js
"use strict";

function _inherits(subClass, superClass) {  // 将父类的原型赋值给子类原型，并改写constructor
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function");
	}
	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: {
			value: subClass,
			writable: true,
			configurable: true
		}
	});
	if (superClass) _setPrototypeOf(subClass, superClass); // 设置原型链
}

function _setPrototypeOf(o, p) { // 设置
	_setPrototypeOf = Object.setPrototypeOf ||
	function _setPrototypeOf(o, p) {
		o.__proto__ = p;
		return o;
	};
	return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
	var hasNativeReflectConstruct = _isNativeReflectConstruct();
	return function _createSuperInternal() {
		var Super = _getPrototypeOf(Derived),
		result;
		if (hasNativeReflectConstruct) {
			var NewTarget = _getPrototypeOf(this).constructor;
			result = Reflect.construct(Super, arguments, NewTarget);
		} else {
			result = Super.apply(this, arguments);
		}
		return _possibleConstructorReturn(this, result);
	};
}

function _possibleConstructorReturn(self, call) {
	if (call && (typeof call === "object" || typeof call === "function")) {
		return call;
	}
	return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
	if (self === void 0) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}
	return self;
}

function _isNativeReflectConstruct() {
	if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	if (Reflect.construct.sham) return false;
	if (typeof Proxy === "function") return true;
	try {
		Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [],
		function() {}));
		return true;
	} catch(e) {
		return false;
	}
}

function _getPrototypeOf(o) {
	_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf: function _getPrototypeOf(o) {
		return o.__proto__ || Object.getPrototypeOf(o);
	};
	return _getPrototypeOf(o);
}

function _classCallCheck(instance, Constructor) {
	if (! (instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var Parent = function Parent(name, age) {
	_classCallCheck(this, Parent);

	this.name = name;
	this.age = age;
};

var Child =
/*#__PURE__*/
function(_parent) {
	_inherits(Child, _parent); // 这一行是将父类的原型赋值给子类，并且绑定原型链

	var _super = _createSuper(Child); // 返回的是一个函数。这个函数里会实例化一个父类出来。

	function Child(name, age) {
		var _this;

		_classCallCheck(this, Child);

		_this = _super.call(this, name, age); // 将父类的this指向子类。
		_this.color = color;
		return _this;
	}

	return Child;
} (Parent);
```