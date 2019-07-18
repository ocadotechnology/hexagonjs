import chai from 'chai';


import { userFacingText } from 'utils/user-facing-text';
import logger from 'utils/logger';
import { Menu } from 'components/menu';
import { Dropdown, config as dropdownConfig } from 'components/dropdown';
import {
  select,
  div,
  button,
  Selection,
} from 'utils/selection';

import {
  singleSelect,
  SingleSelect,
} from 'components/single-select';

import emit from 'test/utils/fake-event';
import installFakeTimers from 'test/utils/fake-time';

export default () => {
  const should = chai.should();
  describe('single-select', () => {
    let clock;
    const fixture = div('hx-test-single-select');

    const inputDebounceWait = 200;
    const trivialItems = ['a', 'b', 'c'];
    const trivialAsyncWait = 1000;

    function trivialAsyncItems(term, callback) {
      const cb = () => callback(trivialItems);
      setTimeout(cb, trivialAsyncWait);
    }

    function testAutocomplete(openAutocomplete, items, options, test) {
      const sel = div();
      fixture.add(sel);
      const ss = new SingleSelect(sel, items, options);
      logger.warn.should.not.have.been.called();
      if (openAutocomplete) {
        sel.node().click();
        if (!(options && options.disabled)) {
          ss._.menu.dropdown.isOpen().should.equal(true);
        }
      }
      return test(ss);
    }

    function testClosedSingleSelect(items, options, test) {
      return testAutocomplete(false, items, options, test);
    }

    function testOpenSingleSelectWithSearch(items, options, test) {
      const opts = options || {};
      opts.showSearch = true;
      return testAutocomplete(true, items, opts, test);
    }

    function invalidItemsMessage(value) {
      return `SingleSelect: the items was expected to be an array of items or a function, you supplied: ${value}`;
    }

    before(() => {
      select('body').add(fixture);
      dropdownConfig.attachToSelector = fixture;
    });

    after(() => {
      fixture.remove();
      dropdownConfig.attachToSelector = 'body';
    });

    beforeEach(() => {
      fixture.clear();
      clock = installFakeTimers();
      chai.spy.on(logger, 'warn');
    });

    afterEach(() => {
      clock.restore();
      chai.spy.restore();
    });

    it('should have user facing text to use as defaults', () => {
      userFacingText('singleSelect', 'chooseValue').should.equal('Choose a value...');
      userFacingText('singleSelect', 'loading').should.equal('Loading...');
      userFacingText('singleSelect', 'noResults').should.equal('No Results Found');
      userFacingText('singleSelect', 'otherResults').should.equal('Other Results');
      userFacingText('singleSelect', 'search').should.equal('Search...');
    });

    it('should have the correct default options defined', () => {
      testClosedSingleSelect(trivialItems, undefined, (ss) => {
        ss._.options.should.eql({
          filter: undefined,
          filterOptions: undefined,
          matchType: undefined,
          useCache: undefined,
          trimTrailingSpaces: undefined,
          valueLookup: undefined,
          disabled: false,
          renderer: undefined,
          value: undefined,
          showSearch: false,
          required: false,
          chooseValueText: userFacingText('singleSelect', 'chooseValue'),
          searchText: userFacingText('singleSelect', 'search'),
          loadingText: userFacingText('singleSelect', 'loading'),
          noResultsText: userFacingText('singleSelect', 'noResults'),
          pleaseSelectAValueText: userFacingText('singleSelect', 'pleaseSelectAValueText'),
        });
      });
    });

    it('should not allow the dropdown to open when disabled is true', () => {
      const items = chai.spy();
      testOpenSingleSelectWithSearch(items, { disabled: true }, () => {
        items.should.not.have.been.called();
      });
    });

    it('should use the default renderer function if a valueLookup is defined', () => {
      function valueLookup(val) {
        return `dave:${val}`;
      }
      testClosedSingleSelect(trivialItems, {
        valueLookup,
      }, (ss) => {
        should.exist(ss._.renderer);
        // XXX Breaking: Renderer
        // ss._.renderer('bob').text().should.equal('dave:bob')
        const testValueLookupDiv = div();
        ss._.renderer(testValueLookupDiv.node(), 'bob');
        testValueLookupDiv.text().should.equal('dave:bob');
      });
    });

    it('should correctly class the selection', () => {
      const sel = div('bob');
      fixture.add(sel);
      new SingleSelect(sel, trivialItems);

      logger.warn.should.not.have.been.called();
      sel.classed('bob hx-single-select').should.equal(true);
    });

    it('should correctly set the renderer option', () => {
      function r() {}
      testClosedSingleSelect(trivialItems, {
        renderer: r,
      }, ss => ss.renderer().should.equal(r));
    });

    it('should initialise with a value when one is provided', () => {
      testClosedSingleSelect(trivialItems, { value: 'a' }, (ss) => {
        ss.value().should.equal('a');
      });
    });

    it('should focus the input when single select is opened', () => {
      testOpenSingleSelectWithSearch(trivialItems, undefined, () => {
        select(document.activeElement).classed('hx-single-select-input').should.equal(true);
        logger.warn.should.not.have.been.called();
      });
    });

    it('should clear the input value when the dropdown is opened', () => {
      testOpenSingleSelectWithSearch(trivialItems, undefined, (ss) => {
        const input = document.activeElement;
        input.value = 'a';
        ss.hide();
        const fakeEvent = {
          // fake some dom event stuff
          stopPropagation() {},
        };
        emit(ss._.selection.node(), 'click', fakeEvent);
        input.value.should.equal('');
      });
    });

    it('should allow user to use arrow keys to select a value', () => {
      testOpenSingleSelectWithSearch(trivialItems, undefined, (ss) => {
        // When doing a real keydown, the event propagates from the input.
        // This doesn't hsspen in the tests because we use the event emitter.
        const dropdown = ss._.menu.dropdown._.dropdown.node();
        emit(dropdown, 'keydown', {
          which: 40, // Down key
          preventDefault() {},
        });

        emit(dropdown, 'keydown', {
          which: 40,
          preventDefault() {},
        });

        emit(dropdown, 'keydown', {
          which: 13, // Enter key
          preventDefault() {},
        });

        ss.value().should.equal('b');
        logger.warn.should.not.have.been.called();
      });
    });

    it('should filter items when typing', () => {
      testOpenSingleSelectWithSearch(trivialItems, undefined, (ss) => {
        select(document.activeElement).value('b');
        emit(document.activeElement, 'input', {
          target: document.activeElement,
        });

        clock.tick(inputDebounceWait);
        ss._.menu.dropdown._.dropdown.selectAll('.hx-menu-item').text().should.eql(['b']);
        logger.warn.should.not.have.been.called();
      });
    });

    it('should not do anything when enter is pressed and the input is empty', () => {
      testOpenSingleSelectWithSearch(trivialItems, undefined, (ss) => {
        emit(document.activeElement, 'keydown', {
          which: 13,
        });

        should.not.exist(ss.value());
        ss._.menu.dropdown.isOpen().should.equal(true);
        logger.warn.should.not.have.been.called();
      });
    });

    it('should not select an item when the key pressed is not enter', () => {
      testOpenSingleSelectWithSearch(trivialItems, undefined, (ss) => {
        select(document.activeElement).value('b');
        emit(document.activeElement, 'keydown', {
          which: 40,
        });

        should.not.exist(ss.value());
        ss._.menu.dropdown.isOpen().should.equal(true);
        logger.warn.should.not.have.been.called();
      });
    });

    it('should select the first item when enter is pressed and a value is entered', () => {
      testOpenSingleSelectWithSearch(trivialItems, undefined, (ss) => {
        select(document.activeElement).value('b');
        emit(document.activeElement, 'input', {
          target: document.activeElement,
        });

        clock.tick(200);
        emit(document.activeElement, 'keydown', {
          keyCode: 13,
        });

        ss.value().should.equal('b');
        logger.warn.should.not.have.been.called();
      });
    });

    it('should show the "No Results Found" text when no values are found', () => {
      testOpenSingleSelectWithSearch(trivialItems, undefined, (ss) => {
        select(document.activeElement).value('d');
        emit(document.activeElement, 'input', {
          target: document.activeElement,
        });

        clock.tick(inputDebounceWait);
        ss._.menu.dropdown._.dropdown.selectAll('.hx-menu-item').text().should.eql([userFacingText('singleSelect', 'noResults')]);
        logger.warn.should.not.have.been.called();
      });
    });

    it('should not select the first item when enter is pressed and a value is entered if the value is "No Results"', () => {
      testOpenSingleSelectWithSearch(trivialItems, undefined, (ss) => {
        select(document.activeElement).value('d');
        emit(document.activeElement, 'input', {
          target: document.activeElement,
        });

        clock.tick(inputDebounceWait);
        ss._.menu.dropdown._.dropdown.selectAll('.hx-menu-item').text().should.eql([userFacingText('singleSelect', 'noResults')]);
        emit(document.activeElement, 'keydown', {
          keyCode: 13,
        });

        should.not.exist(ss.value());
        ss._.menu.dropdown.isOpen().should.equal(true);
        logger.warn.should.not.have.been.called();
      });
    });

    it('should not do anything when the menu emits en empty item', () => {
      testClosedSingleSelect(trivialItems, undefined, (ss) => {
        should.not.exist(ss.value());
        ss._.menu.emit('change', {
          content: 'a',
        });

        ss.value().should.equal('a');
        ss._.menu.emit('change', {
          content: undefined,
        });

        ss.value().should.equal('a');
      });
    });

    it('should show "Loading..." when results are loading', () => {
      testOpenSingleSelectWithSearch(trivialAsyncItems, undefined, (ss) => {
        ss._.menu.dropdown._.dropdown.selectAll('.hx-menu-item').text().should.eql([userFacingText('singleSelect', 'loading')]);
        logger.warn.should.not.have.been.called();
      });
    });

    it('should show a warning if invalid items are set', () => {
      new SingleSelect(div());
      logger.warn.should.have.been.called.with(invalidItemsMessage(undefined));
      new SingleSelect(div(), {});
      logger.warn.should.have.been.called.with(invalidItemsMessage({}));
      new SingleSelect(div(), undefined);
      logger.warn.should.have.been.called.with(invalidItemsMessage(undefined));
    });

    it('should show the choose value text when no value is selected', () => {
      testClosedSingleSelect(trivialItems, undefined, (ss) => {
        ss._.selection.select('.hx-single-select-value').value().should.equal('');
        ss._.selection.select('.hx-single-select-value').attr('placeholder').should.equal(userFacingText('singleSelect', 'chooseValue'));
      });
    });

    it('should show the choose value text if an invalid value is passed in', () => {
      testClosedSingleSelect(trivialItems, undefined, (ss) => {
        ss._.selection.select('.hx-single-select-value').value().should.equal('');
        ss.value('a');
        ss._.selection.select('.hx-single-select-value').value().should.equal('a');
        ss.value('d');
        ss._.selection.select('.hx-single-select-value').value().should.equal('');
      });
    });

    it('should set the value to "undefined" if an invalid value is passed in', () => {
      testClosedSingleSelect(trivialItems, undefined, (ss) => {
        ss._.selection.select('.hx-single-select-value').value().should.equal('');
        ss.value('a');
        ss._.selection.select('.hx-single-select-value').value().should.equal('a');
        ss.value('d');
        ss._.selection.select('.hx-single-select-value').value().should.equal('');
        should.not.exist(ss.value());
      });
    });

    it('should pass the "useCache" option to the autocomplete feed', () => {
      testClosedSingleSelect(trivialItems, { useCache: false }, (ss) => {
        ss._.feed._.options.useCache.should.equal(false);
      });
    });

    describe('api', () => {
      it('hide: should hide the dropdown', () => {
        testOpenSingleSelectWithSearch(trivialItems, undefined, (ss) => {
          ss._.menu.dropdown.isOpen().should.equal(true);
          ss.hide().should.equal(ss);
          ss._.menu.dropdown.isOpen().should.equal(false);
          logger.warn.should.not.have.been.called();
        });
      });

      it('disabled: should set and get the disabled state', () => {
        testClosedSingleSelect(trivialItems, undefined, (ss) => {
          ss.disabled().should.equal(false);
          ss.disabled(true).should.equal(ss);
          ss.disabled().should.equal(true);
          ss.disabled(false).should.equal(ss);
          ss.disabled().should.equal(false);
          logger.warn.should.not.have.been.called();
        });
      });

      it('clearCache: should call into the feed to clear the cache', () => {
        testClosedSingleSelect(trivialItems, undefined, (ss) => {
          chai.spy.on(ss._.feed, 'clearCache');
          ss.clearCache().should.equal(ss);
          ss._.feed.clearCache.should.have.been.called.exactly(1);
        });
      });

      it('value: should set and get the value', () => {
        testClosedSingleSelect(trivialItems, undefined, (ss) => {
          should.not.exist(ss.value());
          ss.value('a').should.equal(ss);
          ss.value().should.equal('a');
          ss.value('b').should.equal(ss);
          ss.value().should.equal('b');
          logger.warn.should.not.have.been.called();
        });
      });

      it('value: should use the first value if multiple results are returned from the filter', () => {
        const aObj = {
          name: 'a',
          location: 'a',
        };
        const bObj = {
          name: 'a',
          location: 'b',
        };
        const cObj = {
          name: 'a',
          location: 'c',
        };
        function valueLookup(item) {
          return item.name;
        }
        const items = [bObj, aObj, cObj];
        testClosedSingleSelect(items, {
          valueLookup,
        }, (ss) => {
          should.not.exist(ss.value());
          const callback = chai.spy();
          ss.value({
            name: 'a',
          }, callback).should.equal(ss);
          callback.should.have.been.called.with(bObj);
          ss.value().should.equal(bObj);
        });
      });

      it('value: should get and set the value as passed in', () => {
        const aObj = {
          name: 'a',
        };
        const bObj = {
          name: 'b',
        };
        const cObj = {
          name: 'c',
        };
        function valueLookup(item) {
          return item.name;
        }
        const items = [aObj, bObj, cObj];
        testClosedSingleSelect(items, {
          valueLookup,
        }, (ss) => {
          should.not.exist(ss.value());
          const callback = chai.spy();
          ss.value({
            name: 'a',
          }, callback).should.equal(ss);
          callback.should.have.been.called.with(aObj);
          ss.value().should.equal(aObj);
          ss.value({
            name: 'd',
          }, callback).should.equal(ss);
          callback.should.have.been.called.with(undefined);
          should.not.exist(ss.value());
        });
      });

      it('value: should not set the value when not in the item set', () => {
        testClosedSingleSelect(trivialItems, undefined, (ss) => {
          should.not.exist(ss.value());
          ss.value('d').should.equal(ss);
          should.not.exist(ss.value());
          logger.warn.should.not.have.been.called();
        });
      });

      it('value: should clear the value when set to undefined', () => {
        testClosedSingleSelect(trivialItems, undefined, (ss) => {
          should.not.exist(ss.value());
          ss.value('b');
          ss.value().should.equal('b');
          ss.value(undefined);
          should.not.exist(ss.value());
        });
      });

      it('value: should call the callback correctly when the value is in the item set', () => {
        testClosedSingleSelect(trivialAsyncItems, undefined, (ss) => {
          should.not.exist(ss.value());
          const callback = chai.spy();
          ss.value('a', callback).should.equal(ss);
          callback.should.not.have.been.called();
          clock.tick(trivialAsyncWait);
          callback.should.have.been.called.exactly(1);
          callback.should.have.been.called.with('a');
        });
      });

      it('value: should call the callback correctly when the value is in the item set', () => {
        testClosedSingleSelect(trivialAsyncItems, undefined, (ss) => {
          should.not.exist(ss.value());
          const callback = chai.spy();
          ss.value('d', callback).should.equal(ss);
          callback.should.not.have.been.called();
          clock.tick(trivialAsyncWait);
          callback.should.have.been.called.exactly(1);
          callback.should.have.been.called.with(undefined);
        });
      });

      it('items: should set and get the items', () => {
        testClosedSingleSelect(trivialItems, undefined, (ss) => {
          ss.items().should.equal(trivialItems);
          const items = ['a'];
          ss.items(items).should.equal(ss);
          ss.items().should.eql(items);
          logger.warn.should.not.have.been.called();
        });
      });

      it('items: should show a warning when called with invalid items', () => {
        testClosedSingleSelect(trivialItems, undefined, (ss) => {
          ss.items(undefined);
          logger.warn.should.have.been.called.with(invalidItemsMessage(undefined));
          ss.items({}).should.equal(ss);
          logger.warn.should.have.been.called.with(invalidItemsMessage({}));
          ss.items().should.eql(trivialItems);
        });
      });

      it('renderer: should set and get the renderer', () => {
        testClosedSingleSelect(trivialItems, undefined, (ss) => {
          should.exist(ss.renderer());
          function r() {}
          ss.renderer(r).should.equal(ss);
          ss.renderer().should.equal(r);
        });
      });
    });

    describe('events', () => {
      it('should emit the "highlight" event when a menu item is highlighted', () => {
        testOpenSingleSelectWithSearch(trivialItems, undefined, (ss) => {
          // When doing a real keydown, the event propagates from the input.
          // This doesn't hsspen in the tests because we use the event emitter.
          const highlight = chai.spy();
          ss.on('highlight', highlight);
          const dropdown = ss._.menu.dropdown._.dropdown.node();
          emit(dropdown, 'keydown', {
            which: 40, // Down key
            preventDefault() {},
          });

          highlight.should.have.been.called.with({
            eventType: 'arrow',
            content: 'a',
            menu: ss._.menu,
          });

          emit(dropdown, 'keydown', {
            which: 40,
            preventDefault() {},
          });

          highlight.should.have.been.called.with({
            eventType: 'arrow',
            content: 'b',
            menu: ss._.menu,
          });

          highlight.should.have.been.called.exactly(2);
          logger.warn.should.not.have.been.called();
        });
      });

      it('should emit the dropdown events with the "dropdown." prefix', () => {
        testClosedSingleSelect(trivialItems, undefined, (ss) => {
          const change = chai.spy();
          const hideend = chai.spy();
          const hidestart = chai.spy();
          const showend = chai.spy();
          const showstart = chai.spy();
          ss.on('dropdown.change', change);
          ss.on('dropdown.hideend', hideend);
          ss.on('dropdown.hidestart', hidestart);
          ss.on('dropdown.showend', showend);
          ss.on('dropdown.showstart', showstart);
          ss._.selection.node().click();
          change.should.have.been.called.with(true);
          showstart.should.have.been.called();
          showend.should.have.been.called();
          ss.hide();
          change.should.have.been.called.with(false);
          hidestart.should.have.been.called();
          hideend.should.have.been.called();
          change.should.have.been.called.exactly(2);
          hideend.should.have.been.called.exactly(1);
          hidestart.should.have.been.called.exactly(1);
          showend.should.have.been.called.exactly(1);
          showstart.should.have.been.called.exactly(1);
        });
      });

      // XXX Breaking: Autocomplete always emit on value set
      // (#438) - This change introduced a breaking bug, reverting until next major
      // it 'should emit the "change" event when the value is changed to undefined', ->
      //   testClosedSingleSelect trivialItems, { value: 'a' }, (ss) ->
      //     value = chai.spy()
      //     ss.on 'change', value
      //     ss.value(undefined)
      //     value.should.have.been.called.with({
      //       cause: 'api',
      //       value: undefined
      //     })
      //     value.should.have.been.called.once
      it('should emit the "change" event when the value is changed', () => {
        testClosedSingleSelect(trivialItems, undefined, (ss) => {
          const value = chai.spy();
          ss.on('change', value);
          ss.value('a');
          value.should.have.been.called.with({
            cause: 'api',
            value: 'a',
          });

          value.should.have.been.called.exactly(1);
        });

        testOpenSingleSelectWithSearch(trivialItems, undefined, (ss) => {
          const value = chai.spy();
          ss.on('change', value);
          select(document.activeElement).value('b');
          emit(document.activeElement, 'input', {
            target: document.activeElement,
          });

          clock.tick(inputDebounceWait);
          emit(document.activeElement, 'keydown', {
            keyCode: 13,
          });

          value.should.have.been.called.with({
            cause: 'user',
            value: 'b',
          });

          value.should.have.been.called.exactly(1);
          logger.warn.should.not.have.been.called();
        });
      });
    });

    describe('singleSelect', () => {
      it('should a selection with an autocomplete single select component', () => {
        const d = singleSelect(['a']);
        d.should.be.an.instanceOf(Selection);
        d.api().should.be.an.instanceOf(SingleSelect);
        d.api('single-select').should.be.an.instanceOf(SingleSelect);
        d.api('menu').should.be.an.instanceOf(Menu);
        d.api('dropdown').should.be.an.instanceOf(Dropdown);
      });

      it('should pass the options through to the autocomplete single select', () => {
        const d = singleSelect(['a'], {
          matchType: 'external',
        });

        d.api()._.options.matchType.should.equal('external');
      });
    });
  });
};
