let timeout = null

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 * 立即执行：即多次触发事件，第一次会立即执行函数，之后在设定wait事件内触犯的事件无效，不会执行。
 * 非立即执行函数： 多次触发事件，只会在最后一次触发事件后等待设定的wait时间结束时执行一次。
 * 
 * @description  : 防抖
 * @param         {Function} func 要执行的回调函数
 * @param         {Number} wait 延时的时间
 * @param         {Boolean} immediate 是否立即执行。即多次触发事件，第一次会立即执行函数，之后在设定wait事件内触犯的事件无效，不会执行。（非立即执行：多次触发事件，只会在最后一次触发事件后等待设定的wait时间结束时执行一次。）
 * @return        {*}
 */
const debounce = (func, wait = 500, immediate = false) => {
  // 如果timeout不为null, 清除定时器
  if (timeout !== null) clearTimeout(timeout)
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout
    // 定义wait时间后把timeout变为null
    // 即在wait时间之后事件才会有效
    timeout = setTimeout(() => {
      timeout = null
    }, wait)
    // 如果callNow为true,即原本timer为null
    // 那么执行func函数
    if (callNow) typeof func === 'function' && func()
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(() => {
      typeof func === 'function' && func()
    }, wait)
  }
}

export default debounce
