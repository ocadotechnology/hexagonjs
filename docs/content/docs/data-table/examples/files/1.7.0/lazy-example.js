var finalSize = undefined
var backendRows = [
  {
    id: 0, // hidden details can go here (not in the cells object)
    cells: {'name': 'Bob', 'age': 25, 'profession': 'Developer'}
  },
  {
    id: 1,
    cells: {'name': 'Jan', 'age': 41, 'profession': 'Artist'}
  },
  {
    id: 2,
    cells: {'name': 'Dan', 'age': 41, 'profession': 'Builder'}
  }
]

new hx.DataTable('#lazy-example', {
  pageSize: 2,
  pageSizeOptions: [1, 2, 3, 10],
  filterEnabled: false,
  feed: {
    headers: function (cb) {
      return cb([
        {name: 'Name', id: 'name'},
        {name: 'Age', id: 'age'},
        {name: 'Profession', id: 'profession'}
      ])
    },
    rows: function (range, cb) {
      return cb({
        rows: backendRows.slice(range.start, range.end + 1),
        filteredCount: (finalSize !== undefined || range.end >= 2) ? finalSize = 3 : undefined
      })
    },
    totalCount: function (cb) {
      return cb(undefined)
    }
  }
}).render()
