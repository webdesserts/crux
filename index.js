module.exports = {
  create: function create () {
    var obj = Object.create(this)
    obj.init.apply(obj, arguments);
    return obj
  },

  extend: function extend () {
    return Object.create(this)
  },

  init: function () {},

  get proto() { return Object.getPrototypeOf(this) },
  set proto(obj) {
    if (Object.setPrototypeOf) Object.setPrototypeOf(this, obj);
    else this.__proto__ = obj
  }
}
