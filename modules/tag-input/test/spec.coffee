describe 'tag-input', ->
  describe 'api', ->
    it 'items: initial value is correct', ->
      ti = new hx.TagInput(document.createElement('div'))
      expect(ti.items()).toEqual([])

    it 'items: setter/getter works',  ->
      ti = new hx.TagInput(document.createElement('div'))
      expect(ti.items()).toEqual([])
      expect(ti.items(["a", "b", "c"])).toEqual(ti)
      expect(ti.items()).toEqual(["a", "b", "c"])

    it 'remove: removes a tag',  ->
      ti = new hx.TagInput(document.createElement('div'))
      ti.items(["a", "b", "c"])
      ti.remove('a')
      expect(ti.items()).toEqual(["b", "c"])

    it 'remove: returns the number of items removed',  ->
      ti = new hx.TagInput(document.createElement('div'))
      ti.items(["a", "a", "b", "c"])
      expect(ti.remove('a')).toEqual(2)
      expect(ti.remove('b')).toEqual(1)

    it 'remove: without arguments removes all items',  ->
      ti = new hx.TagInput(document.createElement('div'))
      ti.items(["a", "a", "b", "c"])
      expect(ti.remove()).toEqual(["a", "a", "b", "c"])
      expect(ti.items()).toEqual([])

    it 'add: adds a tag',  ->
      ti = new hx.TagInput(document.createElement('div'))
      ti.items(["a", "b", "c"])
      ti.add('a')
      expect(ti.items()).toEqual(["a", "b", "c", "a"])

    it 'add: returns the right type',  ->
      ti = new hx.TagInput(document.createElement('div'))
      ti.items(["a", "b", "c"])
      expect(ti.add('a')).toEqual(ti)
