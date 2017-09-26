var tableFeed = hx.dataTable.objectFeed({
  headers: [
    { name: 'Name', id: 'name' },
    { name: 'Age', id: 'age' },
    { name: 'Profession', id: 'profession' }
  ],
  rows: [
    {
      id: 0,
      cells: { 'name': 'Bob', 'age': 25, 'profession': 'Developer' }
    },
    {
      id: 1,
      cells: { 'name': 'Jan', 'age': 41, 'profession': 'Artist' }
    },
    {
      id: 2,
      cells: { 'name': 'Dan', 'age': 41, 'profession': 'Builder' }
    }
  ]
})

// Use the fluid api to append the content
hx.select('#advanced-search-example-container')
  .add(hx.dataTable({
    feed: tableFeed,
    filterEnabled: false, // Disable the normal filter
    showSearchAboveTable: true, // Show the search above the table instead of below
    advancedSearchEnabled: true // Enable the advanced search
  }))
