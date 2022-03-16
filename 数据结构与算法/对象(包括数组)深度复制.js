/**
 * 0 for prop in obj 遍历
 * 1 判断是否是原始数值  typeof
 * 2 判断是数组还是对象 instanceof toString constructor
 * 3 建立相应的数组或对象
 * 4 递归
 */

function deepCopy(Origin,Target){
    var tag = Target || {},
        toStr = Object.prototype.toString,
        arrStr = "[object Array]";
    for(var prop in Origin){
        if(Origin.hasOwnProperty(prop)){//非原型的属性
            if(typeof Origin[prop] == "object"){//不是原始数值
                if(toStr.call(Origin[prop])==arrStr){//数组
                    tag[prop] = [];
                }else{
                    tag[prop] = {};
                }
                deepCopy(Origin[prop],tag[prop])
            }else{
                tag[prop] = Origin[prop];
            }
        }
    }
    return tag;
}

/**copy()函数兼容了各种数据 不包括包装类*/
function copy(o){
    if(typeof(o)=="object"){
        if(Object.prototype.toString.call(o)=="[object Array]"){
            return deepCopy(o,[])
        }else{
            return deepCopy(o,{})
        }
    }else{
        return o;
    }
}

var obj = {
    name:"shicc",
    age:26,
    card:["zs","ny","js"],
    lover:{
        name:"bm",
        card:["11",22,33],
    },
    __proto__:{
        lastname:"shi"
    }
}
var obj1 = {}
deepCopy(obj,obj1)
console.log(obj1)

var arr = [1,{a:"a",b:{b:"bb"}},[44,55],"lala"];
var arr1 = [];
deepCopy(arr,arr1)
console.log(arr)



/********************************** */
function cd(o,t){
    var tg = t || {},
    toStr = Object.prototype.toString,
    arr = "[object Array]";
    for(var p in o){//o是数组时 p为0 1 2.。。 o是对象时，p是属性名
        if(o.hasOwnProperty(p)){
            if(typeof(o[p])=="object"){
                if(toStr.call(o[p]==arr)){
                    tg[p]=[];
                }else{
                    tg[p]={};
                }
                cd(o[p],tg[p]);
            }else{
                 tg[p]=o[p];
            }
        }
    }
    return tg;
}
