# 通用方法集

## 判断值有效

### 单值判断

验证值有效（不为 Null，undefined；当 Array 长度不为 0；对象属性数不为 0）

@[code js](./js/validItem.js)

### 多值判断

@[code js](./js/valid.js)

## 深拷贝

递归复制属性值实现深拷贝

@[code js](./js/clone.js)

## 深合并

递归实现对象深度合并

@[code js](./js/merge.js)

## 判断全相等

嵌套对象相等（两者可能顺序不同，但值相同），直接判断或者转成字符串判断会判断错误

@[code js](./js/equal.js)

## 防溢出的数值计算

避免 JS 数学计算导致精度丢失 bug

@[code{1-1} js{}](./js/math.js)

### 浮点数乘法

浮点数相乘

@[code{3-20} js{}](./js/math.js)

### 浮点数加法

浮点数相加

@[code{22-48} js{}](./js/math.js)

### 浮点数减法

浮点数相减

@[code{50-76} js{}](./js/math.js)

### 浮点数除法

浮点数相除

@[code{78-98} js{}](./js/math.js)

### 计算两点（经纬度）之间的距离

@[code{100-144} js{}](./js/math.js)

## 从对象中抽出属性

取出数组中的元素名的对应属性的键值对 组成新的对象后返回

@[code js](./js/pick.js)

## 从对象中剔除属性

从对象中剔除符合 arr 中的元素名的元素

@[code js](./js/reject.js)

## 节流&防抖

### 节流

特性：在一定时间内，只能触发一次

原理：<strong>[1]</strong>进入方法后即刻开启一个定时器（指定时间后释放定时器，初始化标志位为可用），初始化标志位为不可用，执行<ins>回调方法</ins>。当再次进入方法时定时器仍生效，由于标志位为不可用，不执行任何操作；当再次进入方法时定时器已失效，此时标志位为可用，则执行再次激活<strong>[1]</strong>执行步骤。

@[code js](./js/throttle.js)

### 防抖

特性：一定时间内，只有最后一次操作，再过 wait 毫秒后才执行函数

原理：<strong>[1]</strong>进入方法时先检测定时器是否生效，是则清除定时器使之失效。开启一个新定时器（指定时间后释放定时器），当再次进入方法时仍生效，则重复<strong>[1]</strong>；当再次进入方法时定时器已失效，则执行<ins>回调方法</ins>。

@[code js](./js/debounce.js)

## 转换方法

@[code{1-3} js{}](./js/convert.js)

### 颜色 HEX 转 RGBA

@[code{38-81} js{}](./js/convert.js)

### 对象转数组

@[code{279-297} js{}](./js/convert.js)

### 数组转对象

@[code{299-317} js{}](./js/convert.js)

## 压缩图片

利用 canvas，将图片画在 canvas 上，然后转换为 blob 下载

@[code{236-277} js{}](./js/convert.js)

## 格式校验（正则）

@[code{1-33} js{}](./js/test.js)

::: details 查看扩展的格式校验方法
@[code{35-168} js{}](./js/test.js)
:::

## 格式化数据

@[code{1-2} js{}](./js/filter.js)

### 数额

四舍五入两位小数

@[code{4-21} js{}](./js/filter.js)

### 手机号码/电话号码（国内）

@[code{50-74} js{}](./js/filter.js)

## 随机数值

### 整数

@[code{1-9} js{}](./js/rand.js)

### 浮点数

@[code{11-20} js{}](./js/rand.js)

### GUID

@[code{22-60} js{}](./js/rand.js)

## 查找父组件

@[code js](./js/$parent.js)

## 格式化数值（加单位）

@[code js](./js/addUnit.js)