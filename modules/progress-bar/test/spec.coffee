describe 'hx-progress-bar', ->
  progressBar = null

  beforeEach ->
    fixture = hx.select('body').append('div').attr('id', 'fixture')
    progressBar = new hx.ProgressBar('#fixture')

  afterEach ->
    hx.select('#fixture').remove()
    progressBar = null


  it 'should create and class the progress bar correctly', ->
    expect(progressBar.selection.classed('hx-progress-bar')).toEqual(true)
    expect(progressBar.selection.selectAll('.hx-progress-bar-inner').size()).toEqual(1)
    expect(progressBar.progress).toEqual(0)
    expect(progressBar.innerBars.attr('style').split(' ').join('')).toEqual('width:0%;')


  it 'should set the progress correctly with value', ->
    expect(progressBar.innerBars.attr('style').split(' ').join('')).toEqual('width:0%;')

    progressBar.value(0.79)

    expect(progressBar.progress).toEqual(0.79)
    expect(progressBar.innerBars.attr('style').split(' ').join('')).toEqual('width:79%;')


  it 'should return the correct progress with value', ->
    progressBar.value(0.5)

    expect(progressBar.progress).toEqual(0.5)
    expect(progressBar.value()).toEqual(0.5)

    progressBar.value(1)

    expect(progressBar.progress).toEqual(1)
    expect(progressBar.value()).toEqual(1)


  it 'should do nothing if a non-numeric value is passed in to value', ->
    progressBar.value('bob')

    expect(progressBar.progress).toEqual(0)

    progressBar.value(0.5)

    expect(progressBar.progress).toEqual(0.5)

    progressBar.value('i0')

    expect(progressBar.progress).toEqual(0.5)


  it 'should not apply negative values', ->
    progressBar.value(-0.1)

    expect(progressBar.progress).toEqual(0)


  it 'should not apply values over 1', ->
    progressBar.value(2)

    expect(progressBar.progress).toEqual(1)