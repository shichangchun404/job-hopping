class VueRouter {
  constructor(options){
    this.mode = options.mode || 'hash'
    const routes = options.routes
    this.current = {
      path: '',
      component: {
        template: '<div>默认值</div>'
      }
    }
    this.pathMap = {}
    routes.forEach(item => {
      if(!this.pathMap[item.path]){
        this.pathMap[item.path] = item
      }
    })
    console.log('constructor pathMap ', this.pathMap)
    if(this.mode==='hash'){
      this.listenHashHistory()
    }else if(this.mode==='history'){
      this.listenHtml5History()
    }
    
  }
  listenHashHistory(){
    console.log('listenHashHistory ', )
    window.addEventListener('load',()=>{
      if(!window.location.hash){
        window.location.hash = '/'
      }
    })
    window.addEventListener('hashchange',()=>{
      const hash = window.location.hash.slice(1)
      console.log('hashchange', hash)
      this.current.path = hash
      if(this.pathMap[hash]){
        this.current.component = this.pathMap[hash].component
      }else{
        this.current.component = { template: '<div>404</div>' }
      }
      
    })
  }
  listenHtml5History(){
    console.log('listenHtml5History', )
    window.addEventListener('load',()=>{
      const pathname = window.location.pathname
      console.log('load pathname', pathname)
      // if(window.location.pathname!='/'){
      //   window.location.pathname = '/'
      // }
    })
    window.addEventListener('popstate',(e)=>{
      const pathname = window.location.pathname
      console.log('popstate', pathname , e)
      
    })
  }
  push(){

  }
  replace(){

  }
  afterEach(){}
}
let _Vue
VueRouter.install = (Vue) =>{
  _Vue = Vue
  Vue.mixin({
    beforeCreate(){
      console.log('beforeCreate ',this.$options.name)
      if(this.$options.router){ // 根组件
        this._routerRoot = this
        this._router = this.$options.router
        Vue.util.defineReactive(this,'_route',this._router.current) // 将路由设置成响应式 this._routerRoot._route
      } else { // 子组建
        this._routerRoot = this.$parent && this.$parent._routerRoot // 每个组件实例都有_routerRoot属性
      }
    }
  })
  // 注册$router $route 挂在到vue原型上
  Object.defineProperty(Vue.prototype,'$router',{
    get(){
      return this._routerRoot._router
    }
  })
  Object.defineProperty(Vue.prototype,'$route',{
    get(){
      return this._routerRoot._route
    }
  })

  // 注册router-view 组件
  Vue.component('router-view', {
    render(h){
      console.log('render view' , this._routerRoot._route)
      return h(this._routerRoot._route.component)
    }
  })

   // 注册router-link 组件
   Vue.component('router-link',{
    props: {
      to: String
    },
    render(h){
      console.log('render to=' , this.to,' mode=', this._routerRoot._router.mode)
      const url = this._routerRoot._router.mode=='hash'?`#${this.to}`:this.to
      return h('a',{attrs:{href: url}}, this.$slots.default)
    }
  })
}

if(window.Vue){
  Vue.use(VueRouter)
}