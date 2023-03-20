import test from './test'
import split from './split'
import math from './math'

/**
 * @description  : 是否对象
 * @param         {Object} obj 对象
 * @return        {Boolean} 布尔值
 */
const isObject = obj => {
  return obj && typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * @description  : 是否数组
 * @param         {Array} arr 数组
 * @return        {Boolean} 布尔值
 */
const isArray = arr => {
  return arr && typeof arr === 'object' && arr.constructor === Array
}

/**
 * @description  : 判断RGBA颜色深浅
 * @param         {Number} r 红 0~255
 * @param         {Number} g 绿 0~255
 * @param         {Number} b 蓝 0~255
 * @param         {Number} a 透明度 0~1
 * @param         {Number} threshold 阈值
 * @return        {Boolean}
 */
const rgbaIsLight = (r, g, b, a = 1, threshold = 192) => {
  const _r = parseFloat(r) < 0 ? 0 : parseFloat(r) > 255 ? 255 : parseFloat(r)
  const _g = parseFloat(g) < 0 ? 0 : parseFloat(g) > 255 ? 255 : parseFloat(g)
  const _b = parseFloat(b) < 0 ? 0 : parseFloat(b) > 255 ? 255 : parseFloat(b)
  const _a = !isNaN(parseFloat(a)) ? parseFloat(a) : 1
  if (_r * 0.299 + _g * 0.758 + _b * 0.114 >= threshold) {
    // 浅色
    return true
  } else {
    // 深色
    return _a < 0.35
  }
}

/**
 * @description  : 判断颜色深浅
 * @param         {String} color 颜色
 * @param         {Number} threshold 阈值
 * @return        {*}
 */
const colorIsLight = (color, threshold = 192) => {
  const isHexA = test.hexColorA(color)
  const isHex = test.hexColor(color)
  const isRgba = test.rgba(color)
  if (isHexA || isHex || isRgba) {
    let arr = []
    let alpha = 1
    if (isHexA) {
      // 十六进制RGBA
      let hex = color.substring(1, color.length)
      const delta = hex.length === 8 ? 2 : 1
      // 透明度
      const a = parseInt(hex.substring(hex.length - delta, hex.length), 16)
      if (a > 0) {
        hex = hex.substring(0, hex.length - delta)
        arr = split
          .str(hex, delta)
          .map(i => (delta === 1 ? i + i : i))
          .map(i => parseInt(i, 16))
        alpha = math.fDiv(a, 255)
      } else {
        // alpha 0
        arr = [255, 255, 255]
      }
    } else if (isHex) {
      // 十六进制RGB
      const hex = color.substring(1, color.length)
      const delta = hex.length === 6 ? 2 : 1
      arr = split
        .str(hex, delta)
        .map(i => (delta === 1 ? i + i : i))
        .map(i => parseInt(i, 16))
    } else if (isRgba) {
      // RGB/RGBA
      const rgb = color.substring(0, color.length - 1).split('(')[1]
      arr = rgb.replace(/\s/g, '').split(',')
      if (arr.length > 3) {
        alpha = arr[3]
      }
      arr = arr.slice(0, 3)
    }
    return rgbaIsLight(...arr.map(i => parseInt(i)), alpha, threshold)
  } else {
    return false
  }
}

export default {
  isObject,
  isArray,
  rgbaIsLight,
  colorIsLight,
}
