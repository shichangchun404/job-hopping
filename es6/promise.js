/**
 * then传入的方法如果返回的是个Promise对象，
 * 那么再后面的then传入的方法就会等到这个Promise
 * （实际上是传入Promise的方法）调用了resolve()为止，
 *  才会继续执行。
 * **/ 

 /**
  * 封装一个ajax请求
  */
function ajax(url){
    let promise = new Promise(function(resolve,reject){
        const client = new XMLHttpRequest();
        client.open("GET",url);
        client.send();
        client.onreadystatechange = function(response){
            if(response.target.readyState!==4){
                return ;
            }
            if(response.target.status==200){
                resolve("请求成功")
            }else{
                reject(new Error(response.statusText))
            }
        }
    });
    return promise;
}
var url="http://ah.10086.cn/m/u/cms/m/201703/21161422ceec.png";
ajax(url).then(function(res){
    console.log(res)
},function(err){
    console.log(err)
})

function wash(resolve){
    console.log('1开始洗衣服...');
    setTimeout(()=>{
        console.log('2洗完了！');
        //resolve('一堆洗干净的衣服');//该处注释 后面不执行
    }, 2000);
}
function hang(clothes){
    console.log('3开始晾衣服...');
    return new Promise(resolve=>{
        setTimeout(()=>{
            console.log(clothes+'4晾完了！');
            resolve("一堆晾好的衣服");
        }, 3000)
    });
}

function dry(clothes){
    console.log('5等衣服干...');
    return new Promise(resolve=>{
        setTimeout(()=>{
            console.log(clothes+'6晾干了!');
            resolve('一堆晾干了的衣服');
        }, 3000)
    });
}

function pickup(clothes){
    console.log('7开始收衣服...');
    setTimeout(()=>{
        console.log(clothes+'8收完了!');
    }, 3000)
}
var promise = new Promise(wash);//wash也可以直接返回一个promise对象，就不用再次定义，直接wash().then(hang).then(dry).then(pickup);
promise.then(hang).then(dry).then(pickup);



/****************  自定义实现Promise ******************** */
function myPromise(fn){
    const missions = [];  //待执行队列
    var value = null;
    var state = 'pending';
    var next_resolve = null;

    //执行传入的方法
    fn(resolve);

    //当传入的方法中调用resolve(value)时，异步执行mission
    function resolve(_return_value){
        value = _return_value;
        state = 'fulfilled';
        setTimeout(()=>{
            missions.forEach(mission=>{
                handle(mission);
            })
        }, 0);
    }

    //执行then方法时，将传入的方法加入missions，等待resolve触发。
    this.then = function(mission){
        var fn = function(resolve){
            next_resolve = resolve;
            if(state === 'pending'){
                missions.push(mission)
            }else{
                handle(mission);
            }
        }
        return new myPromise(fn);
    }

    function handle(mission){
        const result = mission(value);
        //当处理结果为Promise对象时，将next_resolve推入待执行队列
        if(result && (typeof result == 'object' || typeof result == 'function')){
            if(result.then && typeof result.then == 'function'){
                result.then(next_resolve);
            }
        }else{
            next_resolve(result);
        }
    }
}