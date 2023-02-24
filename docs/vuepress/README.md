# 前言

S想要写VuePress初衷是想记录下自己在开发中的心得、想法、遇到的坑。没想到在使用VuePress时也发现了许多的坑，给:older_man:整笑了:rofl:。<br>
所以写下前言先记录一下VuePress使用体验。

## 选择版本

VuePress目前有三个大版本，分别是[0.x](https://v0.vuepress.vuejs.org/zh/)、[1.x](https://v1.vuepress.vuejs.org/zh/)、[2.x](https://v2.vuepress.vuejs.org/zh/)。

:::tip
0.x是较老版本不建议使用<br>
1.x已经是很成熟的框架，可以使用<br>
2.x尚处于Beta阶段，可能会在后续有大改动或者会有未发现的BUG，谨慎使用
:::

介于前端技术更新快的特点，S决定学习并使用2.x来作为框架开发BLOG。

## 学习

[配置](https://v2.vuepress.vuejs.org/zh/reference/config.html)

## Markdown实用功能

### 导入代码块
基础用法（全部导入）
```md
@[code](../codeBlock.js)
```
导入第A行至第B行的代码块
```md
@[code{A-B}](../codeBlock.js)
```
导入指定语言代码块
```md
@[code js](../codeBlock.js)
```
导入指定语言的第A行至第B行的代码块
```md
@[code{A-B} js{}](../codeBlock.js)
```
导入指定语言代码块并高亮指定行
```md
@[code js{A,B-C}](../codeBlock.js)
```

具体参考VuePress 2.x[官方文档](https://v2.vuepress.vuejs.org/zh/guide/markdown.html#%E5%AF%BC%E5%85%A5%E4%BB%A3%E7%A0%81%E5%9D%97)解释

### 提示

支持的 type 有：

- tip
- warning
- danger
- details

```md
::: <type> [title]
[content]
:::
```

具体参考VuePress 2.x[官方文档](https://v2.vuepress.vuejs.org/zh/reference/default-theme/markdown.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AE%B9%E5%99%A8)解释