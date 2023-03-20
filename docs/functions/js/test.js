const regx = {
  mobile: /^1[3-9]\d{9}$/,
  phone: /^(\d{3}-\d{8})$|^(\d{4}-\d{7})$/,
  money: /^\d+(\.\d+)?$/,
  base64: /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i,
  imageFile: /.+?(\.jpg|\.jpeg|\.gif|\.png|\.svg)$/,
  hexColor: /^#([a-fA-F\d]{6}|[a-fA-F\d]{3})$/,
  hexColorA: /^#([a-fA-F\d]{8}|[a-fA-F\d]{4})$/, // 带alpha属性的hex
  rgba: /^rgba?\((0|1\d{0,2}|2[0-5]{2})\s{0,},\s{0,}(0|1\d{0,2}|2[0-5]{2})\s{0,},\s{0,}(0|1\d{0,2}|2[0-5]{2})(\s{0,},\s{0,}(0|1|0\.[1-9][0-9]?))?\)/,
  linearGradient: /^linear-gradient\(.+\)$/,
  url: /http(s)?:\/\/([\w-]+\.?)+[\w-]+(\/[\w-./?%&=]*)?/,
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  zipcode: /^[1-9]\d{5}(?!\d)/,
  letterNumber: /^[A-Za-z0-9]+$/,
  password: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*,.])[0-9a-zA-Z!@#$%^&*,.]/,
  number: /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
}

/**
 * @description  : 正则判断基础
 * @param         {*} value 要判断的值
 * @param         {*} regxStr 正则公式
 * @return        {*} 判断结果
 */
const basic = (value, regxStr) => {
  if (!Object.prototype.hasOwnProperty.call(regx, regxStr)) {
    // 没有收录于regx中则是自定义正则表达式
    console.log('正则公式不存在：' + regxStr)
    return false
  } else {
    return regx[regxStr].test(value)
  }
}

/**
 * @description  : 手机号
 * @param         {*} value
 * @return        {*} 是否通过
 */
const mobile = value => {
  return basic(value, 'mobile')
}

/**
 * @description  : 电话
 * @param         {*} value
 * @return        {*} 是否通过
 */
const phone = value => {
  return basic(value, 'phone')
}

/**
 * @description  : 金额
 * @param         {*} value
 * @return        {*} 是否通过
 */
const money = value => {
  return basic(value, 'money')
}

/**
 * @description  : base64
 * @param         {*} value
 * @return        {*} 是否通过
 */
const base64 = value => {
  return basic(value, 'base64')
}

/**
 * @description  : 图片文件名
 * @param         {*} value
 * @return        {*} 是否通过
 */
const imageFile = value => {
  return basic(value, 'imageFile')
}

/**
 * @description  : 十六进制颜色
 * @param         {*} value
 * @return        {*} 是否通过
 */
const hexColor = value => {
  return basic(value, 'hexColor')
}

/**
 * @description  : 带alpha通道的十六进制颜色
 * @param         {*} value
 * @return        {*} 是否通过
 */
const hexColorA = value => {
  return basic(value, 'hexColorA')
}

/**
 * @description  : rgba颜色
 * @param         {*} value
 * @return        {*} 是否通过
 */
const rgba = value => {
  return basic(value, 'rgba')
}

/**
 * @description  : css渐变属性
 * @param         {*} value
 * @return        {*} 是否通过
 */
const linearGradient = value => {
  return basic(value, 'linearGradient')
}

/**
 * @description  : URL
 * @param         {*} value
 * @return        {*} 是否通过
 */
const url = value => {
  return basic(value, 'url')
}

/**
 * @description  : 电子邮箱
 * @param         {*} value
 * @return        {*} 是否通过
 */
const email = value => {
  return basic(value, 'email')
}

/**
 * @description  : 邮政编码
 * @param         {*} value
 * @return        {*} 是否通过
 */
const zipcode = value => {
  return basic(value, 'zipcode')
}

/**
 * @description  : 密码
 * @param         {*} value
 * @return        {*} 是否通过
 */
const password = value => {
  return basic(value, 'password')
}

/**
 * @description  : 验证字母+数字
 * @param         {*} value
 * @return        {*} 是否通过
 */
const letterNumber = (value) => {
  return basic(value, 'letterNumber')
}

/**
 * @description  : 验证数字
 * @param         {*} value
 * @return        {*} 是否通过
 */
const number = (value) => {
  return basic(value, 'number')
}

export default {
  basic,
  mobile,
  phone,
  money,
  base64,
  imageFile,
  hexColor,
  hexColorA,
  rgba,
  linearGradient,
  url,
  email,
  password,
  zipcode,
  letterNumber,
  number
}
