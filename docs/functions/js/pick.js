import validItem from './validItem'
import merge from './merge'

/**
 * @description  : 从对象obj中取出数组arr中的元素名的对应属性的属性值
 * @param         {*} obj
 * @param         {*} arr
 * @param         {*} options [transforIllegal, ignoreCase, forceAssign]
 *                    {
 *                      transforIllegal {Boolean} 是否转换null、undefined、''、[]、{}为undefined
 *                      ignoreCase {Boolean} 是否忽略属性名大小写
 *                      forceAssign {Boolean} 强制显示所有arr中出现的属性名，缺省值默认强制为null,
 *                      forceAssignValue {String} 强制显示缺省值，默认为null
 *                    }
 * @return        {*} 新对象，属性名为arr子集
 */
const pick = (obj, arr, options = {}) => {
  const _options = merge({ transforIllegal: false, ignoreCase: false, forceAssign: false, forceAssignValue: null }, options)
  const t = {}
  if (!obj || !arr) return t
  // 非对象
  if (Object.prototype.toString.call(obj) !== '[object Object]') return t
  // 非数组
  if (!(arr instanceof Array)) return t
  // 数组长度为0
  if (arr.length <= 0) return t

  for (let i = 0; i < arr.length; i++) {
    let source = obj?.[arr[i]]
    if (_options.ignoreCase) {
      // 小写化的obj所有属性名
      const objKeysL = Object.keys(obj).map(v => v.toLowerCase())
      // 在[小写化的arr]中查找是否存在[小写化的obj属性名]
      const fdIndex = objKeysL.findIndex(v => v === arr[i].toLowerCase())
      if (fdIndex > -1) {
        if (_options.forceAssign && !validItem(source)) {
          source = _options.forceAssignValue ?? null
        }
        if (_options.transforIllegal) {
          t[arr[i]] = validItem(source) ? source : undefined
        } else {
          t[arr[i]] = source
        }
      } else if (_options.forceAssign) {
        // arr中属性名不存在于obj中，并且强制赋值arr中出现的属性名
        t[arr[i]] = _options.forceAssignValue ?? null
      } else {
        // arr中属性名不存在于obj中
        continue
      }
    } else {
      if (Object.prototype.hasOwnProperty.call(obj, arr[i])) {
        if (_options.forceAssign && !validItem(source)) {
          source = _options.forceAssignValue ?? null
        }
        if (_options.transforIllegal) {
          t[arr[i]] = validItem(source) ? source : undefined
        } else {
          t[arr[i]] = source
        }
      } else if (_options.forceAssign) {
        // arr中属性名不存在于obj中，并且强制赋值arr中出现的属性名
        t[arr[i]] = _options.forceAssignValue ?? null
      } else {
        // arr中属性名不存在于obj中
        continue
      }
    }
  }
  return t
}

export default pick
