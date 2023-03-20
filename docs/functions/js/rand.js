/**
 * @description  : 整数
 * @param         {Number} min 最小值
 * @param         {Number} max 最大值
 * @return        {Number} 输出
 */
const int = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * @description  : 浮点数
 * @param         {Number} min 最小值
 * @param         {Number} max 最大值
 * @param         {Number} digits 小数后N位（默认两位）
 * @return        {Number} 输出
 */
const dec = (min, max, digits = 2) => {
  const t = Math.pow(10, digits)
  return Math.round((Math.random() * (max - min) + min) * t) / t
}

/**
 * @description  : 数组乱序
 * @param         {Array} array 数组
 * @return        {Array} 乱序后数组
 */
const arr = (arrayList = []) => {
	// 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
	return arrayList.sort(() => Math.random() - 0.5);
}

export default {
  int,
  dec,
	arr
}
