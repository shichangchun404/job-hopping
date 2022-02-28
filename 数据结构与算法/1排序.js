// 将A B合并排序
let A = [0,2,7,9,66,77]
let B = [1,3,5,23,37]

for (let i=0;i<A.length;i++) {
  for (let j=0;j<B.length;j++) {
    if (A[i]<B[j]) {
      B.splice(j,0,A[i])
      break
    } else {
      if (j==B.length-1) {
        B.push(A[i])
        break
      }
    }
  }
}
//console.log("B =", B)


let arr = [12,34,5,6,78,88,3,6,66,777]
var temp;
for(var i=0;i<arr.length-1;i++){
  for(var j=0;j<arr.length-1-i;j++){
    if(arr[j]>arr[j+1]){
      temp=arr[j];
      arr[j]=arr[j+1];
      arr[j+1]=temp;
    }
  }
}
// console.log('arr = ',arr)


/*二分法排序*/
function to2fen(a){
  if(a.length <= 1){
      return a; // 返回类似[10] [25] []
  }
  var mid = a.splice((Math.floor(a.length)/2),1);//Math.floor()向下取整 Math.ceil(0.1)=1向上取整 mid=[58] a=[10,25,6,35,47,92,5]
  var l = [];
  var r = [];
  for(var i = 0;i<a.length;i++){
      if(a[i] <= mid[0]){
          l.push(a[i]);
      }else{
          r.push(a[i]);
      }
  }
  // return to2fen(l).concat(mid,to2fen(r))
  return [...to2fen(l),...mid,to2fen(r)]
}
var arr11 = [10,25,6,35,58,47,92,5];
var asort = to2fen(arr11);
console.log('二分法排序 ',asort);

function BubbleSort(arr){
  var i,j,temp;
  for(i=0;i<arr.length-1;i++){
    for(j=i+1;j<arr.length;j++){
      if(arr[i]>arr[j]){
          temp=arr[j];
          arr[j]=arr[i];
          arr[i]=temp;
        }
      }
    }
  return arr;
}
var bubbleSort = BubbleSort(arr11);
console.log('冒泡排序 ',bubbleSort);

