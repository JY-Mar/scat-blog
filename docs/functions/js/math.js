import validItem from './validItem'

/**
 * @description  : 浮点相乘
 * @param         {*} a
 * @param         {*} b
 * @return        {*}
 */
const floatMul = (a, b) => {
  var c = 0
  var d = a.toString()
  var e = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (f) {}
  try {
    c += e.split('.')[1].length
  } catch (f) {}
  return (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c)
}

/**
 * @description  : 浮点相加
 * @param         {*} a
 * @param         {*} b
 * @return        {*}
 */
const floatAdd = (a, b) => {
  var c, d, e
  if (!validItem(a) || isNaN(a)) {
    a = 0
  }
  if (!validItem(b) || isNaN(b)) {
    b = 0
  }
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  e = Math.pow(10, Math.max(c, d))
  return (floatMul(a, e) + floatMul(b, e)) / e
}

/**
 * @description  : 浮点相减
 * @param         {*} a
 * @param         {*} b
 * @return        {*}
 */
const floatSub = (a, b) => {
  var c, d, e
  if (!validItem(a) || isNaN(a)) {
    a = 0
  }
  if (!validItem(b) || isNaN(b)) {
    b = 0
  }
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  e = Math.pow(10, Math.max(c, d))
  return (floatMul(a, e) - floatMul(b, e)) / e
}

/**
 * @description  : 浮点相除
 * @param         {*} a
 * @param         {*} b
 * @return        {*}
 */
const floatDiv = (a, b) => {
  var c = 0
  var d = 0
  var e = 0
  var f = 0
  try {
    e = a.toString().split('.')[1].length
  } catch (g) {}
  try {
    f = b.toString().split('.')[1].length
  } catch (g) {}
  c = Number(a.toString().replace('.', ''))
  d = Number(b.toString().replace('.', ''))
  return floatMul(c / d, Math.pow(10, f - e))
}

/**
 * @description  : 计算两点（经纬度）之间的距离
 * @param         {Number} longitude1 经度1
 * @param         {Number} latitude1 纬度1
 * @param         {Number} longitude2 经度2
 * @param         {Number} latitude2 纬度2
 * @param         {String} accuracy 精度 m, foot, km, inch, mile, seamile, cmile
 * @param         {Number} decimal 小数位数
 * @param         {String} lang 语言（英文/中文）
 * @return        {*}
 */
const distance = (longitude1, latitude1, longitude2, latitude2, accuracy = 'm', decimal = 1, lang = 'zh-CN') => {
  const radLat1 = floatDiv(floatMul(latitude1, Math.PI), 180)
  const radLat2 = floatDiv(floatMul(latitude2, Math.PI), 180)
  const a = floatSub(radLat1, radLat2)
  const b = floatSub(floatDiv(floatMul(longitude1, Math.PI), 180), floatDiv(floatMul(longitude2, Math.PI), 180))
  let dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
  dis = floatMul(dis, 6378.137) // EARTH_RADIUS;
  dis = floatDiv(Math.round(floatMul(dis, 10000)), 10000) * 1000
  switch (accuracy.toLowerCase()) {
    case 'm':
      // 米（公制）
      return `${dis.toFixed(decimal)}${lang === 'en' ? 'm' : '米'}`
    case 'inch':
      // 英寸
      return `${(dis * 39.3700787).toFixed(decimal)}${lang === 'en' ? 'inch' : '英寸'}`
    case 'foot':
      // 英尺
      return `${(dis * 3.2808399).toFixed(decimal)}${lang === 'en' ? 'foot' : '英尺'}`
    case 'km':
      // 千米（公制）
      return `${(dis * 0.001).toFixed(decimal)}${lang === 'en' ? 'km' : '千米'}`
    case 'mile':
      // 英里
      return `${(dis * 0.0006214).toFixed(decimal)}${lang === 'en' ? 'mile' : '英里'}`
    case 'seamile':
      // 海里
      return `${(dis * 0.00054).toFixed(decimal)}${lang === 'en' ? 'seamile' : '海里'}`
    case 'cmile':
      // 华里
      return `${(dis * 0.002).toFixed(decimal)}${lang === 'en' ? 'cmile' : '华里'}`
    default:
      return `${dis.toFixed(decimal)}${lang === 'en' ? 'm' : '米'}`
  }
}

export default {
  floatMul,
  floatAdd,
  floatSub,
  floatDiv,
  distance
}
