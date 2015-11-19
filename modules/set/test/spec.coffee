describe "hx-set", ->

  it "can be intialized using an array", ->
    set = new hx.Set [1, 2, 3]
    expect set.size
      .toEqual 3

  it "can contain things with the same toString", ->
    set = new hx.Set [1, "1"]
    expect set.size
      .toEqual 2
    expect set.has 1
      .toBeTruthy()
    expect set.has "1"
      .toBeTruthy()

  it "can distinguish things with the same toString when looking up", ->
    set = new hx.Set [1]
    expect set.has 1
      .toBeTruthy()
    expect set.has "1"
      .toBeFalsy()

  it "can choose the right thing to delete when the elements have the same toString", ->
    a = [1]
    set = new hx.Set [1, a, "1"]
    expect set.size
      .toEqual 3
    expect set.has 1
      .toBeTruthy()
    expect set.has "1"
      .toBeTruthy()
    expect set.has a
      .toBeTruthy()
    set.delete a
    expect set.has 1
      .toBeTruthy()
    expect set.has "1"
      .toBeTruthy()
    expect set.has a
      .toBeFalsy()


  it "contains nothing when initialsed",  ->
    set = new hx.Set
    expect(set.values()) .toEqual []

  it "contains stuff when initialsed with a non empty array",  ->
    list = new hx.Set([2, 3, 1])
    expect(list.values()) .toEqual [2, 3, 1]

  it "size should be reported as 0 for a newly initialsed set",  ->
    set = new hx.Set
    expect(set.size) .toEqual 0

  it "add should work",  ->
    set = new hx.Set
    set.add 2
    set.add 4
    set.add 7
    expect(set.values()) .toEqual [2, 4, 7]
    expect(set.size) .toEqual 3

  it "clear should work", ->
    set = new hx.Set
    [8, 7, 6, 5].forEach((d) -> set.add d)
    set.clear()
    expect(set.values()) .toEqual []
    expect(set.size) .toEqual 0

  it "delete should work",  ->
    set = new hx.Set
    [8, 7, 6, 5].forEach((d) -> set.add d)
    set.delete 6
    expect(set.values()) .toEqual [8, 7, 5]
    expect(set.size) .toEqual 3

  it "delete for non existant entry should do nothing",  ->
    set = new hx.Set
    [8, 7, 6, 5].forEach((d) -> set.add d)
    set.delete 20000
    expect(set.values()) .toEqual [8, 7, 6, 5]
    expect(set.size) .toEqual 4

  it "forEach should work",  ->
    set = new hx.Set
    [3, 3, 2, 1, 3].forEach((d) -> set.add d)
    items = []
    set.forEach (d) -> items.push d
    expect(items) .toEqual [3, 2, 1]

  it "forEach should work with a different this",  ->
    set = new hx.Set
    [3, 3, 2, 1, 3].forEach((d) -> set.add d)
    items = []
    set.forEach(((d) -> this.push d), items)
    expect(items) .toEqual [3, 2, 1]

  it "has should work",  ->
    set = new hx.Set
    [3, 3, 2, 1, 3].forEach((d) -> set.add d)
    expect(set.has(-1)) .toEqual false
    expect(set.has(0)) .toEqual false
    expect(set.has(1)) .toEqual true
    expect(set.has(2)) .toEqual true
    expect(set.has(3)) .toEqual true
    expect(set.has(4)) .toEqual false
    expect(set.has(5)) .toEqual false
    expect(set.has(NaN)) .toEqual false

  it "entries should return the same data as values (albeit duplicated)", ->
    set = new hx.Set
    [3, 2, 1].forEach((d) -> set.add d)
    expect(set.entries()) .toEqual set.values().map((d) -> [d, d])
    expect(set.values()) .toEqual [3, 2, 1]

  it "keys should return the same data as values", ->
    set = new hx.Set
    [3, 2, 1].forEach((d) -> set.add d)
    expect(set.keys()) .toEqual set.values()
    expect(set.keys()) .toEqual [3, 2, 1]

  it "size should be correct after adding and removing several items",  ->
    set = new hx.Set
    expect(set.size) .toEqual 0
    set.add 42
    expect(set.size) .toEqual 1
    set.add 43
    expect(set.size) .toEqual 2
    set.add 42
    expect(set.size) .toEqual 2
    set.add 44
    expect(set.size) .toEqual 3
    set.add 45
    expect(set.size) .toEqual 4
    set.delete 42
    expect(set.size) .toEqual 3
    set.delete 0
    expect(set.size) .toEqual 3
    set.clear()
    expect(set.size) .toEqual 0

  it "adding a value to a set repeatedly should have no effect", ->
    set = new hx.Set
    set.add(1)
    set.add(2)
    expect(set.size) .toEqual 2
    set.add(1)
    set.add(2)
    set.add(1)
    set.add(3)
    expect(set.size) .toEqual 3

  it "NaN should work", ->
    set = new hx.Set
    set.add(52)
    set.add(NaN)
    expect(set.keys()) .toEqual [52, NaN]

  it "using NaN should update the size correctly", ->
    set = new hx.Set
    set.add(NaN)
    set.add(52)
    expect(set.size) .toEqual 2
    set.delete(NaN)
    expect(set.size) .toEqual 1

