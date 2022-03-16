let tree = [
  {
    id:1,
    children:[
      {
        id:11,
        children:[]
      },
      {
        id:12,
        children:[
          {
            id:121,
          },
          {
            id:122,
            children:[
              {
                id:1221,
                children:[
                  {id:12211}
                ]
              }
            ]
          },
          {
            id:123,
          }
        ]
      },
    ]
  },
  {
    id:2,
    children:[
      {
        id:21,
        children:[]
      },
      {
        id:22,
        children:[]
      },
    ]
  }
]
function findPath(arr,id,path){
  let _path = ''
  find(arr,id,path)
  return _path
  function find(arr,id,path){
    arr.forEach(it => {
      if(_path) return
      console.log(it.id)
      if(it.id==id){
        _path = `${path}_${id}`
      }
      if(it.children&&it.children.length){
        find(it.children,id,`${path}_${it.id}`)
      } 
    });
    return _path
  }
}

let str = findPath(tree,12211,'0')
console.log(str)