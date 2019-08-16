import { EventEmitter } from 'utils/event-emitter';
import { userFacingText } from 'utils/user-facing-text';
import logger from 'utils/logger';
import { AutocompleteFeed } from 'utils/autocomplete-feed';
import { MenuBase as Menu } from 'components/menu';
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
  debounce,
  isFunction,
} from 'utils/utils';

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

function setValue(ss, value, cause) {
  const { _ } = ss;
  _.valueInput.value('');
  _.current = undefined;
  if (value) {
    if (value.children) {
      [_.current] = value.children;
    } else {
      _.current = value;
    }
  }
  _.valueInput.value(_.current ? _.valueLookup(_.current) : '');
  ss.emit('change', { cause, value: _.current });
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

      // Options used by the ss
      disabled: false,
      valueLookup: item => (item ? (item.value || item) : undefined),
      renderer: (element, item) => {
        const sel = select(element);
        if (item && item.children) {
          sel.text(item.text);
        } else {
          sel.text(this._.options.valueLookup(item));
        }
      },
      value: undefined,
      showSearch: false,
      required: false,
      chooseValueText: userFacingText('singleSelect', 'chooseValue'),
      searchText: userFacingText('singleSelect', 'search'),
      loadingText: userFacingText('singleSelect', 'loading'),
      noResultsText: userFacingText('singleSelect', 'noResults'),
      pleaseSelectAValueText: userFacingText('singleSelect', 'pleaseSelectAValueText'),
    };

    const resolvedOptions = merge({}, defaultOptions, options);

    const {
      filter,
      filterOptions,
      matchType,
      showOtherResults,
      trimTrailingSpaces,
      valueLookup,
      useCache,
      chooseValueText,
      required,
      pleaseSelectAValueText,
      noResultsText,
      showSearch,
      searchText,
      loadingText,
      renderer,
      value,
      disabled,
    } = resolvedOptions;

    const selection = select(selector);

    const valueInput = input('hx-input hx-single-select-value')
      .attr('placeholder', chooseValueText)
      .attr('tabindex', -1)
      .attr('required', required ? true : undefined);

    const setValidity = (val) => {
      const node = valueInput.node();
      if (val === undefined) {
        node.setCustomValidity(pleaseSelectAValueText);
      } else {
        node.setCustomValidity('');
      }
    };

    const shouldDebounce = isFunction(items);

    const feed = new AutocompleteFeed({
      filter,
      filterOptions,
      matchType,
      showOtherResults,
      trimTrailingSpaces,
      valueLookup,
      useCache,
    });

    const noResultsItem = {
      text: noResultsText,
      unselectable: true,
    };

    const loadingItem = {
      text: loadingText,
      unselectable: true,
    };

    this._ = {
      selection,
      options: resolvedOptions,
      valueInput,
      feed,
      valueLookup,
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
      .attr('placeholder', searchText);

    const menu = new Menu(selection, {
      dropdownOptions: {
        ddClass: 'hx-single-select-dropdown',
      },
      featureFlags: {
        useUpdatedStructure: true,
      },
      extraContent: showSearch ? div('hx-single-select-input-container').add(searchInput) : undefined,
    });

    const renderMenuItems = (itemsToRender) => {
      menu.items(itemsToRender);
      menu.render();
    };

    const filterAndRenderMenu = term => (
      feed.filter(term, (results) => {
        if (results.length === 0) {
          results.push(noResultsItem);
        }
        renderMenuItems(results);
      })
    );

    const debouncedPopulate = debounce(debounceDuration, filterAndRenderMenu);

    const setValueAndHide = (item) => {
      setValue(this, item, 'user');
      menu.hide();
    };

    searchInput
      .on('input', (e) => {
        if (shouldDebounce) {
          renderMenuItems([loadingItem]);
          debouncedPopulate(e.target.value);
          return;
        }
        filterAndRenderMenu(e.target.value);
      })
      .on('keydown', (e) => {
        if (searchInput.value().length) {
          if ((e.which || e.keyCode) === enterKeyCode && menu.cursorPos === -1) {
            const [topItem] = menu.items();
            if (!topItem.unselectable) {
              setValueAndHide(topItem);
            }
          }
        }
      });

    this._.renderer = renderer || menu.renderer();
    this._.menu = menu;

    menu
      .renderer(renderWrapper)
      .on('change', (item) => {
        if ((item != null) && (item.content != null)) {
          setValueAndHide(item.content);
        }
      })
      .on('highlight', 'hx.single-select', ({ content, eventType }) => this.emit('highlight', {
        cause: 'user',
        value: {
          item: content,
          eventType,
        },
      }));

    menu.dropdown
      .on('showstart', () => {
        searchInput.value('');
        renderMenuItems([loadingItem]);
        filterAndRenderMenu(searchInput.value());
        searchInput.node().focus();
      })
      .on('showend', () => searchInput.node().focus());

    menu.dropdown.pipe(this, 'dropdown');

    if (value) {
      this.value(value);
    }
    if (disabled) {
      this.disabled(disabled);
    }

    if (required) {
      setValidity();
      this.on('change', 'hx.single-select', event => setValidity(event.value));
    }

    selection
      .add(valueInput)
      .add(span('hx-single-select-icon').add(i('hx-icon hx-icon-caret-down')))
      .classed('hx-single-select', true)
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
      if (value) {
        _.valueInput.value(_.options.loadingText);
        _.feed.filter(_.valueLookup(value), (results) => {
          const [retVal] = results;
          setValue(this, retVal, 'api');
          return typeof callback === 'function' ? callback(retVal) : undefined;
        });
      } else {
        setValue(this, undefined, 'api');
      }
      return this;
    }
    return _.current;
  }

  renderer(renderer) {
    if (renderer != null) {
      this._.renderer = renderer;
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
