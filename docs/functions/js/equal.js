import clone from './clone'

/**
 * @description  : 递归判断
 * @param         {*} a
 * @param         {*} b
 * @return        {*}
 */
const equal = (a, b) => {
  const [argA, argB] = [clone(a), clone(b)]
  if (Object.prototype.toString.call(argA) !== Object.prototype.toString.call(argB)) {
    // 两者类型不同则不相同
    return false
  } else {
    switch (Object.prototype.toString.call(argA)) {
      case '[object Number]': // number类型，数字/NaN
        if (isNaN(argA) && isNaN(argB)) {
          // 都为NaN，判断为值相同
          return true
        } else if (!isNaN(argA) && !isNaN(argB)) {
          // 都为数字且数值相同，判断为值相同
          return argA === argB
        } else {
          return false
        }
      case '[object String]':
        // 字符串完全相等
        return argA === argB
      case '[object Function]': // 基本类型function不做判断
      case '[object Undefined]': // 基本类型undefined不做判断
      case '[object Null]': // 基本类型null不做判断
      case '[object Promise]': // Promise不做判断
        return true
      case '[object Object]':
        // 取出属性名，判断是否相同
        const [keysA, keysB] = [Object.keys(argA) || [], Object.keys(argB) || []]
        keysA.sort()
        keysB.sort()
        if (keysA.length !== keysB.length) {
          // 属性数量不相等
          return false
        } else if (keysA.length <= 0) {
          // 无属性值
          return true
        } else {
          for (let i = 0; i < keysA.length; i++) {
            if (keysA[i] !== keysB[i]) {
              return false
            } else {
              // 递归判断每一个属性值是否嵌套
              if (!equal(argA[keysA[i]], argB[keysB[i]])) return false
            }
          }
          return true
        }
      case '[object Array]':
        if (argA.length !== argB.length) {
          // 数组长度不相等
          return false
        } else if (argA.length <= 0) {
          // 数组无元素
          return true
        } else {
          const [arrA, arrB] = [clone(argA), clone(argB)]
          // 遇到数组可能因乱序导致判断出错，所以需要先排序（但不能影响原数组）
          arrA.sort()
          arrB.sort()
          for (let i = 0; i < arrA.length; i++) {
            // 递归判断每一个属性值是否嵌套
            if (!equal(arrA[i], arrB[i])) return false
          }
          return true
        }
      case '[object Symbol]':
        return argA.toString() === argB.toString()
      default:
        return false
    }
  }
}

export default equal
