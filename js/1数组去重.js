/**
 *  数组去重 [].filter(item,index,self)
 */

 var arr1 = [1,2,3,4,5,6,3,1];
 var arr12 = arr1.filter(function(v,i,self){
   return self.indexOf(v) === i;
 });
console.log('结果 ',arr12)