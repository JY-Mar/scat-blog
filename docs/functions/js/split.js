import validItem from './validItem'
import diff from './diff'

/**
 * @description  : 按固定片长拆分字符串
 * @param         {Number} str 字符串
 * @param         {Number} slice 片长
 * @return        {*}
 */
 const str = (str, slice = 2) => {
  if (typeof str !== 'string') return undefined
  if (!validItem(str)) return str
  if (str.length <= slice) return [str]
  const strTemp = str.split('')
  const temp = []
  for (let i = 0; i < strTemp.length; i += slice) {
    const endIndex = Math.min(i + slice, strTemp.length)
    temp.push(strTemp.slice(i, endIndex).join(''))
  }
  return temp
}

/**
 * @description  : 按固定片长拆分数组
 * @param         {Number} arr 数组
 * @param         {Number} slice 片长
 * @return        {*}
 */
const arr = (arr, slice = 10) => {
  if (!diff.isArray(arr)) return arr
  if (!validItem(arr)) return arr
  if (arr.length <= slice) return arr
  const temp = []
  for (let i = 0; i < arr.length; i += slice) {
    const endIndex = Math.min(i + slice, arr.length)
    temp.push(arr.slice(i, endIndex))
  }
  return temp
}

export default {
  str,
  arr
}