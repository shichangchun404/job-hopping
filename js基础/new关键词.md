# 做了什么？

1、创建了一个空的 js 对象（即{}）作为实例对象

2、将空对象的原型**proto**指向构造函数的原型 prototype

3、执行构造函数，并将空对象作为构造函数的上下文（改变 this 指向），设置实例对象的属性与方法。

4、返回一个对象，对构造函数有返回值的判断，如果函数本身返回一个对象则返回该对象，创建的实例对象无效。否则返回创建的实例对象

# 怎么实现

```bash
  /*
    如 const c = new Func(), 通过create函数展示其内部实现
    create函数要接受不定量的参数，第一个参数是构造函数（也就是new操作符的目标函数），其余参数被构造函数使用。
    new Create() 是一种js语法糖。我们可以用函数调用的方式模拟实现
  */
  function create(Func,...args){
      //1、创建一个空的对象
      let obj = {}; // let obj = Object.create({});
      //2、将空对象的__proto__指向构造函数的原型
      Object.setPrototypeOf(obj, Func.prototype); // obj.__proto__ = Func.prototype
      //3、z执行构造函数器函数，并改变构造函数的上下文（this指向）,将剩余的参数传入
      //4、在构造函数有返回值的情况进行判断
      return result instanceof Object? result : obj;
  }
```

在 new 的时候，会对构造函数的返回值做一些判断：
1、如果返回值是基础数据类型，则忽略返回值；
2、如果返回值是引用数据类型，则使用 return 的返回，也就是 new 操作符无效；
