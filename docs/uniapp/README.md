# 概述

## 路由管理器（仅vue2）

uniapp框架中缺少路由管理器，使用`uni-simple-router`、`uni-read-pages`可以达到与vue-router类似功能。

> `uni-read-pages`的作用是：读取uniapp的pages.json，作为router的配置，把pages.json中的路由配置转换成vue-router配置的形式。

### 安装依赖

```sh
npm install uni-simple-router uni-read-pages
```

### 配置与初始化

1. 根目录新建 vue.config.js 文件，写入以下内容

```js
// vue.config.js
const TransformPages = require('uni-read-pages')
const { webpack } = new TransformPages()

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        ROUTES: webpack.DefinePlugin.runtimeValue(() => {
          const tfPages = new TransformPages({
            includes: ['path', 'name', 'aliasPath']
          });
          return JSON.stringify(tfPages.routes)
        }, true)
      })
    ]
  }
}
```

includes 中包含的是router会读取pages路由中的字段名，后续如果有用到meta等路由信息，可以在 includes 里增加 'meta'，在pages路由中写对应的数据，router中就可以获取得到

2. 新建router.js，写入以下内容

```js
// router.js
import { RouterMount, createRouter } from 'uni-simple-router'

const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routerErrorEach:({type, level,...args})=>{
    // 跳转时错误后执行的守卫
    console.log(type, level)
  	if(type === 3){
      // 路由栈到达最底层
  		router.$lockStatus = false
      uni.showModal({
        title: '提示',
        content: '是否返回首页？',
        confirmColor: '#0080FE',
        cancelColor: '#999999',
        cancelText: '继续浏览',
        success: res => {
          if (res.confirm) {
            uni.switchTab({
              url: `/pages/home/home`
            })
          } else if (res.cancel) {
            if (level > 1) {
              // level > 1表示当前页面为页面栈栈顶元素，栈内还有其他页面缓存（可用于goback操作）
              uni.navigateBack({
                delta: 1
              })
            }
          }
        }
      })
  	}
  },
	routes: [...ROUTES]
})
//全局路由前置守卫
router.beforeEach((to, from, next) => {
  next()
})
// 全局路由后置守卫
router.afterEach((to, from) => {
  
})

export {
  router,
  RouterMount
}
```
routerErrorEach中，type的含义如下：

- 0 表示 next(false)
- 1 表示 next(unknownType)
- 2 表示加锁状态，禁止跳转
- 3 表示在获取页面栈的时候，页面栈不够level获

3. main.js导入router.js并挂载

```js
// main.js
import Vue from 'vue'
import App from './App'
import { router, RouterMount } from 'common/router/router'  //路径换成自己的
Vue.use(router)

App.mpType = 'app'
const app = new Vue({
  ...App
})

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app,router,'#app')
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
```

> ！！注意app的挂载方式，必须按照这里的写法实现！

### 路由使用

#### 编程式导航

通过 this.$Router 获取路由对象（R必须大写），编程式导航与vue-router很接近，但仍有需要注意的地方

> ⚠️ 必须注意的点： 在vue项目中，跳转路由时经常使用name进行跳转，相比于path，name更简洁、会被改变的几率也更小。

但是在uniapp中就要留意了，如果你要使用name进行跳转，那就无法携带query参数！同理，使用path跳转也不能使用params参数

```js
// 以下是错误的写法，name不能搭配query使用，path也不能搭配params参数使用
this.$Router.push({ name: 'newsDetail', query: { id: '123' }})
this.$Router.push({ path: '/pages/news/detail', params: { id: '123' }})

// 以下是正确的写法：
this.$Router.push({ name: 'newsDetail', params: { id: '123' } })
this.$Router.push({ path: '/pages/news/detail',query: { id: '123' }})
```

要点：**path搭配query参数，name搭配params参数**

#### 路由对象

和vue-router一样，uniapp在页面中也能获取当前的页面路由信息，不过首字母改成了大写字母

```js
console.log(this.$Route)
```

$Route 中包含了路由的基本信息以及，vue.config.js配置中includes配置的字段，和导航守卫中的to/from对象一致，利用includes配置项和导航守卫，可以实现权限校验的配置

```js
// router.js
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.power === "public") { // 公共页面，不需要登录

  } else { // 需要登录的页面
    let isLogin = checkLogin() // 判断是否登录
    if (isLogin) {
      next();
    } else {
      next({
        name: "login"
      })
    }
  }
})
```
```js
// pages.json
"pages": [
  {
    "path": "pages/login/login",
    "name": "login",
    "desc": "登录页",
    "meta": {
      "power": "public" // 不需要登录
    }
  },
  { // 需要登录
    "path": "pages/my/my",
    "name": "login",
    "desc": "我的"
  }
  //...
]
```

## 引入第三方字体库

### 错误方式

```css
@font-face {
  font-family: 'my-font';
  src: url('~@/static/font.ttf') format('truetype');
}
```

在微信中直接使用`url()`来引入本地文件会报错“...do-not-use-local-path...”。微信不允许引入本地文件，只允许base64或者引入远程文件。

### 正确方式

1. 字体可以全量引入，也可以将其中所需的[文字提取](https://font.qqe2.com/index.html#)出来，导出为新的字体文件。
2. 将ttf或其他格式字体文件[转置为base64编码](https://www.giftofspeed.com/base64-encoder/)，按格式写入`url()`中

```css
@font-face {
  font-family: 'my-font';
  src: url(data:application/font-ttf;charset=utf-8;base64,【生成出来的base64字符串】) format('truetype');
}
```
