module.exports = (function () {
  // CONSTRUCTOR
  /**
   * A Page is an object with a name and url.
   * Both the name and url are immutable (cannot be changed).
   * The url is used as the page identifier; that is, no two pages within
   * the same structure may have the same url.
   * Construct a Page object, given a name and url.
   * @constructor
   * @param {Object} $pageinfo an object with `name` and `url` properties
   * @param {string} $pageinfo.name the name of this page
   * @param {string} $pageinfo.url the url (and ID) of this page
   */
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
  /**
   * Get the name of this page.
   * @return {string} the name of this page
   */
  Page.prototype.name = function name() {
    return this._NAME
  }

  /**
   * Get the url of this page.
   * @return {string} the url of this page
   */
  Page.prototype.url = function url() {
    return this._URL
  }

  /**
   * Set or get the title of this page.
   * Set the argument, if given, as the title, and return this page.
   * Otherwise, return the title of this page.
   * The `title` should be a more official and formal version of the `name`.
   * @param  {(function():string|string=)} arg the title to set, or function to call
   * @return {(Page|string)} this page || the title of this page
   */
  Page.prototype.title = function title(arg) {
    if (arguments.length) {
      this._title = (typeof arg === 'function') ? arg.call(this) : arg
      return this
    } else return this._title
  }

  /**
   * Set or get the description of this page.
   * Set the argument, if given, as the description, and return this page.
   * Otherwise, return the description of this page.
   * @param  {(function():string|string=)} arg the description to set, or function to call
   * @return {(Page|string)} this page || the description of this page
   */
  Page.prototype.description = function description(arg) {
    if (arguments.length) {
      this._description = (typeof arg === 'function') ? arg.call(this) : arg
      return this
    } else return this._description
  }

  /**
   * Set or get the keywords of this page.
   * Set the argument, if given, as the keywords, and return this page.
   * Otherwise, return the keywords of this page.
   * @param  {(function():string|Array<string>=)} arg the keywords to set, or function to call
   * @return {(Page|string)} this page || the keywords of this page
   */
  Page.prototype.keywords = function keywords(arg) {
    if (arguments.length) {
      this._keywords = (typeof arg === 'function') ? arg.call(this) : arg
      return this
    } else return this._keywords.slice()
  }

  /**
   * Hide or show this page.
   * @param  {boolean=true} bool hides or shows this page
   * @return {Page} this page
   */
  Page.prototype.hide = function hide(bool) {
    this._is_hidden = (arguments.length) ? bool : true
    return this
  }
  /**
   * Get the hidden status of this page.
   * @return {boolean} true if this page is hidden; false otherwise
   */
  Page.prototype.isHidden = function isHidden() {
    return this._is_hidden
  }

  // METHODS
  /**
   * Add a sub-page to this page.
   * A sub-page is another page acting a child of this page in a tree/hierarchy.
   * @param {Page} $page an instance of the Page class
   * @return {Page} this page
   */
  Page.prototype.add = function add($page) {
    this._pages.push($page)
    return this
  }

  /**
   * Remove a sub-page from this page.
   * @param  {(function():string|string)} arg the url of the page to remove, or function to call
   * @return {Page} this page
   */
  Page.prototype.remove = function remove(arg) {
    var index = this._pages.indexOf((function (self) {
      if (typeof arg === 'function') return arg.call(self)
      if (typeof arg === 'string')   return self.find(arg)
      return arg
    })(this))
    if (index >= 0) this._pages.splice(index, 1)
    return this
  }

  /**
   * Remove all sub-pages from this page.
   * @return {Page} this page
   */
  Page.prototype.removeAll = function removeAll() {
    this._pages = []
    return this
  }

  /**
   * Find and return a descendant of this page.
   * @param  {string} url the url of the page to find
   * @return {?Page} the page found, else `null`
   */
  Page.prototype.find = function find(url) {
    return this._pages.find(function (item) { return item._URL === url })
      || (function (self) {
        var ancestor = self._pages.find(function (item) { return item.find(url) })
        return (ancestor) ? ancestor.find(url) : null
      })(this)
  }

  /**
   * Return a shallow copy of all sub-pages of this page.
   *
   * This function is non-destructive. For example, assigning
   * `$page.findAll()[0] = null` will set the first element of
   * a shallow array to `null`, but will not affect the original children of `$page`.
   * @return {Array<Page>} a shallow array containing all sub-pages of this page
   */
  Page.prototype.findAll = function findAll() {
    return this._pages.slice()
  }

  // STATIC MEMBERS

  return Page
})()
