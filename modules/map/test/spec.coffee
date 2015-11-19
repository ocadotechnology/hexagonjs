describe "hx-map", ->
  a = [1]

  it "size should distinguish between keys with the same toString", ->
    map = new hx.Map [[1, 'Bob'], ['1', 'Lazlo'], [a, 'Ganesh']]
    expect map.size
      .toEqual 3

  it "get should distinguish between keys with the same toString", ->
    map = new hx.Map [[1, 'Bob'], ['1', 'Lazlo'], [a, 'Ganesh']]
    expect map.get 1
      .toEqual 'Bob'
    expect map.get '1'
      .toEqual 'Lazlo'
    expect map.get a
      .toEqual 'Ganesh'

  it "delete should distinguish between keys with the same toString", ->
    map = new hx.Map [[1, 'Bob'], ['1', 'Lazlo'], [a, 'Ganesh']]
    map.delete 1
    expect map.size
      .toEqual 2
    expect map.entries()
      .toEqual [['1', 'Lazlo'], [a, 'Ganesh']]
    map.delete a
    expect map.size
      .toEqual 1
    expect map.entries()
      .toEqual [['1', 'Lazlo']]

  it "set should distinguish between keys with the same toString", ->
    map = new hx.Map [[1, 'Bob'], ['1', 'Ganesh']]
    map.set 1, 'Lazlo'
    expect map.entries()
      .toEqual [[1, 'Lazlo'], ['1', 'Ganesh']]

  it "has should distinguish between keys with the same toString", ->
    map = new hx.Map [[1, 'Bob'], [a, 'Ganesh']]
    expect map.has 1
      .toBeTruthy()
    expect map.has '1'
      .toBeFalsy()
    expect map.has a
      .toBeTruthy()

  it "contains nothing when initialsed",  ->
    map = new hx.Map
    expect(map.values()) .toEqual []

  it "contains stuff when initialsed with an array",  ->
    map = new hx.Map([['key', 'value'], ['key2', 123]])
    expect(map.entries()) .toEqual [['key', 'value'], ['key2', 123]]

  it "size should be reported as 0 for a newly initialsed map",  ->
    map = new hx.Map
    expect(map.size) .toEqual 0

  it "set should work",  ->
    map = new hx.Map
    map.set 'a', 5
    map.set 'b', 2
    map.set 'c', 7
    expect(map.entries()) .toEqual [['a', 5], ['b', 2], ['c', 7]]
    expect(map.size) .toEqual 3

  it "clear should work", ->
    map = new hx.Map
    [8, 7, 6, 5].forEach((d) -> map.set('' + d, d*2))
    map.clear()
    expect(map.values()) .toEqual []
    expect(map.size) .toEqual 0

  it "get should return undefined for previously defined value after clear is called", ->
    map = new hx.Map
    map.set('a', 42)
    expect(map.get('a')) .toEqual 42
    map.clear()
    expect(map.get('a')) .toEqual undefined

  it "delete should work",  ->
    map = new hx.Map
    [8, 7, 6, 5].forEach((d) -> map.set('' + d, d*2))
    map.delete '6'
    expect(map.entries()) .toEqual [['8', 16], ['7', 14], ['5', 10]]
    expect(map.size) .toEqual 3

  it "delete for non existant entry should do nothing",  ->
    map = new hx.Map
    [8, 7, 6, 5].forEach((d) -> map.set('' + d, d*2))
    map.delete 20000
    expect(map.entries()) .toEqual [['8', 16], ['7', 14], ['6', 12], ['5', 10]]
    expect(map.size) .toEqual 4

  it "forEach should work",  ->
    map = new hx.Map
    [3, 3, 2, 1, 3].forEach((d) -> map.set('' + d, d*2))
    keys = []
    values = []
    map.forEach (k, v) ->
      keys.push k
      values.push v
    expect(keys) .toEqual ['3', '2', '1']
    expect(values) .toEqual [6, 4, 2]

  it "forEach should work with a different this",  ->
    map = new hx.Map
    [3, 3, 2, 1, 3].forEach((d) -> map.set('' + d, d*2))
    keys = []
    values = []
    map.forEach(((k, v) -> this.push k), keys)
    map.forEach(((k, v) -> this.push v), values)
    expect(keys) .toEqual ['3', '2', '1']
    expect(values) .toEqual [6, 4, 2]

  it "has should work",  ->
    map = new hx.Map
    [3, 3, 2, 1, 3].forEach((d) -> map.set('' + d, d*2))
    expect(map.has('-1')) .toEqual false
    expect(map.has('0')) .toEqual false
    expect(map.has('1')) .toEqual true
    expect(map.has('2')) .toEqual true
    expect(map.has('3')) .toEqual true
    expect(map.has('4')) .toEqual false
    expect(map.has('5')) .toEqual false
    expect(map.has('NaN')) .toEqual false
    expect(map.has(NaN)) .toEqual false
    expect(map.has(undefined)) .toEqual false
    expect(map.has(null)) .toEqual false
    expect(map.has(0)) .toEqual false

  it "entries should return the correct values", ->
    map = new hx.Map
    [3, 2, 1].forEach((d) -> map.set('' + d, d*2))
    expect(map.entries()) .toEqual [['3', 6], ['2', 4], ['1', 2]]

  it "keys should return the correct values", ->
    map = new hx.Map
    [3, 2, 1].forEach((d) -> map.set('' + d, d*2))
    expect(map.keys()) .toEqual ['3', '2', '1']

  it "size should be correct after adding and removing several items",  ->
    map = new hx.Map
    expect(map.size) .toEqual 0
    map.set('a', 42)
    expect(map.size) .toEqual 1
    map.set('b', 43)
    expect(map.size) .toEqual 2
    map.set('b', 42)
    expect(map.size) .toEqual 2
    map.set('c', 44*2)
    expect(map.size) .toEqual 3
    map.set('d', 45*2)
    expect(map.size) .toEqual 4
    map.delete 'a'
    expect(map.size) .toEqual 3
    map.delete 'a'
    expect(map.size) .toEqual 3
    map.clear()
    expect(map.size) .toEqual 0

  it "overwriting keys should work",  ->
    map = new hx.Map
    map.set('a', 1)
    expect(map.get('a')) .toEqual 1
    map.set('a', 2)
    expect(map.get('a')) .toEqual 2

  it "using NaN as a key should work", ->
    map = new hx.Map
    map.set(NaN, 50)
    map.set('a', 54)
    expect(map.get(NaN)) .toEqual 50
    expect(map.keys()) .toEqual ['a', NaN]
    expect(map.entries()) .toEqual [['a', 54], [NaN, 50]]

  it "using NaN should update the size correctly", ->
    map = new hx.Map
    map.set(NaN, 50)
    map.set(NaN, 50)
    map.set('a', 52)
    expect(map.size) .toEqual 2
    map.delete(NaN)
    expect(map.size) .toEqual 1
