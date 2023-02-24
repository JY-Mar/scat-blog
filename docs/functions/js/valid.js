import validItem from './validItem'

const valid = (...args) => {
  if ([undefined, null].includes(args)) {
    // 为空或未定义
    return false
  }
  if (Object.prototype.toString.call(args) !== '[object Array]') {
		return false
	} else if (args.length <= 0) {
		return false
	}
  let result = true
  for (const v of args) {
    if (!validItem(v)) {
      result = false
      break
    }
  }
  return result
}

export default valid
