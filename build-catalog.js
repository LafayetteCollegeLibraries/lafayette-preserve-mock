var fs = require('fs')

var docs = [
  require('./public/data/generic_work_postcard.json'),
  require('./public/data/generic_work_print.json'),
]

var fieldsToRemove = [
  'create_date',
  'modified_date',
  'head',
  'tail',
  'depositor',
  'date_uploaded',
  'date_modified',
  'owner',
  'label',
  'relative_path',
  'import_url',
  'part_of',
  'resource_type',
]

var facetKeys = [
  'creator',
  'subject_lcsh',
  'subject_ocm',
]

var facets = {}

var pages = {
  current_page: 1,
  next_page: null,
  prev_page: null,
  total_pages: 1,
  limit_value: docs.length,
  offset_value: 0,
  total_count: docs.length,
  'first_page?': true,
  'last_page?': true,
}

for (var i = 0; i < docs.length; i++) {
  var work = docs[i]

  fieldsToRemove.forEach(function (field) {
    delete work[field]
  })

  work.form = []
  work.score = 1

  facetKeys.forEach(function (key) {
    if (!work[key])
      return

    var facetKey = key + '_sim'

    work[key].forEach(function (value) {
      var found = false

      if (facets[facetKey]) {
        facets[facetKey].forEach(function (facet) {
          if (found)
            return

          if (facet.value === value) {
            facet.hits++
            found = true
          }
        })
      } else {
        facets[facetKey] = []
      }

      if (!found) {
        facets[facetKey].push({
          value: value,
          hits: 1,
          label: value,
        })
      }
    })
  })
}

var output = {
  response: {
    docs: docs,
    facets: facets,
    pages: pages,
  }
}

fs.writeFileSync(__dirname + '/public/data/catalog.json', JSON.stringify(output, true, 2))
