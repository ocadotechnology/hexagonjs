import { select, selectAll } from 'utils/selection'

import { TitleBar, titleBar } from 'components/titlebar'

export default () ->
  describe 'hx-titlebar', ->
    origWarn = console.warn
    beforeEach ->
      fixture = select('body').append('div').attr('id', 'fixture').node().innerHTML = """
        <div class="hx-heading">
          <div class="hx-titlebar">
            <div class="hx-titlebar-container">
              <div class="hx-titlebar-header">
                <a class="hx-titlebar-icon" href="#"><img class="hx-titlebar-icon"></img></a>
                <div class="hx-titlebar-title">Title</div>
                <div class="hx-titlebar-subtitle">Subtitle</div>
                <div class="hx-titlebar-menu-icon-mobile"><i class="fa fa-reorder"></i></div>
              </div>
              <div class="hx-titlebar-menu-icons">
                <div class="hx-titlebar-menu-icons-container">
                  <a class="hx-titlebar-menu-icon"><i class="fa fa-tags"></i><span class="hx-titlebar-menu-text">Tags</span></a>
                  <a class="hx-titlebar-menu-icon"><i class="fa fa-life-ring"></i><span class="hx-titlebar-menu-text">Help</span></a>
                  <a class="hx-titlebar-menu-icon"><i class="fa fa-cog"></i><span class="hx-titlebar-menu-text">Settings</span></a>
                  <a class="hx-titlebar-menu-icon"><i class="fa fa-power-off"></i><span class="hx-titlebar-menu-text">Sign out</span></a>
                </div>
              </div>
            </div>
          </div>
          <div class="hx-titlebar-linkbar">
            <div class="hx-titlebar-contents">
              <a id="link-1" class="hx-titlebar-link">Link 1</a>
              <a id="link-2" class="hx-titlebar-link">Link 2</a>
              <a id="link-3" class="hx-titlebar-link">Link 3</a>
              <a id="link-4" class="hx-titlebar-link">Link 4</a>
              <a id="link-5" class="hx-titlebar-link">Link 5</a>
            </div>
          </div>
        </div>
      """

      select('#fixture').selectAll('span').style('display', 'block').style('display')
      select('#fixture').select('span').style('display', 'inline-block').style('display')
      console.warn = chai.spy()

    afterEach ->
      console.warn = origWarn
      select('#fixture').remove()

    it 'should set the active section by index correctly', ->
      titlebar = new TitleBar(select('#fixture').select('.hx-heading'))
      titlebar.active(0)
      selectAll('.hx-titlebar-link').classed('hx-selected').should.eql([true, false, false, false, false])

    it 'should set the active section by node correctly', ->
      titlebar = new TitleBar(select('#fixture').select('.hx-heading').node())
      node = selectAll('.hx-titlebar-link').node(3)
      titlebar.active(node)
      selectAll('.hx-titlebar-link').classed('hx-selected').should.eql([false, false, false, true, false])

    it 'should set the active section by ID correctly', ->
      titlebar = new TitleBar(select('#fixture').select('.hx-heading').node())
      select(selectAll('.hx-titlebar-link').node(2))
        .attr('id', 'titlebar-active-test')
      titlebar.active('#titlebar-active-test')
      selectAll('.hx-titlebar-link').classed('hx-selected').should.eql([false, false, true, false, false])

    it 'should set the active section by Selection correctly', ->
      titlebar = new TitleBar(select('#fixture').select('.hx-heading').node())
      sel = select(selectAll('.hx-titlebar-link').node(2))
      titlebar.active(sel)
      selectAll('.hx-titlebar-link').classed('hx-selected').should.eql([false, false, true, false, false])


    it 'should set the active section by index correctly', ->
      titlebar = new TitleBar(select('#fixture').select('.hx-heading'))
      titlebar.active(4)
      selectAll('.hx-titlebar-link').classed('hx-selected').should.eql([false, false, false, false, true])

    it 'should set the active section by index correctly when out of range', ->
      titlebar = new TitleBar(select('#fixture').select('.hx-heading'))
      titlebar.active(5)
      selectAll('.hx-titlebar-link').classed('hx-selected').should.eql([false, false, false, false, false])

    it 'should set the active section by index correctly', ->
      titlebar = new TitleBar(select('#fixture').select('.hx-heading'))
      titlebar.active('#link-1')
      selectAll('.hx-titlebar-link').classed('hx-selected').should.eql([true, false, false, false, false])

    it 'should set the active section by index correctly', ->
      titlebar = new TitleBar(select('#fixture').select('.hx-heading'))
      titlebar.active('#link-5')
      selectAll('.hx-titlebar-link').classed('hx-selected').should.eql([false, false, false, false, true])

    it 'should set the active section by index correctly', ->
      titlebar = new TitleBar(select('#fixture').select('.hx-heading'))
      titlebar.active('#link-6')
      selectAll('.hx-titlebar-link').classed('hx-selected').should.eql([false, false, false, false, false])

    it 'should reset the active section correctly', ->
      titlebar = new TitleBar(select('#fixture').select('.hx-heading').node())
      titlebar.active(0)
      selectAll('.hx-titlebar-link').classed('hx-selected').should.eql([true, false, false, false, false])
      titlebar.active(undefined)
      selectAll('.hx-titlebar-link').classed('hx-selected').should.eql([false, false, false, false, false])

    describe 'fluid', ->
      it 'should create a fluid titlebar', ->
        titlebar = titleBar()
        titlebar.api().should.be.an.instanceOf(TitleBar)
        titlebar.classed('hx-heading').should.equal(true)

      it 'should be able to set the title', ->
        titlebar = titleBar({title: 'My Title'})
        titlebar.select('.hx-titlebar-title').text().should.equal('My Title')

      it 'should be able to set the subtitle', ->
        titlebar = titleBar({subtitle: 'My Subtitle'})
        titlebar.select('.hx-titlebar-subtitle').text().should.equal('My Subtitle')

      it 'should show icon by default', ->
        titlebar = titleBar()
        titlebar.select('.hx-titlebar-icon').empty().should.equal(false)

      it 'should not add the icon when showIcon is false', ->
        titlebar = titleBar({showIcon: false})
        titlebar.select('.hx-titlebar-icon').empty().should.equal(true)

      it 'should be able to set the icon link', ->
        titlebar = titleBar({iconLink: '/home'})
        titlebar.select('.hx-titlebar-icon').attr('href').should.equal('/home')

      it 'should be able to set the icon link', ->
        titlebar = titleBar({iconClass: 'my-icon-class'})
        titlebar.select('.hx-titlebar-icon').select('img').classed('my-icon-class').should.equal(true)

