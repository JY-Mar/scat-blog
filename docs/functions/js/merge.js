import clone from './clone'

/**
 * @description  : 递归实现对象深度合并
 * @param         {*} target
 * @param         {*} source
 * @return        {*}
 */
const deepMerge = (target = {}, source = {}) => {
  target = clone(target)
  // if (typeof target !== 'object' || typeof source !== 'object') return false
  if (Object.prototype.toString.call(target) !== '[object Object]' || Object.prototype.toString.call(source) !== '[object Object]') return false
  for (var prop in source) {
    if (!Object.prototype.hasOwnProperty.call(source, prop)) continue
    if (prop in target) {
      // if (typeof target[prop] !== 'object') {
      if (Object.prototype.toString.call(target[prop]) !== '[object Object]') {
        target[prop] = source[prop]
      } else {
        // if (typeof source[prop] !== 'object') {
        if (Object.prototype.toString.call(source[prop]) !== '[object Object]') {
          target[prop] = source[prop]
        } else {
          if (target[prop]?.concat && source[prop]?.concat) {
            target[prop] = target[prop].concat(source[prop])
          } else {
            target[prop] = deepMerge(target[prop], source[prop])
          }
        }
      }
    } else {
      target[prop] = source[prop]
    }
  }
  return target
}

/**
 * @description  : 递归实现对象深度合并支持多参数
 * @param         {*} target
 * @param         {*} source
 * @return        {*}
 */
const merge = (...args) => {
  if (Object.prototype.toString.call(args) !== '[object Array]') {
    return {}
  } else if (args.length < 2) {
    return args?.[0] || {}
  }
  var result = {}
  for (let i = 0; i < args.length; i++) {
    // if (typeof args[i] !== 'object') continue
    if (Object.prototype.toString.call(args[i]) !== '[object Object]') continue
    result = deepMerge(result, args[i])
  }
  return result
}

export default merge
