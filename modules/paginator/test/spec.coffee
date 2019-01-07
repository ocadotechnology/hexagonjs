describe 'paginator', ->
  describe 'exports', ->
    it 'the component', -> should.exist(hx.Paginator)
    it 'the fluid component', -> should.exist(hx.paginator)

  describe 'user facing text', ->
    it 'sets paginatorAria', -> hx.userFacingText('paginator', 'paginatorAria').should.equal('Pagination navigation')
    it 'sets currentPageAria', -> hx.userFacingText('paginator', 'currentPageAria').should.equal('Current page, page $page')
    it 'sets gotoPageAria', -> hx.userFacingText('paginator', 'gotoPageAria').should.equal('Goto page $page')
    it 'sets prevPageAria', -> hx.userFacingText('paginator', 'prevPageAria').should.equal('Goto previous page, page $page')
    it 'sets nextPageAria', -> hx.userFacingText('paginator', 'nextPageAria').should.equal('Goto next page, page $page')
    it 'sets prev', -> hx.userFacingText('paginator', 'prev').should.equal('Prev')
    it 'sets next', -> hx.userFacingText('paginator', 'next').should.equal('Next')

  allV2FeaturesEnabled = {
    v2Features: {
      padding: 2,
      useAccessibleRendering: true,
    }
  }

  fixture = undefined
  beforeEach ->
    fixture = hx.select('body').append('div').class('hx-test-paginator')

  afterEach ->
    fixture.remove()

  describe 'hx.Paginator', ->
    paginator = undefined
    changeSpy = undefined

    describe 'when creating a paginator with pageCount 100 and currentPage 1', ->
      allText = undefined
      selected = undefined
      beforeEach ->
        changeSpy = chai.spy()
        opts = Object.assign({}, allV2FeaturesEnabled, {
          pageCount: 100,
          page: 1
        })
        paginator = new hx.Paginator(fixture, opts)
        paginator.on 'change', changeSpy
        allText = fixture.selectAll('li').text()
        selected = fixture.select('.hx-paginator-selected')

      it 'shows the correct buttons', ->
        allText.should.eql(['1', '2', '3', '4', '5', '', '100', hx.userFacingText('paginator', 'next')])

      it 'has the correct selected item', ->
        selected.text().should.equal('1')

      it 'has the correct pageCount', ->
        paginator.pageCount().should.equal(100)

      it 'has the correct page', ->
        paginator.page().should.equal(1)


      describe 'and updating the prev text', ->
        beforeEach ->
          paginator.page('50')
          paginator.prevText('Bob')
          allText = fixture.selectAll('li').text()

        it 'shows the correct buttons', ->
          allText.should.eql(['Bob', '1', '', '48', '49', '50', '51', '52', '', '100', hx.userFacingText('paginator', 'next')])

        it 'adds the container class for the previous and next buttons', ->
          fixture.selectAll('.hx-paginator-prev-next-container').size().should.equal(2)


      describe 'and updating the next text', ->
        beforeEach ->
          paginator.page('50')
          paginator.nextText('Bob')
          allText = fixture.selectAll('li').text()

        it 'shows the correct buttons', ->
          allText.should.eql([ hx.userFacingText('paginator', 'prev'), '1', '', '48', '49', '50', '51', '52', '', '100', 'Bob'])

        it 'adds the container class for the previous and next buttons', ->
          fixture.selectAll('.hx-paginator-prev-next-container').size().should.equal(2)


      describe 'and clicking on a page', ->
        beforeEach ->
          fixture.select('li:nth-child(4) a').node().click()

        it 'has the correct page', ->
          paginator.page().should.equal(4)


      describe 'and clicking next', ->
        beforeEach ->
          fixture.select('li:last-child a').node().click()

        it 'has the correct page', ->
          paginator.page().should.equal(2)


        describe 'then clicking prev', ->
          beforeEach ->
            fixture.select('li:first-child a').node().click()

          it 'has the correct page', ->
            paginator.page().should.equal(1)


      describe 'and pressing the left key', ->
        beforeEach ->
          testHelpers.fakeNodeEvent(fixture.select('nav').node(), 'keydown')({ which: 37 })

        it 'has the correct page', ->
          paginator.page().should.equal(1)


      describe 'and pressing the right key', ->
        beforeEach ->
          testHelpers.fakeNodeEvent(fixture.select('nav').node(), 'keydown')({ which: 39 })

        it 'has the correct page', ->
          paginator.page().should.equal(2)


        describe 'then pressing the left key', ->
          beforeEach ->
            testHelpers.fakeNodeEvent(fixture.select('nav').node(), 'keydown')({ which: 37 })

          it 'has the correct page', ->
            paginator.page().should.equal(1)


      describe 'and setting the current page to 100 with the API', ->
        beforeEach ->
          paginator.page(100)
          allText = fixture.selectAll('li').text()

        it 'shows the correct buttons', ->
          allText.should.eql([hx.userFacingText('paginator', 'prev'), '1', '', '96', '97', '98', '99', '100'])

        it 'has the correct page', ->
          paginator.page().should.equal(100)


        describe 'then pressing the right key', ->
          beforeEach ->
            testHelpers.fakeNodeEvent(fixture.select('nav').node(), 'keydown')({ which: 39 })

          it 'has the correct page', ->
            paginator.page().should.equal(100)


      describe 'and setting the current page to undefined with the API', ->
        beforeEach ->
          paginator.page(undefined)
          allText = fixture.selectAll('li').text()

        it 'sets the page to 1', ->
          paginator.page().should.equal(1)

        it 'shows the correct buttons', ->
          allText.should.eql(['1', '2', '3', '4', '5', '', '100', hx.userFacingText('paginator', 'next')])

        it 'has the correct page', ->
          paginator.page().should.equal(1)


      describe 'and setting the pageCount to 30 with the API', ->
        beforeEach ->
          paginator.pageCount(30)
          allText = fixture.selectAll('li').text()

        it 'shows the correct buttons', ->
          allText.should.eql(['1', '2', '3', '4', '5', '', '30', hx.userFacingText('paginator', 'next')])

        it 'has the correct page', ->
          paginator.page().should.equal(1)


      describe 'and setting the pageCount to undefined with the API', ->
        beforeEach ->
          paginator.pageCount(undefined)
          allText = fixture.selectAll('li').text()

        it 'shows the correct buttons', ->
          allText.should.eql(['1', hx.userFacingText('paginator', 'next')])

        it 'has the correct page', ->
          paginator.page().should.equal(1)

        describe 'then setting the page to 1000', ->
          beforeEach ->
            paginator.page(1000)
            allText = fixture.selectAll('li').text()

          it 'shows the correct buttons', ->
            allText.should.eql([hx.userFacingText('paginator', 'prev'), '1000', hx.userFacingText('paginator', 'next')])

          it 'has the correct page', ->
            paginator.page().should.equal(1000)


      describe 'and disabling updatePageOnSelect', ->
        beforeEach ->
          paginator.page(4)
          paginator.updatePageOnSelect(false)

        describe 'then clicking on a page', ->
          beforeEach ->
            fixture.select('li:nth-child(3) a').node().click()

          it 'has not changed the selected item', ->
            paginator.page().should.equal(4)

          it 'calls the change function', ->
            changeSpy.should.have.been.called()

          it 'calls the change function with the correct value', ->
            changeSpy.should.have.been.called.with({
              cause: 'user',
              value: 2,
              selected: 2
            })

        describe 'then clicking next', ->
          beforeEach ->
            fixture.select('li:last-child a').node().click()
            selected = fixture.select('.hx-paginator-selected')

          it 'has not changed the selected item', ->
            paginator.page().should.equal(4)

          it 'calls the change function', ->
            changeSpy.should.have.been.called()

          it 'calls the change function with the correct value', ->
            changeSpy.should.have.been.called.with({
              cause: 'user',
              value: 5,
              selected: 5
            })

        describe 'then clicking prev', ->
          beforeEach ->
            fixture.select('li:first-child a').node().click()
            selected = fixture.select('.hx-paginator-selected')

          it 'has the correct page', ->
            paginator.page().should.equal(4)

          it 'calls the change function', ->
            changeSpy.should.have.been.called()

          it 'calls the change function with the correct value', ->
            changeSpy.should.have.been.called.with({
              cause: 'user',
              value: 3
              selected: 3
            })


  describe 'hx.paginator', ->
    describe 'when creating a paginator with pageCount 100 and currentPage 1', ->
      allText = undefined
      beforeEach ->
        opts = Object.assign({}, allV2FeaturesEnabled, {
          pageCount: 100,
          currentPage: 1
        })
        paginator = hx.paginator(opts)
        allText = paginator.selectAll('li').text()

      it 'shows the correct buttons', ->
        allText.should.eql(['1', '2', '3', '4', '5', '', '100', hx.userFacingText('paginator', 'next')])


  describe 'getPageItems', ->
    getPageItems = hx._.paginator.getPageItems

    runTest = (expectation, currentPage, pageCount) ->
      it "page: #{currentPage}, pageCount: #{pageCount} => #{expectation}", ->
        getPageItems(currentPage, pageCount, 2).join(' ').should.equal(expectation)

    runTest('1~ 2 3 4 5 ... 100 next', 1, 100)
    runTest('prev 1 2 3~ 4 5 ... 100 next', 3, 100)
    runTest('prev 1 ... 13 14 15~ 16 17 ... 100 next', 15, 100)
    runTest('prev 1 ... 96~ 97 98 99 100 next', 96, 100)
    runTest('prev 1 ... 96 97 98 99 100~', 100, 100)

    runTest('1~', undefined, 1)
    runTest('1~', 1, 1)

    runTest('1~ 2 next', undefined, 2)
    runTest('1~ 2 next', 1, 2)
    runTest('prev 1 2~', 2, 2)

    runTest('1~ 2 3 next', undefined, 3)
    runTest('1~ 2 3 next', 1, 3)
    runTest('prev 1 2~ 3 next', 2, 3)
    runTest('prev 1 2 3~', 3, 3)

    runTest('1~ 2 3 4 next', undefined, 4)
    runTest('1~ 2 3 4 next', 1, 4)
    runTest('prev 1 2~ 3 4 next', 2, 4)
    runTest('prev 1 2 3~ 4 next', 3, 4)
    runTest('prev 1 2 3 4~', 4, 4)

    runTest('1~ 2 3 4 5 next', undefined, 5)
    runTest('1~ 2 3 4 5 next', 1, 5)
    runTest('prev 1 2~ 3 4 5 next', 2, 5)
    runTest('prev 1 2 3~ 4 5 next', 3, 5)
    runTest('prev 1 2 3 4~ 5 next', 4, 5)
    runTest('prev 1 2 3 4 5~', 5, 5)

    runTest('1~ 2 3 4 5 6 next', undefined, 6)
    runTest('1~ 2 3 4 5 6 next', 1, 6)
    runTest('prev 1 2~ 3 4 5 6 next', 2, 6)
    runTest('prev 1 2 3~ 4 5 6 next', 3, 6)
    runTest('prev 1 2 3 4~ 5 6 next', 4, 6)
    runTest('prev 1 2 3 4 5~ 6 next', 5, 6)
    runTest('prev 1 2 3 4 5 6~', 6, 6)

    runTest('1~ 2 3 4 5 6 7 next', undefined, 7)
    runTest('1~ 2 3 4 5 6 7 next', 1, 7)
    runTest('prev 1 2~ 3 4 5 6 7 next', 2, 7)
    runTest('prev 1 2 3~ 4 5 6 7 next', 3, 7)
    runTest('prev 1 2 3 4~ 5 6 7 next', 4, 7)
    runTest('prev 1 2 3 4 5~ 6 7 next', 5, 7)
    runTest('prev 1 2 3 4 5 6~ 7 next', 6, 7)
    runTest('prev 1 2 3 4 5 6 7~', 7, 7)

    runTest('1~ 2 3 4 5 ... 8 next', undefined, 8)
    runTest('1~ 2 3 4 5 ... 8 next', 1, 8)
    runTest('prev 1 2~ 3 4 5 ... 8 next', 2, 8)
    runTest('prev 1 2 3~ 4 5 ... 8 next', 3, 8)
    runTest('prev 1 2 3 4~ 5 ... 8 next', 4, 8)
    runTest('prev 1 ... 4 5~ 6 7 8 next', 5, 8)
    runTest('prev 1 ... 4 5 6~ 7 8 next', 6, 8)
    runTest('prev 1 ... 4 5 6 7~ 8 next', 7, 8)
    runTest('prev 1 ... 4 5 6 7 8~', 8, 8)

    runTest('1~ 2 3 4 5 ... 9 next', undefined, 9)
    runTest('1~ 2 3 4 5 ... 9 next', 1, 9)
    runTest('prev 1 2~ 3 4 5 ... 9 next', 2, 9)
    runTest('prev 1 2 3~ 4 5 ... 9 next', 3, 9)
    runTest('prev 1 2 3 4~ 5 ... 9 next', 4, 9)
    runTest('prev 1 ... 5~ 6 7 8 9 next', 5, 9)
    runTest('prev 1 ... 5 6~ 7 8 9 next', 6, 9)
    runTest('prev 1 ... 5 6 7~ 8 9 next', 7, 9)
    runTest('prev 1 ... 5 6 7 8~ 9 next', 8, 9)
    runTest('prev 1 ... 5 6 7 8 9~', 9, 9)

    runTest('1~ 2 3 4 5 ... 10 next', undefined, 10)
    runTest('1~ 2 3 4 5 ... 10 next', 1, 10)
    runTest('prev 1 2~ 3 4 5 ... 10 next', 2, 10)
    runTest('prev 1 2 3~ 4 5 ... 10 next', 3, 10)
    runTest('prev 1 2 3 4~ 5 ... 10 next', 4, 10)
    runTest('prev 1 2 3 4 5~ ... 10 next', 5, 10)
    runTest('prev 1 ... 6~ 7 8 9 10 next', 6, 10)
    runTest('prev 1 ... 6 7~ 8 9 10 next', 7, 10)
    runTest('prev 1 ... 6 7 8~ 9 10 next', 8, 10)
    runTest('prev 1 ... 6 7 8 9~ 10 next', 9, 10)
    runTest('prev 1 ... 6 7 8 9 10~', 10, 10)

    runTest('1~ 2 3 4 5 ... 11 next', undefined, 11)
    runTest('1~ 2 3 4 5 ... 11 next', 1, 11)
    runTest('prev 1 2~ 3 4 5 ... 11 next', 2, 11)
    runTest('prev 1 2 3~ 4 5 ... 11 next', 3, 11)
    runTest('prev 1 2 3 4~ 5 ... 11 next', 4, 11)
    runTest('prev 1 2 3 4 5~ ... 11 next', 5, 11)
    runTest('prev 1 ... 4 5 6~ 7 8 ... 11 next', 6, 11)
    runTest('prev 1 ... 7~ 8 9 10 11 next', 7, 11)
    runTest('prev 1 ... 7 8~ 9 10 11 next', 8, 11)
    runTest('prev 1 ... 7 8 9~ 10 11 next', 9, 11)
    runTest('prev 1 ... 7 8 9 10~ 11 next', 10, 11)
    runTest('prev 1 ... 7 8 9 10 11~', 11, 11)

    runTest('1~ next', 1, undefined)
    runTest('prev 2~ next', 2, undefined)
    runTest('prev 100~ next', 100, undefined)
