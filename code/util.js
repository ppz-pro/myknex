module.exports = {
  isString(tar){
    return Object.prototype.toString.call(tar) == '[object String]'
  },
  isNumber(tar){
    return Object.prototype.toString.call(tar) == '[object Number]'
  }
}