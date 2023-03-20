import test from './test'
import validItem from './validItem'

/**
 * @description  : 格式化 金额
 * @param         {Number} num
 * @param         {String} separator 分隔符
 * @return        {*}
 */
const money = (num, separator = ',') => {
  const money = parseFloat(num)
  if (isNaN(money)) return num
  const str = money.toFixed(2) + ''
  const intSum = str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, separator) // 取到整数部分
  let dot = str.substring(str.length, str.indexOf('.')) // 取到小数部分搜索
  if (validItem(dot)) {
    const numDot = +`0${dot}`
    dot = numDot === 0 ? '' : `${numDot}`.substring(1, `${numDot}`.length)
  }
  return intSum + dot
}

/**
 * @description  : 时间戳转换
 * @param         {Date,String,long} timestamp 时间戳
 * @param         {String} formatStr 转换格式
 * @return        {*}
 */
const timestamp = (timestamp, formatStr = 'YYYY-MM-DD hh:mm:ss') => {
  if (!validItem(timestamp)) return timestamp
  const date = new Date(timestamp)
  const dateObj = {
    YYYY: date.getFullYear(),
    MM: date.getMonth() + 1,
    DD: date.getDate(),
    hh: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds(),
  }
  const zero = val => {
    return val > 9 ? val : '0' + val
  }
  let str = formatStr
  for (let i in dateObj) {
    str = str.replace(i, zero(dateObj[i]))
  }
  return str
}

/**
 * @description  : 格式化 手机号
 * @param         {Number,String} mobile
 * @param         {Boolean} desensitize 是否脱敏
 * @return        {*}
 */
const mobile = (mobile, desensitize = false) => {
  if (!validItem(mobile)) {
    return ''
  }
  const str = `${mobile}`
  let mobileStr
  if (test.mobile(str)) {
    if (desensitize) {
      mobileStr = str.replace(
        /^(\d{3}).+(\d{4})$/g,
        `$1${Array.from({ length: str.length - 7 })
          .map(v => '*')
          .join('')}$2`
      )
    } else {
      mobileStr = str.replace(/(^\d{3}|\d{4}\B)/g, '$1-')
    }
  } else if (str.length === 8) {
    mobileStr = str
  } else {
    mobileStr = str.replace(/(^\d{3}|\d{8}\B)/g, '$1-')
  }
  return mobileStr
}

/**
 * @description  : 超出部分省略号
 * @param         {String} str 字符串
 * @param         {Number} len 最大显示字符数
 * @return        {*}
 */
const ellipsis = (str, len = 8) => {
  if (typeof str !== 'string') return str
  if (!validItem(len)) return str
  if (len < 0) return str
  if (str.length <= len) return str
  if (str.length > len) {
    return `${str.slice(0, len)}...`
  }
  return str
}

/**
 * @description  : 姓名脱敏
 * @param         {*}
 * @return        {*}
 */
const name = (str, separator = '*') => {
  if (typeof str !== 'string') return str
  if (!validItem(str)) return str
  const sep = validItem(separator) ? separator : '*'
  if (str.length <= 2) {
    return str.replace(/^(.).+$/, `$1${sep}`)
  } else {
    return str.replace(
      /^(.).+(.)$/,
      `$1${Array.from({ length: str.length - 2 })
        .map(v => sep)
        .join('')}$2`
    )
  }
}

export default {
  money,
  timestamp,
  mobile,
  ellipsis,
  name,
}
