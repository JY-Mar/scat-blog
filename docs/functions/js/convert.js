import validItem from './validItem'
import reject from './reject'
import merge from './merge'

/**
 * @description  : file转base64
 * @param         {File} file
 * @return        {*}
 */
const file2base64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

/**
 * @description  : blob转base64
 * @param         {Blob} blob
 * @return        {*} base64
 */
const blob2Base64 = blob => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = e => {
      resolve(e.target.result)
    }
    // readAsDataURL
    fileReader.readAsDataURL(blob)
    fileReader.onerror = () => {
      reject(new Error('blobToBase64 error'))
    }
  })
}

/**
 * @description  : 十六进制转RGBA
 * @param         {String} hex 十六进制，支持3位、4位、6位、8位
 * @param         {Number} opacity alpha通道值
 * @return        {*} RGBA
 */
const hex2rgba = (hex, opacity = 1) => {
  if (!validItem(hex)) return 'rgba(255, 255, 255, 1)'
  let RGBA = ''
  const toInt = str => {
    return parseInt(`0x${str}`)
  }
  const couple = str => {
    return toInt(`${str}${str}`)
  }
  const opa = str => {
    return Math.round(((255 - toInt(str)) / 255) * 100) / 100
  }
  if (hex.length > 0 && [4, 5, 7, 9].indexOf(hex.length) > -1) {
    switch (hex.slice(1, hex.length).length) {
      case 3:
        RGBA = `rgba(${couple(hex.slice(1, 2))},${couple(hex.slice(2, 3))},${couple(hex.slice(3, 4))},${opacity})`
        break
      case 4:
        RGBA = `rgba(${couple(hex.slice(1, 2))}},${couple(hex.slice(2, 3))},${couple(hex.slice(3, 4))},${opa(
          couple(hex.slice(4, 5))
        )})`
        break
      case 6:
        RGBA = `rgba(${toInt(hex.slice(1, 3))},${toInt(hex.slice(3, 5))},${toInt(hex.slice(5, 7))},${opacity})`
        break
      case 8:
        RGBA = `rgba(${toInt(hex.slice(1, 3))},${toInt(hex.slice(3, 5))},${toInt(hex.slice(5, 7))},${opa(
          hex.slice(7, 9)
        )})`
        break
      default:
        RGBA = 'rgba(255, 255, 255, 1)'
    }
  } else {
    RGBA = 'rgba(255, 255, 255, 1)'
  }
  return RGBA
}

/**
 * @description  : 驼峰转短横线
 * @param         {*} hump
 * @return        {*} 短横线Str
 */
const hump2Dash = hump => {
  const t = `${hump[0].toLowerCase()}${hump.slice(1, hump.length)}`
  return t.replace(/([A-Z])/g, '-$1').toLowerCase()
}

/**
 * @description  : 短横线转驼峰
 * @param         {*} dash
 * @return        {*} 驼峰Str
 */
const dash2Hump = dash => {
  let t = dash
  for (const match of t.match(/-(.)/g) || []) {
    t = t.replace(match, match.replace('-', '').toUpperCase())
  }
  if (/^[a-z]/.test(t)) {
    t = `${t[0].toUpperCase()}${t.slice(1, t.length)}`
  }
  return t
}

/**
 * @description  : 阿拉伯数字转中文数字
 * @param         {Number} num 阿拉伯数字
 * @return        {*} 中文数字
 */
const num2chn = num => {
  const t = num + ''
  if (t.length <= 0) return num
  const dict = { 0: '', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八', 9: '九' }
  if (t.length === 1) return dict[num]
  const unit = {
    0: '',
    1: '十',
    2: '百',
    3: '千',
    4: '万',
    5: '十万',
    6: '百万',
    7: '千万',
    8: '亿',
    9: '十亿',
    10: '百亿'
  }
  let temp = ''
  for (let i = 0; i < t.length; i++) {
    temp += `${dict[parseInt(t[i])]}${parseInt(t[i]) > 0 ? unit[t.length - 1 - i] : ''}`
    console.log(t[i])
  }
  return temp
}

/**
 * @description  : 时间戳转换
 * @param         {Date,String,long} timestamp 时间戳
 * @param         {String} formatStr 转换格式
 * @return        {*}
 */
const timestamp = (timestamp, formatStr = 'YYYY-MM-DD hh:mm:ss') => {
  if (!validItem(timestamp)) return timestamp
  const date = new Date(timestamp)
  const dateObj = {
    YYYY: date.getFullYear(),
    MM: date.getMonth() + 1,
    DD: date.getDate(),
    hh: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds()
  }
  const zero = val => {
    return val > 9 ? val : '0' + val
  }
  let tTime = formatStr
  for (const i in dateObj) {
    tTime = tTime.replace(i, zero(dateObj[i]))
  }
  return tTime
}

/**
 * @description  : 树形结构转一维数组
 * @param         {Object} tree
 * @param         {*} pid
 * @return        {*}
 */
let counter = 1
let list = []
const tree2list = (tree, pid = 0) => {
  if (pid === 0) {
    counter = 0
    list = []
  }
  const nowPid = pid
  for (let i = 0; i < tree.length; i++) {
    const tempComponent = tree[i]?.component + ''
    list.push(Object.assign(
      {
        parentId: nowPid,
        id: ++counter
      },
      reject(tree[i], ['children', 'permission']),
      {
        component: validItem(tempComponent.split('.vue"));')[0].split('bind(null, /*! @/views/')[1])
          ? tempComponent.split('.vue"));')[0].split('bind(null, /*! @/views/')[1].split(' */')[0]
          : tempComponent === '[object Object]' ? 'RouteView' : tempComponent
      }
    ))
    if (tree[i].hasOwnProperty('children') && validItem(tree[i]?.children)) {
      tree2list(tree[i].children, counter)
    } else if (tree.length - 1 === i) {
      if (list.length === 83) {
        // console.log(list)
        return list
      }
    }
  }
}

/**
 * @description  : 列表转树形结构
 * @param         {Array} list
 * @param         {Object} props
 * @return        {*}
 */
const list2tree = (list, props = { id: 'id', pid: 'pid' }) => {
  const treeData = []
  if (!Array.isArray(list)) return treeData

  list.forEach(item => {
    delete item.children
  })

  const map = {}
  list.forEach(item => {
    map[item[props.id]] = item
  })

  list.forEach(item => {
    const parent = map[item[props.pid]]
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      treeData.push(item)
    }
  })
  return treeData
}

/**
 * @description  : 压缩图片
 * @param        {File} file 文件
 * @param        {Number} width canvas宽，pixel
 * @param        {Number} quality 质量 0-1
 * @return       {*}
 */
const compressImg = (file, width = 750, quality = 0.9) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.onloadend = function (e) {
      let img = new Image()
      img.onload = function () {
        let canvasWidth = img.width // 图片原始长宽
        let canvasHeight = img.height
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        // 创建固定width宽度的图片，高度由原图片宽高比计算得出
        canvas.width = width
        canvas.height = (width * canvasHeight) / canvasWidth
        ctx.drawImage(img, 0, 0, width, (width * canvasHeight) / canvasWidth)
        canvas.toBlob(
          function (blob) {
            // 创建file文件
            let pressFile = new File([blob], file.name, {
              type: file.type,
            })
            Object.defineProperty(pressFile, 'path', {
              get: () => URL.createObjectURL(blob),
            })
            return resolve(pressFile)
          },
          file.type,
          quality // 图片质量，值0-1之间，可不填默
        )
      }
      img.src = e.target.result
    }
    // 读取 File 对象，然后触发 loadend 事件
    reader.readAsDataURL(file)
  })
}

/**
 * @description  : key-value键值对为数字-字符串/数字形式的转为数组
 * @param         {Object} obj 待转换Object对象
 * @param         {Object} defaultProps 配置 key,value
 * @return        {*}
 */
const object2array = (obj, defaultProps = { label: 'name', value: 'value' }) => {
  const tmp = []
  if (Object.prototype.toString.call(obj) !== '[object Object]') return tmp
  const keys = Object.keys(obj)
  if (keys.length <= 0) return tmp
  for (let i = 0; i < keys.length; i++) {
    const o = {}
    o[defaultProps.label] = obj[keys[i]]
    o[defaultProps.value] = keys[i]
    tmp.push(o)
  }
  return tmp
}

/**
 * @description  : 数组转为key-value键值对为数字-字符串/数字形式
 * @param         {Array} arr 要求arr内每一对象元素属性名相同
 * @param         {Object} defaultProps 配置 key,value
 * @return        {*}
 */
const array2object = (arr, defaultProps = { label: 'name', value: 'value' }) => {
  let tmp = {}
  if (Object.prototype.toString.call(arr) !== '[object Array]') return tmp
  if (arr.length <= 0) return tmp
  for (let i = 0; i < arr.length; i++) {
    const o = {}
    if (validItem(arr[i]?.[defaultProps.label])) {
      o[arr[i][defaultProps.label]] = arr[i]?.[defaultProps.value]
    }
    tmp = merge(tmp, o)
  }
  return tmp
}

export default {
  file2base64,
  blob2Base64,
  hex2rgba,
  hump2Dash,
  dash2Hump,
  num2chn,
  timestamp,
  tree2list,
  list2tree,
  compressImg,
  object2array,
  array2object
}
