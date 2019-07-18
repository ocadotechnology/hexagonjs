import { EventEmitter } from 'utils/event-emitter';

import { userFacingText } from 'utils/user-facing-text';

import {
  select,
  div,
  span,
  i,
  detached,
  input,
} from 'utils/selection';

import {
  merge,
  identity,
  debounce,
  isFunction,
} from 'utils/utils';

import logger from 'utils/logger';

import { AutocompleteFeed } from 'utils/autocomplete-feed';

import { Menu } from 'components/menu';

userFacingText({
  singleSelect: {
    chooseValue: 'Choose a value...',
    search: 'Search...',
    loading: 'Loading...',
    noResults: 'No Results Found',
    otherResults: 'Other Results',
    pleaseSelectAValueText: 'Please select a value from the list',
  },
});

const enterKeyCode = 13;
const debounceDuration = 200;

function validateItems(feed, items) {
  if (!feed.validateItems(items)) {
    logger.warn(`SingleSelect: the items was expected to be an array of items or a function, you supplied: ${items}`);
    return false;
  }
  return true;
}

function setValue(picker, results, cause) {
  const { _ } = picker;
  _.valueInput.value('');
  _.current = undefined;
  if (results.length) {
    const [value] = results;
    picker.emit('change', { cause, value });
    _.current = value;
    _.valueInput.value(_.valueLookup(value));
    return;
  }
  _.valueInput.text(_.options.chooseValueText);
}

class SingleSelect extends EventEmitter {
  constructor(selector, items, options = {}) {
    super();
    const defaultOptions = {
      // Options passed to the feed - defaultOptions defined there
      filter: undefined,
      filterOptions: undefined,
      matchType: undefined,
      useCache: undefined,
      trimTrailingSpaces: undefined,
      valueLookup: undefined, // Used by the feed and by the `value` method

      // Options used by the picker
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
    };

    if (options.valueLookup) {
      defaultOptions.renderer = (element, item) => select(element).text(options.valueLookup(item));
    }
    const resolvedOptions = merge({}, defaultOptions, options);

    const selection = select(selector).classed('hx-single-select', true);

    const valueInput = input('hx-input hx-single-select-value')
      .attr('placeholder', resolvedOptions.chooseValueText)
      .attr('tabindex', -1)
      .attr('required', resolvedOptions.required ? true : undefined);

    const setValidity = (value) => {
      const node = valueInput.node();
      if (value === undefined) {
        node.setCustomValidity(resolvedOptions.pleaseSelectAValueText);
      } else {
        node.setCustomValidity('');
      }
    };

    const shouldDebounce = isFunction(items);

    selection
      .add(valueInput)
      .add(span('hx-single-select-icon').add(i('hx-icon hx-icon-caret-down')));

    const feedOptions = {
      filter: resolvedOptions.filter,
      filterOptions: resolvedOptions.filterOptions,
      matchType: resolvedOptions.matchType,
      showOtherResults: resolvedOptions.showOtherResults,
      trimTrailingSpaces: resolvedOptions.trimTrailingSpaces,
      valueLookup: resolvedOptions.valueLookup,
      useCache: resolvedOptions.useCache,
    };
    const feed = new AutocompleteFeed(feedOptions);

    const noResultsItem = {
      text: resolvedOptions.noResultsText,
      unselectable: true,
    };

    const loadingItem = {
      text: resolvedOptions.loadingText,
      unselectable: true,
    };

    this._ = {
      selection,
      options: resolvedOptions,
      valueInput,
      feed,
      valueLookup: resolvedOptions.valueLookup || identity,
    };
    if (!validateItems(feed, items)) {
      return;
    }
    feed.items(items);
    // XXX Breaking: Renderer
    const renderWrapper = (element, item) => {
      const sel = select(element);
      sel.classed('hx-single-select-heading', item.heading);
      if (item.unselectable || item.heading) {
        sel.text(item.text);
        return;
      }
      this._.renderer(element, item);
    };

    const searchInput = detached('input').class('hx-input hx-single-select-input')
      .attr('placeholder', resolvedOptions.searchText);

    const menu = new Menu(selection, {
      dropdownOptions: {
        ddClass: 'hx-single-select-dropdown',
      },
      featureFlags: {
        useUpdatedStructure: true,
        compact: resolvedOptions.showSearch,
      },
      extraContent: resolvedOptions.showSearch ? div('hx-single-select-input-container').add(searchInput) : undefined,
    });

    const renderMenu = (renderItems) => {
      menu.items(renderItems);
      return menu.render();
    };

    const populateMenu = term => (
      feed.filter(term, (results) => {
        if (results.length === 0) {
          results.push(noResultsItem);
        }
        renderMenu(results);
      })
    );

    const debouncedPopulate = debounce(debounceDuration, populateMenu);

    const setValueAndHide = (item) => {
      setValue(this, [item], 'user');
      menu.hide();
    };

    searchInput.on('input', (e) => {
      if (shouldDebounce) {
        renderMenu([loadingItem]);
        debouncedPopulate(e.target.value);
        return;
      }
      populateMenu(e.target.value);
    }).on('keydown', (e) => {
      if (searchInput.value().length) {
        if ((e.which || e.keyCode) === enterKeyCode && menu.cursorPos === -1) {
          const [topItem] = menu.items();
          if (!topItem.unselectable) {
            setValueAndHide(topItem);
          }
        }
      }
    });

    this._.renderer = resolvedOptions.renderer || menu.renderer();
    this._.menu = menu;
    menu.renderer(renderWrapper);

    menu.dropdown.on('showstart', () => {
      searchInput.value('');
      renderMenu([loadingItem]);
      populateMenu(searchInput.value());
      searchInput.node().focus();
    });
    menu.dropdown.on('showend', () => searchInput.node().focus());
    menu.on('change', (item) => {
      if ((item != null) && (item.content != null)) {
        setValueAndHide(item.content);
      }
    });
    menu.pipe(this, '', ['highlight']);
    menu.dropdown.pipe(this, 'dropdown');
    if (resolvedOptions.value) {
      this.value(resolvedOptions.value);
    }
    if (resolvedOptions.disabled) {
      this.disabled(resolvedOptions.disabled);
    }
    if (resolvedOptions.required) {
      setValidity();
      this.on('change', 'hx.single-select', ({ value }) => setValidity(value));
    }

    selection
      .api('single-select', this)
      .api(this);
  }

  clearCache() {
    this._.feed.clearCache();
    return this;
  }

  hide() {
    this._.menu.hide();
    return this;
  }

  disabled(disable) {
    const menuDisable = this._.menu.disabled(disable);
    // menu.disabled returns the wrong 'this' so we return the correct things below
    if (disable != null) {
      this._.valueInput.attr('disabled', disable ? 'disabled' : undefined);
      return this;
    }
    return menuDisable;
  }

  items(items) {
    if (arguments.length) {
      if (validateItems(this._.feed, items)) {
        this._.feed.items(items);
        this.value(this._.current);
      }
      return this;
    }
    return this._.feed.items();
  }

  value(value, callback) {
    const { _ } = this;
    if (arguments.length) {
      _.valueInput.value(_.options.loadingText);
      _.feed.filter(_.valueLookup(value), (results) => {
        setValue(this, results, 'api');
        return typeof callback === 'function' ? callback(results[0]) : undefined;
      });
      return this;
    }
    return _.current;
  }

  renderer(f) {
    if (f != null) {
      this._.renderer = f;
      return this;
    }
    return this._.renderer;
  }
}

function singleSelect(items, options) {
  const selection = div();
  new SingleSelect(selection, items, options);
  return selection;
}

export {
  singleSelect,
  SingleSelect,
};
