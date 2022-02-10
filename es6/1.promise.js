var getJson = function(url){
  const p = new Promise(function(resolve,reject){
    let hander = function(){
      if (this.readyState!==4) {
        return 
      } else if (this.status==200) {
        resolve(this.response)
      } else {
        reject('fail')
      }
    }
    let client = new XMLHttpRequest()
    client.open('GET',url)
    client.onreadystatechange = hander
    client.responseType = 'json'
    client.setRequestHeader("Accept", "application/json")
    client.send()
  })
  return p
}


let url = 'http://www.jdt.com.cn/ossDomain/jdt/json/jdt-home-case.json'
getJson(url).then(function(data){
  console.log('success >>> ',  data)
},function(err){
  console.log('err >>>', err)
})

