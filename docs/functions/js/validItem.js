const validItem = value => {
  if ([undefined, null].includes(value)) {
    // 为空或未定义
    return false
  }
  if (typeof value === 'string' && value === '') {
    // 字符串长度0
    return false
  }
  if (typeof value === 'object') {
    if (value.constructor === Array) {
      // 类型为数组，数组长度0
      return value.length > 0
    }
    if (Object.prototype.toString.call(value) === '[object Object]') {
      // 对象属性数量0
      return Object.keys(value).length > 0
    }
  }
  return true
}

export default validItem
