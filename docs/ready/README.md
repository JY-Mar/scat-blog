# 开发前准备

## NodeJs

下载适合自己的版本，具体需要看手上的项目Vue版本，Vue2.x尽量使用Node16或更早版本（避免兼容性问题：16版本后新加入了ssl校验，无法向下兼容），Vue3.x使用最新版本。
npm版本跟随NodeJs而升级，需要版本对应，具体可查看[官方文档解释](https://nodejs.org/zh-cn/download/releases/)

### 配置

```sh
# 查看npm配置
npm config list
# 配置
npm config set 配置名 配置值
npm config get 配置名
```

## Git

版本随意，可使用最新版本，无兼容性问题

### 配置

```sh
git config --global --list
git config --global user.name 账号名
git config --global user.email 邮箱账号
# 密码和仓库链接保存到硬盘中
git config credential.helper store
git config --global credential.helper store
# 修改拉取时默认rebase取代merge
git config pull.rebase true
git config --global pull.rebase true
```

### 疑问
https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA
https://blog.csdn.net/yao_hou/article/details/108178717
