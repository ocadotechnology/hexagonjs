describe 'hx-view', ->
  it "should create elements of a given type using the default view enter fn", ->
    noDivsToCreate = 3
    root = hx.detached 'div'
    root.view 'cool-element-type'
      .apply [1..noDivsToCreate]
    noDivsCreated = root.selectAll 'cool-element-type'
      .size()
    expect noDivsCreated
      .toEqual noDivsToCreate

  it "should create elements of a given class using the default view enter fn", ->
    noDivsToCreate = 3
    root = hx.detached 'div'
    root.view '.cool-class'
      .apply [1..noDivsToCreate]
    noDivsCreated = root.selectAll '.cool-class'
      .size()
    expect noDivsCreated
      .toEqual noDivsToCreate

      
  it "should create slightly more complicated elements with the default view enter fn", ->
    noDivsToCreate = 3
    root = hx.detached 'div'
    root.view 'cool-element-type.cool-class-onion.cool-class-lemon'
      .apply [1..noDivsToCreate]
    noDivsCreated = root.selectAll 'cool-element-type.cool-class-onion.cool-class-lemon'
      .size()
    expect noDivsCreated
      .toEqual noDivsToCreate

  it "should support update functions", ->
    root = hx.detached 'div'
    noDivsToCreate = 3
    root.view '.cool-class'
      .update (datum, node) ->
        hx.select node
          .text datum + 1
      .apply [1..noDivsToCreate]
    text = root.selectAll '.cool-class'
      .text()
    expect text
      .toEqual ["2", "3", "4"]

  it "should create additional elements as needed", ->
    root = hx.detached 'div'
    noDivsToCreate = 3
    root.view '.cool-class'
      .update (datum, node) ->
        hx.select node
          .text datum + 1
      .apply [1..noDivsToCreate]
      .apply [1..noDivsToCreate + 1]

    text = root.selectAll '.cool-class'
      .text()
    expect text
      .toEqual ["2", "3", "4", "5"]

  it "should remove additional elements as needed", ->
    root = hx.detached 'div'
    noDivsToCreate = 3
    root.view '.cool-class'
      .update (datum, node) ->
        hx.select node
          .text datum + 1
      .apply [1..noDivsToCreate]
      .apply [1..noDivsToCreate - 1]

    text = root.selectAll '.cool-class'
      .text()
    expect text
      .toEqual ["2", "3"]

