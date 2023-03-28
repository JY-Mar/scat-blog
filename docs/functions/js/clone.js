/**
 * @description  : 是数组
 * @param         {*} arg
 * @return        {*}
 */
const isArray = arg => {
  return Object.prototype.toString.call(arg) === '[object Array]'
}

/**
 * @description  : 是对象
 * @param         {*} arg
 * @return        {*}
 */
const isObject = arg => {
  return Object.prototype.toString.call(arg) === '[object Object]'
}

/**
 * @description  : 递归复制属性值实现深拷贝
 * @param         {*} obj 被拷贝对象
 * @return        {*}
 */
const clone = (obj) => {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj
  // 原始类型直接返回
  if (!isObject(obj) || !isArray(obj) || typeof obj !== 'function') {
    return obj
  }

  var o = isArray(obj) ? [] : {}
  for (const i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      o[i] = isObject(obj) ? clone(obj[i]) : obj[i]
    }
  }
  return o
}

export default clone
