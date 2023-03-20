import math from './math'

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
  const radLat1 = math.fDiv(math.fMul(latitude1, Math.PI), 180)
  const radLat2 = math.fDiv(math.fMul(latitude2, Math.PI), 180)
  const a = math.fSub(radLat1, radLat2)
  const b = math.fSub(math.fDiv(math.fMul(longitude1, Math.PI), 180), math.fDiv(math.fMul(longitude2, Math.PI), 180))
  let dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
  dis = math.fMul(dis, 6378.137) // EARTH_RADIUS;
  dis = math.fDiv(Math.round(math.fMul(dis, 10000)), 10000) * 1000
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

/**
 * @description  : 计算日期间天数差
 * @param         {*} time1
 * @param         {*} time2
 * @return        {*}
 */
const dayDuration = (time1, time2) => {
  const timestamp1 = Date.parse(new Date(time1))
  const timestamp2 = Date.parse(new Date(time2))
  // 向上取整
  return Math.ceil(math.fDiv(math.fSub(timestamp2, timestamp1), 24 * 3600 * 1000))
}

export default {
  distance,
  dayDuration
}
