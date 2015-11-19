describe "List", ->

  it "contains nothing when initialsed",  ->
    list = new hx.List
    expect(list.entries()) .toEqual []

  it "size should be reported as 0 for a newly initialsed list",  ->
    list = new hx.List
    expect(list.size) .toEqual 0

  it "contains stuff when initialsed with a non empty array",  ->
    list = new hx.List([2, 3, 1])
    expect(list.entries()) .toEqual [2, 3, 1]

  it "size should be reported as non-zero for a list initialsed with a non empty array",  ->
    list = new hx.List([2, 3, 1])
    expect(list.size) .toEqual 3

  it "add should work",  ->
    list = new hx.List
    list.add 2
    list.add 4
    list.add 7
    expect(list.entries()) .toEqual [2, 4, 7]
    expect(list.size) .toEqual 3

  it "clear should work", ->
    list = new hx.List([8, 7, 6, 5])
    list.clear()
    expect(list.entries()) .toEqual []
    expect(list.size) .toEqual 0

  it "delete should work",  ->
    list = new hx.List([8, 7, 6, 5])
    list.delete 2
    expect(list.entries()) .toEqual [8, 7, 5]
    expect(list.size) .toEqual 3

  it "delete out of range should do nothing",  ->
    list = new hx.List([8, 7, 6, 5])
    list.delete 20000
    expect(list.entries()) .toEqual [8, 7, 6, 5]
    expect(list.size) .toEqual 4

  it "forEach should work",  ->
    list = new hx.List([3, 3, 2, 1, 3])
    items = []
    list.forEach (d) -> items.push d
    expect(items) .toEqual [3, 3, 2, 1, 3]

  it "forEach should work with a different this",  ->
    list = new hx.List([3, 3, 2, 1, 3])
    items = []
    list.forEach(((d) -> this.push d), items)
    expect(items) .toEqual [3, 3, 2, 1, 3]

  it "get should work",  ->
    list = new hx.List([3, 3, 2, 1, 3])
    expect(list.get(0)) .toEqual 3
    expect(list.get(2)) .toEqual 2
    expect(list.get(4)) .toEqual 3

  it "get should return undefined when out of bounds",  ->
    list = new hx.List([3, 3, 2, 1, 3])
    expect(list.get(-1)) .toEqual undefined
    expect(list.get(5)) .toEqual undefined
    expect(list.get(NaN)) .toEqual undefined

  it "has should work",  ->
    list = new hx.List([3, 3, 2, 1, 3])
    expect(list.has(-1)) .toEqual false
    expect(list.has(0)) .toEqual false
    expect(list.has(1)) .toEqual true
    expect(list.has(2)) .toEqual true
    expect(list.has(3)) .toEqual true
    expect(list.has(4)) .toEqual false
    expect(list.has(5)) .toEqual false
    expect(list.has(NaN)) .toEqual false

  it "remove should work",  ->
    list = new hx.List([3, 3, 2, 1, 3])
    list.remove 3
    expect(list.entries()) .toEqual [3, 2, 1, 3]
    expect(list.size) .toEqual 4

  it "removeAll should work",  ->
    list = new hx.List([3, 3, 2, 1, 3])
    list.removeAll 3
    expect(list.entries()) .toEqual [2, 1]
    expect(list.size) .toEqual 2

  it "remove should do nothing when it can't find any matching value",  ->
    list = new hx.List([3, 3, 2, 1, 3])
    list.remove 4
    expect(list.entries()) .toEqual [3, 3, 2, 1, 3]
    expect(list.size) .toEqual 5

  it "removeAll should do nothing when it can't find any matching value",  ->
    list = new hx.List([3, 3, 2, 1, 3])
    list.removeAll 4
    expect(list.entries()) .toEqual [3, 3, 2, 1, 3]
    expect(list.size) .toEqual 5

  it "values should return the same as entries", ->
    list = new hx.List([3, 2, 1])
    expect(list.values()) .toEqual list.entries()
    expect(list.values()) .toEqual [3, 2, 1]

  it "size should be correct after adding and removing several items",  ->
    list = new hx.List
    expect(list.size) .toEqual 0
    list.add 42
    expect(list.size) .toEqual 1
    list.add 43
    expect(list.size) .toEqual 2
    list.add 44
    expect(list.size) .toEqual 3
    list.add 45
    expect(list.size) .toEqual 4
    list.delete 0
    expect(list.size) .toEqual 3
    list.remove 44
    expect(list.size) .toEqual 2
    list.delete -1
    expect(list.size) .toEqual 2
    list.remove 44
    expect(list.size) .toEqual 2
    list.clear()
    expect(list.size) .toEqual 0

