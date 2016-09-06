module.exports = (function () {
  // CONSTRUCTOR
  function Page($pageinfo) {
    var self = this
    $pageinfo = $pageinfo || {} // NOTE constructor overloading
    self._name = $pageinfo.name
    self._url  = $pageinfo.url
    self._title       = ''
    self._description = ''
    self._keywords    = []
    self._is_hidden   = false
    self.pages        = []
  }

  // ACCESSOR FUNCTIONS
  Page.prototype.name = function name() {
    return this._name
  }

  Page.prototype.url = function url() {
    return this._url
  }

  Page.prototype.title = function title(arg) {
    if (arguments.length) {
    this._title = (function () {
    var text
    if (typeof arg === 'function') {
      text = arg.call(this)
    } else {
      text = arg
    }
    return text
    })()
    return this
    } else {
    return this._title
    }
  }

  Page.prototype.description = function description(arg) {
    if (arguments.length) {
    this._description = (function () {
    var text
    if (typeof arg === 'function') {
      text = arg.call(this)
    } else {
      text = arg
    }
    return text
    })()
    return this
    } else {
      return this._description
    }
  }

  Page.prototype.keywords = function keywords(arg) {
    if (arguments.length) {
    this._keywords = (function () {
    var arr
    if (typeof arg === 'function') {
      arr = arg.call(this)
    } else {
      arr = arg
    }
    return arr
    })()
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
    this.pages.push($page)
    return this
  }
  Page.prototype.remove = function remove(arg) {
    var index = this.pages.indexOf((function () {
    var page
    if (typeof arg === 'function') {
      page = arg.call(this)
    } else if (typeof arg === 'string') {
      page = this.getPage(arg)
    } else {
      page = arg
    }
    return page
    })())
    if (index >= 0) this.pages.splice(index, 1)
    return this
  }
  Page.prototype.removeAll = function removeAll() {
    this.pages = []
    return this
  }
  Page.prototype.find = function find(url) {
    return this.pages.find(function (item) { return item._url === url })
      || (function (self) {
        var ancestor = self.pages.find(function (item) { return item.find(url) })
        return (ancestor) ? ancestor.find(url) : null
      })(this)
  }
  Page.prototype.findAll = function findAll() {
    return this.pages.slice()
  }

  // STATIC MEMBERS

  return Page
})()
