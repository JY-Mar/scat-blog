# 运算符

## 可选链

符号：`?.`

ECMAScript 11[^1]新特性

参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining)中的详细描述。

## 展开 

符号：`...`

展开运算符是深拷贝也是浅拷贝，仅针对其一级基础数据为深拷贝，但对更深层嵌套的数据为浅拷贝。<br>
`Object.assign`是浅拷贝（完全浅拷贝），用作对象合并，仅针对其一级基础数据自右向左合并（右侧值覆盖左侧值），但对嵌套数据不会执行合并操作而是直接将整个嵌套对象作为整体的一级属性值向左合并。<br>
带嵌套属性的对象若想将嵌套中属性也作合并操作，则`Object.assign`完全不适合。

参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)中的详细描述。

[^1]: This is the first footnote.