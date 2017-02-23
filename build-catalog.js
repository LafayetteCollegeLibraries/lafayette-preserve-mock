var fs = require('fs')

function arrayFind (arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    if (fn.call(arr[i], arr[i])) {
      return arr[i]
    }
  }

  return null
}

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

var facetsToUse = {
  'creator': 'Creator',
  'subject_lcsh': 'Subject (LCSH)',
  'subject_ocm': 'Subject (OCM)',
}

var facets = []

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

  Object.keys(facetsToUse).forEach(function (key) {
    if (!work[key])
      return

    var name = key + '_sim'

    work[key].forEach(function (value) {
      var found = false
      var idx = -1

      for (var f = 0; f < facets.length; f++) {
        if (facets[f].name === name) {
          idx = f
          break
        }
      }

      if (idx === -1) {
        facets.push({
          name: name,
          label: facetsToUse[key],
          items: []
        })

        idx = facets.length - 1
      }

      facets[idx].items.forEach(function (item) {
        if (item.value === value) {
          item.hits++
          found = true
        }
      })

      if (!found) {
        facets[idx].items.push({
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
