import diff from './diff'

/**
 * @description  : 递归复制属性值实现深拷贝
 * @param         {*} obj 被拷贝对象
 * @return        {*}
 */
const clone = (obj) => {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj
  // 原始类型直接返回
  if (typeof obj !== 'object' && typeof obj !== 'function') return obj

  var o = diff.isArray(obj) ? [] : {}
  for (const i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      o[i] = typeof obj[i] === 'object' ? clone(obj[i]) : obj[i]
    }
  }
  return o
}

export default clone
