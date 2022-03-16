class Person{}
let p = new Person();
let pp = new Proxy(p,{
    get:function(target,key){
        console.log("调用get方法");
        if(key.length>3){
            return target[key]+"key长度大于3";
        }else{
            return target[key]+"key长度不大于3";
        }
    },
    set:function(target,key,value){
        console.log("调用set方法 ");
        if(value=="shicc"){
            value +=" is cool" 
            return Reflect.set(target,key,value);
        }else{
            return Reflect.set(target,key,value);
        }
        
    }
})
p.name="shicc";
p.name;
