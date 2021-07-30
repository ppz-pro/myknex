exports.isString = function(tar) {
  return Object.prototype.toString.call(tar) == '[object String]'
}

exports.notString = function(tar) {
  return !exports.isString(tar)
}

exports.notArray = function(tar) {
  return !(tar instanceof Array)
}