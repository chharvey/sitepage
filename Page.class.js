module.exports = (function () {
  // CONSTRUCTOR
  function Page($pageinfo) {
    var self = this
    $pageinfo = $pageinfo || {} // NOTE constructor overloading
    self._NAME = $pageinfo.name
    self._URL  = $pageinfo.url
    self._title       = ''
    self._description = ''
    self._keywords    = []
    self._is_hidden   = false
    self._pages       = []
  }

  // ACCESSOR FUNCTIONS
  Page.prototype.name = function name() {
    return this._NAME
  }

  Page.prototype.url = function url() {
    return this._URL
  }

  Page.prototype.title = function title(arg) {
    if (arguments.length) {
      this._title = (function (self) {
        var text;
        if (typeof arg === 'function') {
          text = arg.call(self)
        } else {
          text = arg
        }
        return text
      })(this)
      return this
    } else {
      return this._title
    }
  }

  Page.prototype.description = function description(arg) {
    if (arguments.length) {
      this._description = (function (self) {
        var text;
        if (typeof arg === 'function') {
          text = arg.call(self)
        } else {
          text = arg
        }
        return text
      })(this)
      return this
    } else {
      return this._description
    }
  }

  Page.prototype.keywords = function keywords(arg) {
    if (arguments.length) {
      this._keywords = (function (self) {
        var arr;
        if (typeof arg === 'function') {
          arr = arg.call(self)
        } else {
          arr = arg
        }
        return arr
      })(this)
      return this
    } else {
      return this._keywords.slice()
    }
  }

  Page.prototype.hide = function hide(bool) {
    this._is_hidden = (arguments.length) ? bool : true
    return this
  }
  Page.prototype.isHidden = function isHidden() {
    return this._is_hidden
  }

  // METHODS
  Page.prototype.add = function add($page) {
    this._pages.push($page)
    return this
  }
  Page.prototype.remove = function remove(arg) {
    var index = this._pages.indexOf((function (self) {
      var page
      if (typeof arg === 'function') {
        page = arg.call(self)
      } else if (typeof arg === 'string') {
        page = self.find(arg)
      } else {
        page = arg
      }
      return page
    })(this))
    if (index >= 0) this._pages.splice(index, 1)
    return this
  }
  Page.prototype.removeAll = function removeAll() {
    this._pages = []
    return this
  }
  Page.prototype.find = function find(url) {
    return this._pages.find(function (item) { return item._URL === url })
      || (function (self) {
        var ancestor = self._pages.find(function (item) { return item.find(url) })
        return (ancestor) ? ancestor.find(url) : null
      })(this)
  }
  Page.prototype.findAll = function findAll() {
    return this._pages.slice()
  }

  // STATIC MEMBERS

  return Page
})()
