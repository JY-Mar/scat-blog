# 通用方法集

## 查找父组件

@[code js](./js/$parent.js)

## 格式化数值（加单位）

@[code js](./js/addUnit.js)

## 深拷贝

递归复制属性值实现深拷贝

@[code js](./js/clone.js)

## 计算

@[code js](./js/compute.js)

## 转换

@[code js](./js/convert.js)

## 节流&防抖

### 节流

特性：在一定时间内，只能触发一次

原理：<strong>[1]</strong>进入方法后即刻开启一个定时器（指定时间后释放定时器，初始化标志位为可用），初始化标志位为不可用，执行<ins>回调方法</ins>。当再次进入方法时定时器仍生效，由于标志位为不可用，不执行任何操作；当再次进入方法时定时器已失效，此时标志位为可用，则执行再次激活<strong>[1]</strong>执行步骤。

@[code js](./js/throttle.js)

### 防抖

特性：一定时间内，只有最后一次操作，再过 wait 毫秒后才执行函数

原理：<strong>[1]</strong>进入方法时先检测定时器是否生效，是则清除定时器使之失效。开启一个新定时器（指定时间后释放定时器），当再次进入方法时仍生效，则重复<strong>[1]</strong>；当再次进入方法时定时器已失效，则执行<ins>回调方法</ins>。

@[code js](./js/debounce.js)

## 差异化判断

@[code js](./js/diff.js)

## 判断全相等

嵌套对象相等（两者可能顺序不同，但值相同），直接判断或者转成字符串判断会判断错误

@[code js](./js/equal.js)

## 格式化数据

@[code js](./js/filter.js)

## 生成GUID

@[code js](js/guid.js)

## 防溢出的数值计算

避免 JS 数学计算导致精度丢失 bug

@[code js](./js/math.js)

## 深合并

递归实现对象深度合并

@[code js](./js/merge.js)

## 从对象中抽出属性

取出数组中的元素名的对应属性的键值对 组成新的对象后返回

@[code js](./js/pick.js)

## 随机数值

@[code js](./js/rand.js)

## 从对象中剔除属性

从对象中剔除符合 arr 中的元素名的元素

@[code js](./js/reject.js)

## 字符串拆分

@[code js](./js/split.js)

## 格式校验（正则）

@[code{1-33} js{}](./js/test.js)

::: details 查看扩展的格式校验方法
@[code{35-168} js{}](./js/test.js)
:::

## 判断值有效 单值判断

验证值有效（不为 Null，undefined；当 Array 长度不为 0；对象属性数不为 0）

@[code js](./js/validItem.js)

## 判断值有效 多值判断

@[code js](./js/valid.js)
