# 何谓 Tapable
Tapable提供了一系列事件的发布订阅 API ，通过Tapable我们可以注册事件，从而在不同时机去触发注册的事件进行执行。Webpack中的Plugin机制正是基于这种机制实现在不同编译阶段调用不同的插件从而影响编译结果。Tapable官方文档提供了这九种钩子：

```
const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook
 } = require("tapable");

```
我们以最简单的SyncHook为例
```
  // 初始化同步钩子
  const hook = new SyncHook(["arg1", "arg2", "arg3"]);

  // 注册事件
  hook.tap('tap1', (arg1,arg2,arg3) => {
      console.log('tap1:',arg1,arg2,arg3)
  })

  hook.tap('tap2', (arg1,arg2,arg3) => {
      console.log('tap2:',arg1,arg2,arg3)
  })

  // 调用事件并传递执行参数
  hook.call('参数1','参数2','参数3')

  // 打印结果
  tap1: 参数1 参数2 参数3
  tap2: 参数1 参数2 参数3

```

## 按照同步/异步分类
在 Tapable 中所有注册的事件可以分为同步、异步两种执行方式，正如名称表述的那样：同步表示注册的事件函数会同步进行执行。 异步表示注册的事件函数会异步进行执行。 
针对同步钩子来 tap 方法是唯一的注册事件的方法，通过 call 方法触发同步钩子的执行。
异步钩子可以通过 tap、tapAsync、tapPromise三种方式来注册，同时可以通过对应的 call、callAsync、promise 三种方式来触发注册的函数。
同时异步钩子可以分为：
  异步串行钩子( AsyncSeries )：可以被串联（连续按照顺序调用）执行的异步钩子函数。 
  异步并行钩子( AsyncParallel )：可以被并联（并发调用）执行的异步钩子函数。


## 按照执行机制分类
Tapable 可以按照异步/同步执行分类的同时也可以按照执行机制进行分类，比如：

Basic Hook : 基本类型的钩子，它仅仅执行钩子注册的事件，并不关心每个被调用的事件函数返回值如何。
Waterfall : 瀑布类型的钩子，瀑布类型的钩子和基本类型的钩子基本类似，唯一不同的是瀑布类型的钩子会在注册的事件执行时将事件函数执行非 undefined 的返回值传递给接下来的事件函数作为参数。
Bail : 保险类型钩子，保险类型钩子在基础类型钩子上增加了一种保险机制，如果任意一个注册函数执行返回非 undefined 的值，那么整个钩子执行过程会立即中断，之后注册事件函数就不会被调用了。
Loop : 循环类型钩子，循环类型钩子稍微比较复杂一点。循环类型钩子通过 call 调用时，如果任意一个注册的事件函数返回值非 undefeind ,那么会立即重头开始重新执行所有的注册事件函数，直到所有被注册的事件函数都返回 undefined。

# 拦截器
Tapable 提供的所有 Hook 都支持注入 Interception ，它和 Axios 中的拦截器的效果非常类似。
我们可以通过拦截器对整个 Tapable 发布/订阅流程进行监听，从而触发对应的逻辑。
```
const hook = new SyncHook(['arg1', 'arg2', 'arg3']);

hook.intercept({
  // 每次调用 hook 实例的 tap() 方法注册回调函数时, 都会调用该方法,
  // 并且接受 tap 作为参数, 还可以对 tap 进行修改;
  register: (tapInfo) => {
    console.log(`${tapInfo.name} is doing its job`);
    return tapInfo; // may return a new tapInfo object
  },
  // 通过hook实例对象上的call方法时候触发拦截器
  call: (arg1, arg2, arg3) => {
    console.log('Starting to calculate routes');
  },
  // 在调用被注册的每一个事件函数之前执行
  tap: (tap) => {
    console.log(tap, 'tap');
  },
  // loop类型钩子中 每个事件函数被调用前触发该拦截器方法
  loop: (...args) => {
    console.log(args, 'loop');
  },
});

```
register: 每次通过 tap、tapAsync、tapPromise 方法注册事件函数时，会触发 register 拦截器。这个拦截器中接受注册的 Tap 作为参数，同时可以对于注册的事件进行修改。 
call: 通过调用 hook 实例对象的 call 方法时执行。（包括 callAsync, promise）接受的参数为调用 Hook 时传入的参数。 
tap: 在每一个被注册的事件函数调用之前执行，接受参数为对应的 Tap 对象。 
loop: loop类型钩子中 每次重新开始 loop 之前会执行该拦截器，拦截器函数接受的参数为调用时传入的参数。

