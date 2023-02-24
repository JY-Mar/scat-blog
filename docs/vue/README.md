# 概述

## 开发规范

### 分支开发规范

### 文件命名规范

### 变量命名规范

## CSS

### 模糊效果

```css
filter: blur(5px);
backdrop-filter: blur(20px);
```

## Webpack

### 路径别名

```js
configureWebpack: {
  name: '你的项目名称',
  // 路径别名
  resolve: {
    alias: {
      '@': resolve('src'),
      '@c': resolve('src/components')
    }
  }
}
```

## setTimeout和setInterval

- setTimeout：在指定的毫秒数后，将定时任务处理的函数添加到执行队列的队尾。
- setInterval：按照指定的周期(以毫秒数计时)，将定时任务处理函数添加到执行队列的队尾。

setTimeout与setInterval且都是异步的

