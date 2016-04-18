describe 'Autocomplete Picker', ->
  origConsoleWarning = hx.consoleWarning
  hx.consoleWarning = chai.spy()

  beforeEach ->
    hx.consoleWarning.reset()

  it 'should focus the input when picker is opened', ->

    hx.consoleWarning.should.not.have.been.called()

  it 'should allow user to use arrow keys to select a value', ->

    hx.consoleWarning.should.not.have.been.called()

  it 'should filter items when typing', ->

    hx.consoleWarning.should.not.have.been.called()

  it 'should set the "active" item when a value is entered', ->

    hx.consoleWarning.should.not.have.been.called()

  it 'should clear the "active" item when the value is cleared', ->

    hx.consoleWarning.should.not.have.been.called()

  it 'should show the "No Results Found" text when no values are found', ->

    hx.consoleWarning.should.not.have.been.called()

  it 'should show "Loading..." when results are loading', ->

    hx.consoleWarning.should.not.have.been.called()


  describe 'methods', ->
    it 'hide(): should hide the dropdown', ->

      hx.consoleWarning.should.not.have.been.called()


    it 'disabled(): should return the disabled state', ->

      hx.consoleWarning.should.not.have.been.called()

    it 'disabled(true): should set the disabled state', ->

      hx.consoleWarning.should.not.have.been.called()


    it 'clearCache(): should clear cached values', ->

      hx.consoleWarning.should.not.have.been.called()


    it 'value(): should return the currently set value', ->

      hx.consoleWarning.should.not.have.been.called()

    it 'value(val: String): should set the value to a value in the dataset', ->

      hx.consoleWarning.should.not.have.been.called()

    it 'value(val): should not set the value when not in the dataset', ->

      hx.consoleWarning.should.not.have.been.called()


    it 'data(): should return the currently set data function', ->

      hx.consoleWarning.should.not.have.been.called()

    it 'data(): should return the currently set data array', ->

      hx.consoleWarning.should.not.have.been.called()

    it 'data(data: Function): should set the data function', ->

      hx.consoleWarning.should.not.have.been.called()

    it 'data(data: Array): should set the data array', ->

      hx.consoleWarning.should.not.have.been.called()