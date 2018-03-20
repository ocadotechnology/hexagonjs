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
hx.select('#advanced-criteria-example')
  .add(hx.dataTable({
    feed: tableFeed,
    filterEnabled: false, // Disable the normal filter
    advancedSearchEnabled: true, // Enable the advanced search
    advancedSearchCriteria: hx.filter.types(), // Enable all the filter types
    advancedSearch: [
      [
        {column: "age", term: "26", criteria: "greater"}
      ],
      [
        {column: "name", term: "Bob", criteria: "exact"}
      ]
    ]
  }))
