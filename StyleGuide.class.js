var Page = require('./Page.class.js')

/**
 * A StyleGuide object has a name and url, and a set of preset pages.
 * @type {StyleGuide}
 * @extends Page
 */
module.exports = (function () {
  // CONSTRUCTOR
  /**
   * Construct a StyleGuide object, given a name and url.
   * @constructor
   * @param {string} name the name of this styleguide
   * @param {string} url  the url of the landing page of this styleguide
   */
  function StyleGuide(name, url) {
    var self = this
    Page.call(self, { name: name, url: url })
    self._was_initialized = false
  }
  StyleGuide.prototype = Object.create(Page.prototype)
  StyleGuide.prototype.constructor = StyleGuide

  // ACCESSOR FUNCTIONS

  // METHODS
  /**
   * Initialize and add starting pages to this styleguide, then return it.
   *
   * Should be called every time `new StyleGuide()` is called,
   * but AFTER `.title()` and `.description()` are called on it.
   * This is because the pages initialized require the title
   * and description of this style guide. E.g. this is the proper order:
   * ```
   * var sg = new StyleGuide('Example Style Guide', '//example.com/style-guide/')
   *   .title('Style Guide of Example Dot Com')
   *   .description('A reference for standard styles at Example Dot Com.')
   *   .init()
   * ```
   * @return {StyleGuide} this styleguide
   */
  StyleGuide.prototype.init = function init() {
    var self = this
    if (!self._was_initialized) {
      self._was_initialized = true
      return self
        .add(new Page({ name: self.name(), url: 'index.html' })
          .description(self.description())
        )
        .add(new Page({ name: 'Visual Design', url: 'visual.html' })
          .description('Color and font schemes, look-and-feel, overall voice and tone.')
        )
        .add(new Page({ name: 'Base Typography', url: 'base.html' })
          .description('Bare, unstyled HTML elements. No classes.')
          .add(new Page({ name: 'Table of Contents'    , url: 'base.html#table-contents' }))
          .add(new Page({ name: 'Headings & Paragraphs', url: 'base.html#headings-paragraphs' }))
          .add(new Page({ name: 'Lists'                , url: 'base.html#lists' }))
          .add(new Page({ name: 'Tables'               , url: 'base.html#tables' }))
          .add(new Page({ name: 'Text-Level Elements'  , url: 'base.html#text-level-elements' })
            .add(new Page({ name: 'Links'        , url: 'base.html#links' }))
            .add(new Page({ name: 'Stress'       , url: 'base.html#stress' }))
            .add(new Page({ name: 'Documentation', url: 'base.html#documentation' }))
            .add(new Page({ name: 'Data'         , url: 'base.html#data' }))
          )
          .add(new Page({ name: 'Embedded Elements'   , url: 'base.html#embedded-elements' }))
          .add(new Page({ name: 'Forms'               , url: 'base.html#forms' }))
          .add(new Page({ name: 'Interactive Elements', url: 'base.html#interactive-elements' }))
        )
        .add(new Page({ name: 'Objects', url: 'obj.html' })
          .description('Patterns of structure that can be reused many times for many different purposes.')
        )
        .add(new Page({ name: 'Components', url: 'comp.html' })
          .description('Patterns of look-and-feel that are each only used for one purpose.')
        )
        .add(new Page({ name: 'Helpers', url: 'help.html' })
          .description('Somewhat explicit classes used for enhancing default styles.')
        )
        .add(new Page({ name: 'Atoms', url: 'atom.html' })
          .description('Very specific classes used for creating anomalies or fixing broken styles.')
        )
    } else return
  }

  // STATIC MEMBERS

  return StyleGuide
})()
