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
      // 类型为数组，数组长度大于0
      return value.length > 0
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      // 类型为对象，对象属性数量大于0
      return Object.keys(value).length > 0
    } else if (Object.prototype.toString.call(value) === '[object Date]') {
      // 类型为日期，日期可被转换为longInt类型时间戳
      const res = Date.parse(new Date(value))
      return typeof res === 'number' && !isNaN(res)
    }
  }
  return true
}

export default validItem
