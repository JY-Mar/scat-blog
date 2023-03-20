import validItem from './validItem'

/**
 * @description  : 浮点相乘
 * @param         {*} a
 * @param         {*} b
 * @return        {*}
 */
const fMul = (a, b) => {
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
const fAdd = (a, b) => {
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
  return (fMul(a, e) + fMul(b, e)) / e
}

/**
 * @description  : 浮点相减
 * @param         {*} a
 * @param         {*} b
 * @return        {*}
 */
const fSub = (a, b) => {
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
  return (fMul(a, e) - fMul(b, e)) / e
}

/**
 * @description  : 浮点相除
 * @param         {*} a
 * @param         {*} b
 * @return        {*}
 */
const fDiv = (a, b) => {
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
  return fMul(c / d, Math.pow(10, f - e))
}

export default {
  fMul,
  fAdd,
  fSub,
  fDiv
}
