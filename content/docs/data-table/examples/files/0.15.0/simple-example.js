var table = new hx.DataTable('#example')
table.feed(hx.dataTable.objectFeed({
  headers: [
    {name: 'Name', id: 'name'},
    {name: 'Age', id: 'age'},
    {name: 'Profession', id: 'profession'}
  ],
  rows: [
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
}))
