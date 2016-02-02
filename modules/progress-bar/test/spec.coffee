describe 'hx-progress-bar', ->
  progressBar = null

  beforeEach ->
    fixture = hx.select('body').append('div').attr('id', 'fixture')
    progressBar = new hx.ProgressBar('#fixture')

  afterEach ->
    hx.select('#fixture').remove()
    progressBar = null


  it 'should create and class the progress bar correctly', ->
    progressBar.selection.classed('hx-progress-bar').should.equal(true)
    progressBar.selection.selectAll('.hx-progress-bar-inner').size().should.equal(1)
    progressBar.progress.should.equal(0)
    # this method is used rather than calculate the pixel width as .style('width') returns Npx not N%
    progressBar.innerBars.attr('style').split(' ').join('').should.equal('width:0%;')


  it 'should set the progress correctly with value', ->
    # this method is used rather than calculate the pixel width as .style('width') returns Npx not N%
    progressBar.innerBars.attr('style').split(' ').join('').should.equal('width:0%;')

    progressBar.value(0.79)

    progressBar.progress.should.equal(0.79)
    # this method is used rather than calculate the pixel width as .style('width') returns Npx not N%
    progressBar.innerBars.attr('style').split(' ').join('').should.equal('width:79%;')


  it 'should return the correct progress with value', ->
    progressBar.value(0.5)

    progressBar.progress.should.equal(0.5)
    progressBar.value().should.equal(0.5)

    progressBar.value(1)

    progressBar.progress.should.equal(1)
    progressBar.value().should.equal(1)


  it 'should do nothing if a non-numeric value is passed in to value', ->
    progressBar.value('bob')

    progressBar.progress.should.equal(0)

    progressBar.value(0.5)

    progressBar.progress.should.equal(0.5)

    progressBar.value('i0')

    progressBar.progress.should.equal(0.5)


  it 'should not apply negative values', ->
    progressBar.value(-0.1)

    progressBar.progress.should.equal(0)


  it 'should not apply values over 1', ->
    progressBar.value(2)

    progressBar.progress.should.equal(1)