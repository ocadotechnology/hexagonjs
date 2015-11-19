describe 'Selection Api', ->

  beforeEach ->
    fixture = hx.select('body').append('div').attr('id', 'fixture').html """
      <div class="wrapper">
        <div id="outer-1">
          <span class="first one"></span>
          <span class="one two"></span>
          <span class="two"></span>
          <span></span>
        </div>
        <div id="outer-2">
          <span class="one"></span>
          <span class="one two"></span>
          <span class="two"></span>
        </div>
        <div id="before-empty"></div><div id="empty"></div><div id="after-empty">
        <div id="text-node">text1</div>
        <div id="html-node"><p>text1</p></div>
        <input value="initial-value"></input>
        <div id="multi">
          <div></div>
          <div></div>
        </div>
      </div>
    """

    hx.select('#fixture').selectAll('span').style('display', 'block').style('display')
    hx.select('#fixture').select('span').style('display', 'inline-block').style('display')

    spyOn(console, 'warn')

  afterEach ->
    hx.select('#fixture').remove()

  describe 'ElementSet', ->

    it 'should add an element', ->
      s = new hx._.selection.ElementSet
      el = document.createElement('div')
      s.add(el)
      expect(s.elements.has(el)).toEqual(true)
      expect(s.ids.size).toEqual(1)

    it 'should not add an item twice', ->
      s = new hx._.selection.ElementSet
      el = document.createElement('div')
      s.add(el)
      s.add(el)
      expect(s.elements.has(el)).toEqual(true)
      expect(s.ids.size).toEqual(1)

    it 'should remove an element', ->
      s = new hx._.selection.ElementSet
      el = document.createElement('div')
      s.add(el)
      expect(s.elements.has(el)).toEqual(true)
      expect(s.ids.size).toEqual(1)
      s.remove(el)
      expect(s.elements.has(el)).toEqual(false)
      expect(s.ids.size).toEqual(0)

    it 'should not do anything if you try and remove an element not in the set', ->
      s = new hx._.selection.ElementSet
      el = document.createElement('div')
      el2 = document.createElement('div')
      s.add(el)
      expect(s.elements.has(el)).toEqual(true)
      expect(s.ids.size).toEqual(1)
      s.remove(el2)
      expect(s.elements.has(el)).toEqual(true)
      expect(s.ids.size).toEqual(1)

    it 'should not do strange things if you remove an element that exists in another set', ->
      s = new hx._.selection.ElementSet
      s2 = new hx._.selection.ElementSet
      el = document.createElement('div')
      s.add(el)
      expect(s.elements.has(el)).toEqual(true)
      expect(s.ids.size).toEqual(1)
      expect(s2.elements.has(el)).toEqual(false)
      expect(s2.ids.size).toEqual(0)
      s2.remove(el)
      expect(s.elements.has(el)).toEqual(true)
      expect(s.ids.size).toEqual(1)
      expect(s2.elements.has(el)).toEqual(false)
      expect(s2.ids.size).toEqual(0)

    it 'should correctly report the elements in the set', ->
      s = new hx._.selection.ElementSet
      el1 = document.createElement('div')
      el2 = document.createElement('div')
      s.add(el1)
      s.add(el2)
      expect(s.entries()).toEqual([el1, el2])

    it 'should return correctly for has', ->
      s = new hx._.selection.ElementSet
      el1 = document.createElement('div')
      el2 = document.createElement('div')
      el3 = document.createElement('div')
      s.add(el1)
      s.add(el2)
      expect(s.has(el1)).toEqual(true)
      expect(s.has(el2)).toEqual(true)
      expect(s.has(el3)).toEqual(false)

  # selection

  it 'hx.select an element by id', ->
    selection = hx.select('#fixture').select('#outer-1')
    expect(selection.size()).toEqual(1)
    expect(selection.node().tagName.toLowerCase()).toEqual('div')

  it 'hx.select element by class', ->
    selection = hx.select('#fixture').select('.one')
    expect(selection.size()).toEqual(1)
    expect(selection.node().tagName.toLowerCase()).toEqual('span')

  it 'hx.select element by tag', ->
    selection = hx.select('#fixture').select('span')
    expect(selection.size()).toEqual(1)
    expect(selection.class()).toEqual('first one')
    expect(selection.node().tagName.toLowerCase()).toEqual('span')

  it 'hx.selectAll elements by id', ->
    selection = hx.select('#fixture').selectAll('#outer-1')
    expect(selection.size()).toEqual(1)
    expect(selection.node().tagName.toLowerCase()).toEqual('div')

  it 'hx.selectAll elements by class', ->
    selection = hx.select('#fixture').selectAll('.one')
    expect(selection.size()).toEqual(4)
    expect(selection.node().tagName.toLowerCase()).toEqual('span')

  it 'hx.selectAll elements by tag', ->
    selection = hx.select('#fixture').selectAll('span')
    expect(selection.size()).toEqual(7)
    expect(selection.node().tagName.toLowerCase()).toEqual('span')

  it 'select then selectAll should result in singleSelection being false', ->
    selection = hx.select('#fixture').selectAll('span')
    expect(selection.singleSelection).toEqual(false)

  it 'select then selectAll should result in singleSelection being false', ->
    selection = hx.select('#fixture').selectAll('div').select('span')
    expect(selection.singleSelection).toEqual(false)

  it 'select alone should result in singleSelection being true', ->
    selection = hx.select('#fixture')
    expect(selection.singleSelection).toEqual(true)

  it 'select alone should result in singleSelection being true', ->
    selection = hx.select('#fixture')
    expect(selection.singleSelection).toEqual(true)

  it 'hx.select should log a warning if an invalid type is given', ->
    hx.select(3.14156)
    expect(console.warn).toHaveBeenCalled()

  it 'hx.selectAll should log a warning if an invalid type is given', ->
    hx.selectAll(3.14156)
    expect(console.warn).toHaveBeenCalled()

  it 'selection.select should log a warning if an invalid type is given', ->
    hx.select('#fixture').select(3.1415)
    expect(console.warn).toHaveBeenCalled()

  it 'selection.selectAll should log a warning if an invalid type is given', ->
    hx.select('#fixture').selectAll(3.1415)
    expect(console.warn).toHaveBeenCalled()

  # creating detached elements

  it 'hx.detached creates a detached div', ->
    selection = hx.detached('div')
    expect(selection.size()).toEqual(1)
    expect(selection.node().tagName.toLowerCase()).toEqual('div')

  it 'hx.detached creates a correctly namespaced svg', ->
    selection = hx.detached('svg')
    expect(selection.size()).toEqual(1)
    expect(selection.node().tagName.toLowerCase()).toEqual('svg')
    expect(selection.node().namespaceURI).toEqual('http://www.w3.org/2000/svg')

  it 'hx.detached creates a correctly namespaced span', ->
    selection = hx.detached('span')
    expect(selection.size()).toEqual(1)
    expect(selection.node().tagName.toLowerCase()).toEqual('span')
    expect(selection.node().namespaceURI).toEqual('http://www.w3.org/1999/xhtml')

  # filtering
  it 'filter should work', ->
    selection = hx.select('#fixture').selectAll('span')
    expect(selection.filter((selection) -> selection.classed('one')).size()).toEqual(4)
    expect(selection.filter((selection) -> selection.classed('one')).class()).toEqual([
      "first one",
      "one two",
      "one",
      "one two"
    ])

  # mapping
  it 'map should work', ->
    selection = hx.select('#fixture').selectAll('span')
    expect(selection.map((selection) -> selection.classed('one'))).toEqual([true, true, false, false, true, true, false])

  # each
  # it 'each should work', ->
  #   selection = hx.select('#fixture').selectAll('span')
  #   iis = []
  #   nodes = []

  #   selection.each (node, i) ->
  #     iis.push i
  #     nodes.push node

  #   expect(nodes).toEqual(selection.nodes)
  #   expect(iis).toEqual(hx.range(selection.size()))

  # appending
  it 'append an element by tag name', ->
    selection = hx.select('#empty')
    appended = selection.append('h1')
    expect(appended.size()).toEqual(1)
    expect(appended.node().tagName.toLowerCase()).toEqual('h1')
    expect(appended.node().parentNode).toEqual(selection.node())

  if navigator.userAgent.indexOf("PhantomJS") is -1
    it 'appending svg should have a different namespace', ->
      selection = hx.select('#empty')
      appended = selection.append('svg')
      expect(appended.size()).toEqual(1)
      expect(appended.node().tagName.toLowerCase()).toEqual('svg')
      expect(appended.node().parentNode).toEqual(selection.node())
      expect(appended.node().namespaceURI).toEqual('http://www.w3.org/2000/svg')

  it 'append an array of selections', ->
    items = for i in [0...5]
      hx.detached('div')

    selection = hx.select('#empty')
    appended = selection.append(items)
    appended.size().should.equal(5)
    appended.node().parentNode.should.equal(selection.node())



  it 'append an element by tag name to multiple elements', ->
    selection = hx.select('#fixture').selectAll('span')
    appended = selection.append('h1')
    expect(appended.size()).toEqual(7)
    expect(appended.node().tagName.toLowerCase()).toEqual('h1')

  it 'append an existing element to multiple elements should log a warning', ->
    selection = hx.select('#fixture').selectAll('span')
    appended = selection.append(document.createElement('h1'))
    expect(appended.size()).toEqual(0)
    expect(console.warn).toHaveBeenCalled()

  it 'appending an existing element to an empty selection should do nothing', ->
    selection = hx.select('#empty').select('span')
    appended = selection.append(document.createElement('h1'))
    expect(appended.size()).toEqual(0)

  it 'append an existing element', ->
    selection = hx.select('#empty')
    element = document.createElement('h1')
    appended = selection.append(element)
    expect(appended.size()).toEqual(1)
    expect(appended.node().tagName.toLowerCase()).toEqual('h1')
    expect(appended.node()).toEqual(element)
    expect(appended.node().parentNode).toEqual(selection.node())

  it 'append an array of elements by tag name', ->
    selection = hx.select('#empty')
    appended = selection.append(['h1', 'h2'])
    expect(appended.size()).toEqual(2)
    expect(appended.node(0).tagName.toLowerCase()).toEqual('h1')
    expect(appended.node(0).parentNode).toEqual(selection.node())
    expect(appended.node(1).tagName.toLowerCase()).toEqual('h2')
    expect(appended.node(1).parentNode).toEqual(selection.node())

  it 'append an array of existing elements', ->
    selection = hx.select('#empty')
    elements  = [
      document.createElement('h1'),
      document.createElement('h2')
    ]
    appended = selection.append(elements)
    expect(appended.size()).toEqual(2)
    expect(appended.node(0).tagName.toLowerCase()).toEqual('h1')
    expect(appended.node(0).parentNode).toEqual(selection.node())
    expect(appended.node(0)).toEqual(elements[0])
    expect(appended.node(1).tagName.toLowerCase()).toEqual('h2')
    expect(appended.node(1).parentNode).toEqual(selection.node())
    expect(appended.node(1)).toEqual(elements[1])

  it 'append a selection', ->
    selection = hx.select('#empty')
    select  = hx.selectAll([
      document.createElement('h1'),
      document.createElement('h2')
    ])
    elements = select.nodes
    appended = selection.append(select)
    expect(appended.size()).toEqual(2)
    expect(appended.node(0).tagName.toLowerCase()).toEqual('h1')
    expect(appended.node(0).parentNode).toEqual(selection.node())
    expect(appended.node(0)).toEqual(elements[0])
    expect(appended.node(1).tagName.toLowerCase()).toEqual('h2')
    expect(appended.node(1).parentNode).toEqual(selection.node())
    expect(appended.node(1)).toEqual(elements[1])

  # prepending
  it 'prepend an element by tag name', ->
    selection = hx.select('#empty')
    prepended = selection.prepend('h1')
    expect(prepended.size()).toEqual(1)
    expect(prepended.node().tagName.toLowerCase()).toEqual('h1')
    expect(prepended.node().parentNode).toEqual(selection.node())

  it 'prepend an existing element', ->
    selection = hx.select('#empty')
    element = document.createElement('h1')
    prepended = selection.prepend(element)
    expect(prepended.size()).toEqual(1)
    expect(prepended.node().tagName.toLowerCase()).toEqual('h1')
    expect(prepended.node()).toEqual(element)
    expect(prepended.node().parentNode).toEqual(selection.node())

  it 'prepend an array of elements by tag name', ->
    selection = hx.select('#empty')
    prepended = selection.prepend(['h1', 'h2'])
    expect(prepended.size()).toEqual(2)
    expect(prepended.node(0).tagName.toLowerCase()).toEqual('h1')
    expect(prepended.node(0).parentNode).toEqual(selection.node())
    expect(prepended.node(1).tagName.toLowerCase()).toEqual('h2')
    expect(prepended.node(1).parentNode).toEqual(selection.node())

  it 'prepend an array of existing elements', ->
    selection = hx.select('#empty')
    elements  = [
      document.createElement('h1'),
      document.createElement('h2')
    ]
    prepended = selection.prepend(elements)
    expect(prepended.size()).toEqual(2)
    expect(prepended.node(0).tagName.toLowerCase()).toEqual('h1')
    expect(prepended.node(0).parentNode).toEqual(selection.node())
    expect(prepended.node(0)).toEqual(elements[0])
    expect(prepended.node(1).tagName.toLowerCase()).toEqual('h2')
    expect(prepended.node(1).parentNode).toEqual(selection.node())
    expect(prepended.node(1)).toEqual(elements[1])

  it 'prepend a selection', ->
    selection = hx.select('#empty')
    select  = hx.selectAll([
      document.createElement('h1'),
      document.createElement('h2')
    ])
    elements = select.nodes
    appended = selection.prepend(select)
    expect(appended.size()).toEqual(2)
    expect(appended.node(0).tagName.toLowerCase()).toEqual('h1')
    expect(appended.node(0).parentNode).toEqual(selection.node())
    expect(appended.node(0)).toEqual(elements[0])
    expect(appended.node(1).tagName.toLowerCase()).toEqual('h2')
    expect(appended.node(1).parentNode).toEqual(selection.node())
    expect(appended.node(1)).toEqual(elements[1])

  # insert before
  it 'insertBefore an element by tag name', ->
    selection = hx.select('#empty')
    inserted = selection.insertBefore('h1')
    expect(inserted.size()).toEqual(1)
    expect(inserted.node().tagName.toLowerCase()).toEqual('h1')
    expect(inserted.node()).toEqual(hx.select('#before-empty').node().nextSibling)

  it 'insertBefore an existing element', ->

    selection = hx.select('#empty')
    element = document.createElement('h1')
    inserted = selection.insertBefore(element)
    expect(inserted.size()).toEqual(1)
    expect(inserted.node().tagName.toLowerCase()).toEqual('h1')
    expect(inserted.node()).toEqual(element)
    expect(inserted.node()).toEqual(hx.select('#before-empty').node().nextSibling)

  it 'insertBefore an array of elements by tag name', ->
    selection = hx.select('#empty')
    inserted = selection.insertBefore(['h1', 'h2'])
    expect(inserted.size()).toEqual(2)
    expect(inserted.node(0).tagName.toLowerCase()).toEqual('h1')
    expect(inserted.node(0)).toEqual(hx.select('#before-empty').node().nextSibling)
    expect(inserted.node(1).tagName.toLowerCase()).toEqual('h2')
    expect(inserted.node(1).parentNode).toEqual(hx.select('#fixture').select('.wrapper').node())
    expect(inserted.node(1)).toEqual(hx.select('#before-empty').node().nextSibling.nextSibling)

  it 'insertBefore an array of existing elements', ->
    selection = hx.select('#empty')
    elements  = [
      document.createElement('h1'),
      document.createElement('h2')
    ]
    inserted = selection.insertBefore(elements)
    expect(inserted.size()).toEqual(2)
    expect(inserted.node(0).tagName.toLowerCase()).toEqual('h1')
    expect(inserted.node(0).parentNode).toEqual(hx.select('#fixture').select('.wrapper').node())
    expect(inserted.node(0)).toEqual(elements[0])
    expect(inserted.node(1).tagName.toLowerCase()).toEqual('h2')
    expect(inserted.node(1).parentNode).toEqual(hx.select('#fixture').select('.wrapper').node())
    expect(inserted.node(1)).toEqual(elements[1])

  it 'insertBefore a selection', ->
    selection = hx.select('#empty')
    select  = hx.selectAll([
      document.createElement('h1'),
      document.createElement('h2')
    ])
    elements = select.nodes
    inserted = selection.insertBefore(select)
    expect(inserted.size()).toEqual(2)
    expect(inserted.node(0).tagName.toLowerCase()).toEqual('h1')
    expect(inserted.node(0).parentNode).toEqual(hx.select('#fixture').select('.wrapper').node())
    expect(inserted.node(0)).toEqual(elements[0])
    expect(inserted.node(1).tagName.toLowerCase()).toEqual('h2')
    expect(inserted.node(1).parentNode).toEqual(hx.select('#fixture').select('.wrapper').node())
    expect(inserted.node(1)).toEqual(elements[1])

  # insert after
  it 'insertAfter an element by tag name', ->
    selection = hx.select('#empty')
    inserted = selection.insertAfter('h1')
    expect(inserted.size()).toEqual(1)
    expect(inserted.node().tagName.toLowerCase()).toEqual('h1')
    expect(inserted.node()).toEqual(hx.select('#empty').node().nextSibling)

  it 'insertAfter an existing element', ->

    selection = hx.select('#empty')
    element = document.createElement('h1')
    inserted = selection.insertAfter(element)
    expect(inserted.size()).toEqual(1)
    expect(inserted.node().tagName.toLowerCase()).toEqual('h1')
    expect(inserted.node()).toEqual(element)
    expect(inserted.node()).toEqual(hx.select('#empty').node().nextSibling)

  it 'insertAfter an array of elements by tag name', ->
    selection = hx.select('#empty')
    inserted = selection.insertAfter(['h1', 'h2'])
    expect(inserted.size()).toEqual(2)
    expect(inserted.node(0).tagName.toLowerCase()).toEqual('h1')
    expect(inserted.node(0)).toEqual(hx.select('#empty').node().nextSibling)
    expect(inserted.node(1).tagName.toLowerCase()).toEqual('h2')
    expect(inserted.node(1).parentNode).toEqual(hx.select('#fixture').select('.wrapper').node())
    expect(inserted.node(1)).toEqual(hx.select('#empty').node().nextSibling.nextSibling)

  it 'insertAfter an array of existing elements', ->
    selection = hx.select('#empty')
    elements  = [
      document.createElement('h1'),
      document.createElement('h2')
    ]
    inserted = selection.insertAfter(elements)
    expect(inserted.size()).toEqual(2)
    expect(inserted.node(0).tagName.toLowerCase()).toEqual('h1')
    expect(inserted.node(0).parentNode).toEqual(hx.select('#fixture').select('.wrapper').node())
    expect(inserted.node(0)).toEqual(elements[0])
    expect(inserted.node(1).tagName.toLowerCase()).toEqual('h2')
    expect(inserted.node(1).parentNode).toEqual(hx.select('#fixture').select('.wrapper').node())
    expect(inserted.node(1)).toEqual(elements[1])

  it 'insertAfter a selection', ->
    selection = hx.select('#empty')
    select  = hx.selectAll([
      document.createElement('h1'),
      document.createElement('h2')
    ])
    elements = select.nodes
    inserted = selection.insertAfter(select)
    expect(inserted.size()).toEqual(2)
    expect(inserted.node(0).tagName.toLowerCase()).toEqual('h1')
    expect(inserted.node(0).parentNode).toEqual(hx.select('#fixture').select('.wrapper').node())
    expect(inserted.node(0)).toEqual(elements[0])
    expect(inserted.node(1).tagName.toLowerCase()).toEqual('h2')
    expect(inserted.node(1).parentNode).toEqual(hx.select('#fixture').select('.wrapper').node())
    expect(inserted.node(1)).toEqual(elements[1])

  # cloning

  it 'should clone a single selection', ->
    selection = hx.select('#fixture').select('span')
    clone = selection.clone()
    expect(clone.size()).toEqual(1)
    expect(clone.node().tagName.toLowerCase()).toEqual('span')
    expect(clone.node()).not.toBe(selection.node())

  it 'should be able to do a shallow clone', ->
    selection = hx.select('#fixture')
    clone = selection.clone(false)
    expect(clone.size()).toEqual(1)
    expect(clone.node().tagName.toLowerCase()).toEqual('div')
    expect(clone.selectAll('span').size()).toEqual(0)

  it 'should be able to do a deep clone by default', ->
    selection = hx.select('#fixture')
    clone = selection.clone()
    expect(clone.size()).toEqual(1)
    expect(clone.node().tagName.toLowerCase()).toEqual('div')
    expect(clone.selectAll('span').size()).toEqual(7)

  it 'should clone a multi selection', ->
    selection = hx.select('#fixture').selectAll('span')
    clone = selection.clone()
    expect(clone.size()).toEqual(7)
    expect(clone.node().tagName.toLowerCase()).toEqual('span')
    expect(clone.node()).not.toBe(selection.node())

  # removing

  it 'remove works', ->
    expect( hx.select('#fixture').selectAll('span').size()).toEqual(7)
    hx.select('#fixture').selectAll('span').remove()
    expect( hx.select('#fixture').selectAll('span').size()).toEqual(0)

  it 'remove do nothing when there is nothing to remove', ->
    expect( hx.select('#fixture').selectAll('span').size()).toEqual(7)
    hx.select('#fixture').selectAll('span').remove()
    expect( hx.select('#fixture').selectAll('span').size()).toEqual(0)
    hx.select('#fixture').selectAll('span').remove()
    expect( hx.select('#fixture').selectAll('span').size()).toEqual(0)

  it 'trying to remove the document should fail', ->
    hx.select(document).remove()
    expect( hx.select('#fixture').selectAll('span').size()).toEqual(7)

  it 'clear works', ->
    expect( hx.select('#fixture').selectAll('span').size()).toEqual(7)
    hx.select('#fixture').clear()
    expect( hx.select('#fixture').selectAll('span').size()).toEqual(0)

  it 'clear returns the correct thing', ->
    selection = hx.select('#fixture')
    expect(selection.clear()).toBe(selection)

  # getting / setting properties

  it 'get a property from a single selection', ->
    selection = hx.select('#fixture').select('span')
    expect(selection.prop('className')).toEqual('first one')

  it 'set a property for a single selection', ->
    selection = hx.select('#fixture').select('span')
    selection.prop('className', 'hello')
    expect(selection.prop('className')).toEqual('hello')

  it 'set a property to null should do nothing', ->
    selection = hx.select('#fixture').select('span')
    selection.prop('className', 'hello')
    selection.prop('className', null)
    expect(selection.prop('className')).toEqual('hello')

  it 'get a property from a multi selection', ->
    selection = hx.select('#fixture').selectAll('span')
    expect(selection.prop('className')).toEqual(['first one', 'one two', 'two', '', 'one', 'one two', 'two'])

  it 'set a property for a multi selection', ->
    selection = hx.select('#fixture').selectAll('span')
    selection.prop('className', 'hello')
    expect(selection.prop('className')).toEqual(['hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello'])


  # getting / setting attributes

  it 'get a attribute from a single selection', ->
    selection = hx.select('#fixture').select('span')
    expect(selection.attr('class')).toEqual('first one')

  it 'set a attribute for a single selection', ->
    selection = hx.select('#fixture').select('span')
    selection.attr('class', 'hello')
    expect(selection.attr('class')).toEqual('hello')

  it 'get a attribute from a multi selection', ->
    selection = hx.select('#fixture').selectAll('span')
    expect(selection.attr('class')).toEqual(['first one', 'one two', 'two', undefined, 'one', 'one two', 'two'])

  it 'set a attribute for a multi selection', ->
    selection = hx.select('#fixture').selectAll('span')
    selection.attr('class', 'hello')
    expect(selection.attr('class')).toEqual(['hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello'])

   # getting / setting data

  it 'set then get data from a single selection', ->
    selection = hx.select('#fixture')
    selection.data('key', 'value')
    expect(selection.data('key')).toEqual('value')

  it 'overwrite data from a single selection', ->
    selection = hx.select('#fixture')
    selection.data('key', 'value')
    selection.data('key', 'value2')
    expect(selection.data('key')).toEqual('value2')

  it 'get undefined for a non existant data key for a single selection', ->
    selection = hx.select('#fixture')
    selection.data('key', 'value')
    expect(selection.data('key2')).toEqual(undefined)

  it 'get undefined when no data has ever been set for an element', ->
    selection = hx.select('#fixture')
    expect(selection.data('key')).toEqual(undefined)

  it 'get undefined for a non existant data key for a multi selection', ->
    selection = hx.select('#fixture').selectAll('span')
    selection.data('key', 'value')
    expect(selection.data('key2')).toEqual([undefined, undefined, undefined, undefined, undefined, undefined, undefined])

  it 'set then get data from a multi selection', ->
    selection = hx.select('#fixture').selectAll('span')
    selection.data('key', 'value')
    expect(selection.data('key')).toEqual(['value', 'value', 'value', 'value', 'value', 'value', 'value'])

  # getting / setting value for input elements

  it 'get value for an input element', ->
    selection = hx.select('#fixture').select('input')
    expect(selection.value()).toEqual('initial-value')

  it 'set value for an input element', ->
    selection = hx.select('#fixture').select('input')
    selection.value('test')
    expect(selection.value()).toEqual('test')

  #getting / setting styles

  it 'get a style from a single selection', ->
    selection = hx.select('#fixture').select('span')
    expect(selection.style('display')).toEqual('inline-block')

  it 'set a style for a single selection', ->
    selection = hx.select('#fixture').select('span')
    selection.style('display', 'inline')
    expect(selection.style('display')).toEqual('inline')

  it 'remove a style from a single selection', ->
    selection = hx.select('#fixture').select('span')
    node = selection.node()
    initial = node.style.getPropertyValue('color')
    node.style.setProperty('color', 'red')
    expect(node.style.getPropertyValue('color')).toEqual('red')
    selection.style('color', undefined)
    expect(node.style.getPropertyValue('color')).toEqual(initial)

  it 'get a style from a multi selection', ->
    selection = hx.select('#fixture').selectAll('span')
    expect(selection.style('display')).toEqual(['inline-block', 'block', 'block', 'block', 'block', 'block', 'block'])

  it 'set a style for a multi selection', ->
    selection = hx.select('#fixture').selectAll('span')
    selection.style('display', 'inline')
    expect(selection.style('display')).toEqual(['inline', 'inline', 'inline', 'inline', 'inline', 'inline', 'inline'])

  it 'remove a style from a multi selection', ->
    selection = hx.select('#fixture').selectAll('span')
    initial = selection.nodes.map (node) -> node.style.getPropertyValue('color')
    selection.nodes.forEach (node) ->
      node.style.setProperty('color', 'red')
      expect(node.style.getPropertyValue('color')).toEqual('red')

    selection.style('color', undefined)

    expect(selection.nodes.map (node) -> node.style.getPropertyValue('color')).toEqual(initial)

  # other methods

  it 'get nth node', ->
    selection = hx.select('#fixture').selectAll('span')
    expect(selection.node(3)).toEqual(selection.nodes[3])

  it 'size', ->
    expect( hx.select('#fixture').selectAll('span').size()).toEqual(7)
    hx.select('#fixture').selectAll('span').remove()
    expect( hx.select('#fixture').selectAll('span').size()).toEqual(0)

  it 'empty', ->
    expect( hx.select('#fixture').selectAll('span').empty()).toEqual(false)
    hx.select('#fixture').selectAll('span').remove()
    expect( hx.select('#fixture').selectAll('span').empty()).toEqual(true)

  # getting / setting text

  it 'get text', ->
    expect(hx.select('#text-node').text()).toEqual('text1')

  it 'get when not set', ->
    expect(hx.select('#empty').text()).toEqual('')

  it 'set text', ->
    hx.select('#text-node').text('Hello')
    expect(hx.select('#text-node').node().textContent).toEqual('Hello')

  it 'set text to undefined should do the same as setting it to ""', ->
    hx.select('#text-node').text(undefined)
    expect(hx.select('#text-node').node().textContent).toEqual('')

    # getting / setting html

  it 'get html', ->
    expect(hx.select('#html-node').html()).toEqual('<p>text1</p>')

  it 'get when not set', ->
    expect(hx.select('#empty').html()).toEqual('')

  it 'set html', ->
    hx.select('#html-node').html('<p>text2</p>')
    expect(hx.select('#html-node').node().innerHTML).toEqual('<p>text2</p>')

  it 'set html to undefined should do the same as setting it to ""', ->
    hx.select('#html-node').html(undefined)
    expect(hx.select('#html-node').node().textContent).toEqual('')


  # getting / setting the class

  it 'should return undefined when getting the class for an empty selection', ->
    selection = hx.select('#not-a-thing')
    expect(selection.class()).toEqual(undefined)

  it 'get class that has not been set', ->
    selection = hx.select('#fixture')
    expect(selection.class()).toEqual('')

  it 'get class that has been set', ->
    selection = hx.select('.wrapper')
    expect(selection.class()).toEqual('wrapper')

  it 'set the class', ->
    selection = hx.select('.wrapper')
    selection.class('some-class')
    expect(selection.class()).toEqual('some-class')

  it 'set the class to undefined works', ->
    selection = hx.select('.wrapper')
    selection.class(undefined)
    expect(selection.class()).toEqual('')

  it 'classed (get) when the class doesnt exist', ->
    selection = hx.select('#fixture')
    expect(selection.classed('some-class')).toEqual(false)

  it 'classed (get) when the class does exist', ->
    selection = hx.select('#fixture').class('some-class another-class')
    expect(selection.classed('some-class')).toEqual(true)

  it 'classed (get) not detect classes that have the same prefix', ->
    selection = hx.select('#fixture').class('some-class-but-not-the-one-you-expect')
    expect(selection.classed('some-class')).toEqual(false)

  it 'classed should let you detect multiple classes on single selections', ->
    selection = hx.select('#fixture').class('some-class some-other-class')
    expect(selection.classed('some-class some-other-class')).toEqual(true)

  it 'classed should be false when some of the classes are not present', ->
    selection = hx.select('#fixture').class('some-class')
    expect(selection.classed('some-class some-other-class')).toEqual(false)

  it 'classed should let you detect multiple classes on multi-selections', ->
    selection = hx.detached('div')
    selection
      .append('div').class('some-class some-class-2')
      .append('div').class('some-class')
      .append('div').class('some-class some-class-2')
      .append('div').class('some-class')
    expect(selection.selectAll('div').classed('some-class some-class-2')).toEqual([true, false, true, false])

  it 'classed (add)', ->
    selection = hx.select('#fixture')
    selection.classed('some-class', true)
    expect(selection.class()).toEqual('some-class')

  it 'classed add multiple classes', ->
    selection = hx.select('#fixture')
    selection.classed('some-class-1', true)
    selection.classed('some-class-2', true)
    selection.classed('some-class-3', true)
    expect(selection.class()).toEqual('some-class-1 some-class-2 some-class-3')

  it 'classed should not add a class if it already exists', ->
    selection = hx.select('#fixture')
    selection.classed('some-class-1', true)
    selection.classed('some-class-2', true)
    selection.classed('some-class-1', true)
    expect(selection.class()).toEqual('some-class-1 some-class-2')

  it 'classed (remove)', ->
    selection = hx.select('#fixture')
    selection.class('some-class-1 some-class-2')
    selection.classed('some-class-1', false)
    expect(selection.class()).toEqual('some-class-2')

  it "classed shoudn't mind you removing a class that doesn't exist" , ->
    selection = hx.select('#fixture')
    selection.class('some-class-1 some-class-2')
    selection.classed('some-class-3', false)
    expect(selection.class()).toEqual('some-class-1 some-class-2')

  it "classed shoudn't mind you removing a class from a node with no class set" , ->
    selection = hx.select('#fixture')
    selection.class(undefined)
    selection.classed('some-class-3', false)
    expect(selection.class()).toEqual('')

  it "classed should be able to add a class to a node with no class set" , ->
    selection = hx.select('#fixture')
    selection.class(undefined)
    selection.classed('some-class-3', true)
    expect(selection.class()).toEqual('some-class-3')

  it 'classed (add) (multi-selection)', ->
    selection = hx.select('#fixture').select('#multi').selectAll('div')
    selection.classed('some-class', true)
    expect(selection.class()).toEqual(['some-class', 'some-class'])

  it 'classed add multiple classes (multi-selection)', ->
    selection = hx.select('#fixture').select('#multi').selectAll('div')
    selection.classed('some-class-1', true)
    selection.classed('some-class-2', true)
    selection.classed('some-class-3', true)
    expect(selection.class()).toEqual([
      'some-class-1 some-class-2 some-class-3',
      'some-class-1 some-class-2 some-class-3'
    ])

  it 'classed should not add a class if it already exists (multi-selection)', ->
    selection = hx.select('#fixture').select('#multi').selectAll('div')
    selection.classed('some-class-1', true)
    selection.classed('some-class-2', true)
    selection.classed('some-class-1', true)
    expect(selection.class()).toEqual([
      'some-class-1 some-class-2',
      'some-class-1 some-class-2'
    ])

  it 'classed (remove) (multi-selection)', ->
    selection = hx.select('#fixture').select('#multi').selectAll('div')
    selection.class('some-class-1 some-class-2')
    selection.classed('some-class-1', false)
    expect(selection.class()).toEqual([
      'some-class-2',
      'some-class-2'
    ])

  it "classed shoudn't mind you removing a class that doesn't exist (multi-selection)" , ->
    selection = hx.select('#fixture').select('#multi').selectAll('div')
    selection.class('some-class-1 some-class-2')
    selection.classed('some-class-3', false)
    expect(selection.class()).toEqual([
      'some-class-1 some-class-2',
      'some-class-1 some-class-2'
    ])

  it "classed shoudn't mind you removing a class from a node with no class set (multi-selection)" , ->
    selection = hx.select('#fixture').select('#multi').selectAll('div')
    selection.class(undefined)
    selection.classed('some-class-3', false)
    expect(selection.class()).toEqual(['', ''])

  it "classed should be able to add a class to a node with no class set (multi-selection)" , ->
    selection = hx.select('#fixture').select('#multi').selectAll('div')
    selection.class(undefined)
    selection.classed('some-class-3', true)
    expect(selection.class()).toEqual(['some-class-3', 'some-class-3'])

  it "classed should be fine adding multiple classes in one go" , ->
    selection = hx.select('#fixture').select('#multi').selectAll('div')
    selection.class(undefined)
    selection.classed('one two three', true)
    expect(selection.class()).toEqual(['one two three', 'one two three'])

  it "classed should be fine removing multiple classes in one go" , ->
    selection = hx.select('#fixture').select('#multi').selectAll('div')
    selection.class(undefined)
    selection.classed('one two three', true)
    expect(selection.class()).toEqual(['one two three', 'one two three'])
    selection.classed('one three', false)
    expect(selection.class()).toEqual(['two', 'two'])

  it "classed should do nothing when removing a class that doesn't exist" , ->
    selection = hx.select('#fixture').select('#multi').selectAll('div')
    selection.class(undefined)
    selection.classed('one two three', true)
    expect(selection.class()).toEqual(['one two three', 'one two three'])
    selection.classed('two three four', false)
    expect(selection.class()).toEqual(['one', 'one'])

  it "classed should not add a class multiple times" , ->
    selection = hx.select('#fixture').select('#multi').selectAll('div')
    selection.class(undefined)
    selection.classed('one two three', true)
    expect(selection.class()).toEqual(['one two three', 'one two three'])
    selection.classed('one two three', true)
    expect(selection.class()).toEqual(['one two three', 'one two three'])

  it "classed should ignore extra whitespace" , ->
    selection = hx.select('#fixture').select('#multi').selectAll('div')
    selection.class(undefined)
    selection.classed('one      two three', true)
    expect(selection.class()).toEqual(['one two three', 'one two three'])
    selection.classed('one two       three', true)
    expect(selection.class()).toEqual(['one two three', 'one two three'])

  it 'closest should work', ->
    hx.select('#fixture').html(
      """
        <div id="closest-root" class="cr">
          <span id="child" class="ch">
            <div id="grandchild"></div>
          </span>
        </div>
      """
    )
    expect(hx.select('#grandchild').closest('span').class()).toEqual('ch')

  it 'closest should work for grandparents', ->
    hx.select('#fixture').html(
      """
        <div id="closest-root" class="cr">
          <span id="child" class="ch">
            <div id="grandchild"></div>
          </span>
        </div>
      """
    )
    expect(hx.select('#grandchild').closest('div').class()).toEqual('cr')

  it 'closest should return an empty selection when there is no match', ->
    hx.select('#fixture').html(
      """
        <div id="closest-root" class="cr">
          <span id="child" class="ch">
            <div id="grandchild"></div>
          </span>
        </div>
      """
    )
    expect(hx.select('#grandchild').closest('#thing-that-doesnt-exist').empty()).toEqual(true)

  it 'closest should warn when you give a non string argument', ->
    spyOn(hx, 'consoleWarning')

    obj = {}

    hx.select('#fixture').closest(obj)
    expect(hx.consoleWarning).toHaveBeenCalledWith('Selection.closest was passed the wrong argument type', 'Selection.closest only accepts a string argument, you supplied:', obj)

  it 'closest should warn when you give a non string argument', ->
    expect(hx.select('#fixture').closest('potato').empty()).toEqual(true)

  it 'closest should find by class', ->
    hx.select('#fixture').html(
      """
        <div id="closest-root" class="cr">
          <span id="child" class="ch">
            <div id="grandchild"></div>
          </span>
        </div>
      """
    )
    expect(hx.select('#grandchild').closest('.cr').attr('id')).toEqual('closest-root')

  it 'closest should find by id', ->
    hx.select('#fixture').html(
      """
        <div id="closest-root" class="cr">
          <span id="child" class="ch">
            <div id="grandchild"></div>
          </span>
        </div>
      """
    )
    expect(hx.select('#grandchild').closest('#closest-root').class()).toEqual('cr')

  it 'closest should not find a child by mistake', ->
    hx.select('#fixture').html(
      """
        <div id="closest-root" class="cr">
          <span id="child" class="ch">
            <div id="grandchild"></div>
          </span>
        </div>
      """
    )
    expect(hx.select('#child').closest('#grandchild').empty()).toEqual(true)

  it 'contains should return true when a single selection contains an element', ->
    expect(hx.select('#fixture').contains(hx.select('#fixture').select('div').node())).toEqual(true)

  it 'contains should return false when a single selection does not contain an element', ->
    expect(hx.select('#multi').contains(hx.select('#fixture').node())).toEqual(false)

  it 'contains should return true when a multi selection contains an element', ->
    expect(hx.select('#fixture').selectAll('div').contains(hx.select('#fixture').select('.first.one').node())).toEqual(true)

  it 'contains should return false when a multi selection does not contain an element', ->
    expect(hx.select('#multi').selectAll('div').contains(hx.select('#fixture').node())).toEqual(false)

  it 'basic event emitter registration should work', ->
    div = hx.detached('div')
    called = false
    div.on 'click', (e) -> called = true
    div.node().__hx__.eventEmitter.emit('click', {})
    expect(called).toEqual(true)

  it 'basic event emitter replacement should work', ->
    div = hx.detached('div')
    called = false
    div.on('click', (e) -> called = 1)
    div.on('click', (e) -> called = 2)
    div.node().__hx__.eventEmitter.emit('click', {})
    expect(called).toEqual(2)

  it 'basic event emitter removal should work', ->
    div = hx.detached('div')
    called = false
    f = (e) -> called = 1
    div.on('click', (e) -> called = 2)
    div.on('click', f)
    div.off('click', f)
    div.node().__hx__.eventEmitter.emit('click', {})
    expect(called).toEqual(false)

  it 'namespaced event emitter addition should work', ->
    div = hx.detached('div')
    result1 = false
    div.on('click', 'my-namespace', (e) -> result1 = true)
    div.node().__hx__.eventEmitter.emit('click', {})
    expect(result1).toEqual(true)

  it 'namespaced event emitter addition should not affect other namespaces', ->
    div = hx.detached('div')
    result1 = false
    result2 = false
    div.on('click', 'my-namespace-1', (e) -> result1 = true)
    div.on('click', 'my-namespace-2', (e) -> result2 = true)
    div.node().__hx__.eventEmitter.emit('click', {})
    expect(result1).toEqual(true)
    expect(result2).toEqual(true)

  it 'namespaced event emitter removal should not affect other namespaces', ->
    div = hx.detached('div')
    result1 = false
    result2 = false
    div.on('click', 'my-namespace-1', (e) -> result1 = true)
    div.on('click', 'my-namespace-2', (e) -> result2 = true)
    div.off('click', 'my-namespace-1')
    div.node().__hx__.eventEmitter.emit('click', {})
    expect(result1).toEqual(false)
    expect(result2).toEqual(true)

  it 'explicit namespaced event emitter removal should not affect other namespaces', ->
    div = hx.detached('div')
    result1 = false
    result2 = false
    f = (e) -> result1 = true
    div.on('click', 'my-namespace-1', f)
    div.on('click', 'my-namespace-2', (e) -> result2 = true)
    div.off('click', 'my-namespace-1', f)
    div.node().__hx__.eventEmitter.emit('click', {})
    expect(result1).toEqual(false)
    expect(result2).toEqual(true)

  it 'handler removal without specifying namespace should work', ->
    div = hx.detached('div')
    result1 = false
    result2 = false
    f = (e) -> result1 = true
    div.on('click', 'my-namespace-1', f)
    div.on('click', 'my-namespace-2', (e) -> result2 = true)
    div.off('click', f)
    div.node().__hx__.eventEmitter.emit('click', {})
    expect(result1).toEqual(false)
    expect(result2).toEqual(true)

  it 'namespaced event emitter replacement should work', ->
    div = hx.detached('div')
    result1 = false
    result2 = false
    result3 = false
    div.on('click', 'my-namespace-1', (e) -> result1 = true)
    div.on('click', 'my-namespace-2', (e) -> result2 = true)
    div.on('click', 'my-namespace-1', (e) -> result3 = true)
    div.node().__hx__.eventEmitter.emit('click', {})
    expect(result1).toEqual(false)
    expect(result2).toEqual(true)
    expect(result3).toEqual(true)

  it 'off with no arguments should remove all handlers', ->
    div = hx.detached('div')
    result1 = false
    result2 = false
    result3 = false
    div.on('click', 'my-namespace-1', (e) -> result1 = true)
    div.on('click', 'my-namespace-2', (e) -> result2 = true)
    div.on('clack', 'my-namespace-1', ((e) -> result3 = true))
    div.off()
    div.node().__hx__.eventEmitter.emit('click', {})
    div.node().__hx__.eventEmitter.emit('clack', {})
    expect(result1).toEqual(false)
    expect(result2).toEqual(false)
    expect(result3).toEqual(false)

  it 'off with event name should work', ->
    div = hx.detached('div')
    result1 = false
    result2 = false
    result3 = false
    div.on('click', 'my-namespace-1', (e) -> result1 = true)
    div.on('click', 'my-namespace-2', (e) -> result2 = true)
    div.on('clack', 'my-namespace-1', ((e) -> result3 = true))
    div.off('click')
    div.node().__hx__.eventEmitter.emit('click', {})
    div.node().__hx__.eventEmitter.emit('clack', {})
    expect(result1).toEqual(false)
    expect(result2).toEqual(false)
    expect(result3).toEqual(true)

  it 'off by namespace alone should work', ->
    div = hx.detached('div')
    result1 = false
    result2 = false
    result3 = false
    div.on('click', 'my-namespace-1', (e) -> result1 = true)
    div.on('click', 'my-namespace-2', (e) -> result2 = true)
    div.on('clack', 'my-namespace-1', ((e) -> result3 = true))
    div.off(undefined, 'my-namespace-1')
    div.node().__hx__.eventEmitter.emit('click', {})
    div.node().__hx__.eventEmitter.emit('clack', {})
    expect(result1).toEqual(false)
    expect(result2).toEqual(true)
    expect(result3).toEqual(false)

  it 'off by event name and namespace should work', ->
    div = hx.detached('div')
    result1 = false
    result2 = false
    result3 = false
    div.on('click', 'my-namespace-1', (e) -> result1 = true)
    div.on('click', 'my-namespace-2', (e) -> result2 = true)
    div.on('clack', 'my-namespace-1', ((e) -> result3 = true))
    div.off('click', 'my-namespace-1')
    div.node().__hx__.eventEmitter.emit('click', {})
    div.node().__hx__.eventEmitter.emit('clack', {})
    expect(result1).toEqual(false)
    expect(result2).toEqual(true)
    expect(result3).toEqual(true)
