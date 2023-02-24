import clone from './clone'

/**
 * @description  : 从对象obj中去除数组arr中的元素名的对应属性及其属性值的键值对
 * @param         {*} obj
 * @param         {*} arr
 * @return        {*}
 */
const reject = (obj, arr) => {
  const t = clone(obj)
  if (!obj || !arr) return t
  // 非对象
  if (Object.prototype.toString.call(obj) !== '[object Object]') return t
  // 非数组
  if (!(arr instanceof Array)) return t
  // 数组长度为0
  if (arr.length <= 0) return t

  for (let i = 0; i < arr.length; i++) {
    if (Object.prototype.hasOwnProperty.call(obj, arr[i])) {
      delete t[arr[i]]
    }
  }
  return t
}

export default reject
