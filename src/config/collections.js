/**
 * Add Eleventy collections here
 * https://www.11ty.dev/docs/collections/
*/

module.exports = {
  panels: function (collection) {
      return collection.getFilteredByGlob("src/panels/*.md")
        .sort((a, b) => b.data.order - a.data.order);
  },

  pages: function (collection) {
    return collection.getFilteredByGlob("src/pages/*.md")
  }
}
