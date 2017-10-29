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
    $pageinfo = $pageinfo || {} // NOTE constructor overloading
    this._NAME = $pageinfo.name
    this._URL  = $pageinfo.url
    this._title       = ''
    this._description = ''
    this._keywords    = []
    this._is_hidden   = false
    this._pages       = []
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
   * Add a subpage to this page, at the specified index.
   * If no index is given, the subpage will be added to the end.
   * Otherwise, the index acts as the first argument of
   * [Array.prototype.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice).
   * A subpage is another page acting a child of this page in a tree/hierarchy.
   * @param {Page} $page the Page object to add as a child of this page
   * @param {number=} index index at which to insert the subpage, pushing subsequent subpages forward by 1
   * @return {Page} this page
   */
  Page.prototype.add = function add($page, index = this._pages.length) {
    this._pages.splice(index, 0, $page)
    return this

    // Equivalent:
    // if (typeof index === 'number') {
    //   this._pages.splice(index, 0, $page)
    // } else {
    //   this._pages.push($page)
    // }
    // return this
  }

  /**
   * Remove a subpage from this page.
   * @param  {(function():Page|string|Page)} arg the url of the subpage to remove, or function to call, or actual Page object
   * @return {Page} this page
   */
  Page.prototype.remove = function remove(arg) {
    var index = this._pages.indexOf((function () {
      if (typeof arg === 'function') return arg.call(this)
      if (typeof arg === 'string')   return this.find(arg)
      return arg
    }).call(this))
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
    return this._pages.find((item) => item._URL === url)
      || (function () {
        var descendant = this._pages.find((item) => item.find(url))
        return (descendant) ? descendant.find(url) : null
      }).call(this)
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
