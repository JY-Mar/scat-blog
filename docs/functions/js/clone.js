/**
 * @description  : 是数组
 * @param         {*} arg
 * @return        {*}
 */
const isArray = (arr) => {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

/**
 * @description  : 递归复制属性值实现深拷贝
 * @param         {*} obj 被拷贝对象
 * @return        {*}
 */
const clone = (obj) => {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    //原始类型直接返回
    return obj
  }
  var o = isArray(obj) ? [] : {}
  for (const i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      if (typeof obj[i] === 'object') {
        if ([Date, RegExp].includes(obj[i]?.constructor)) {
          o[i] = new obj[i].constructor(obj[i])
        } else {
          o[i] = clone(obj[i])
        }
      } else {
        o[i] = obj[i]
      }
    }
  }
  return o
}

export default clone
