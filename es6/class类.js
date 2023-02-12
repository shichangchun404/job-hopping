class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayName() {
    console.log(this.name);
  }

  static fun() {
    console.log("我是静态方法fun，直接用Person.fun()调用");
  }
}

let p = new Person("shicc", 26);
p.sayName();
Person.fun();

/**
 * class没有静态变量 但是可以将类视为对象给其添加 如Person.city="aq"
 *
 * 通过静态方法 实现一个单例模式
 */

class Cache {
  constructor(n, m) {
    this.n = 100;
  }
  static getInstance() {
    if (!this.cache) {
      this.cache = new Cache();
    }
    return this.cache;
  }
}

let c1 = Cache.getInstance();
console.log(c1);
c1.n = 101;
let c2 = Cache.getInstance();
console.log(c2.n); //101
