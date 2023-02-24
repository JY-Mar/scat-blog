# 踩坑笔记

## npm

### 兼容性问题

```
conflicting peer dependency: ***
node_modules/***
  peer *** from ***
  node_modules/***
    dev *** from the root project**
```

存在冲突/版本不兼容插件存在，解决：
- 可以更新/**降低插件版本以使之兼容**
- `npm`指令强制安装/忽略冲突安装

`--force` 会无视冲突，并强制获取远端`npm`库资源，即使本地有资源也会覆盖掉<br>
`--legacy-peer-deps` 安装时忽略所有peerDependencies，忽视依赖冲突，采用`npm`版本4到版本6的样式去安装依赖，已有的依赖不会覆盖

## `babel 6`与`babel 7`

`babel 7`的插件与`babel 6`的插件名称不同，无法直接通过`npm install`完成升级。`babel 6`插件名称以“babel-plugin-”开头，而`babel 7`插件以“@vue/cli-plugin-”开头。

### 升级代码

```sh
// 卸载旧版本babel core
npm uninstall babel-core
// 安装新版本babel core
npm install -D @babel/core
// babel-upgrade自动升级babel及插件
npx babel-upgrade --write --install
```

## Git报错

```
Git: fatal: bad object refs/heads/2023.01.0
ignoring broken ref refs/heads/master
warning: ignoring broken ref refs/remotes/origin/HEAD（git pull 报错 ）
Unable to fetch repository. See output channel for more details
```