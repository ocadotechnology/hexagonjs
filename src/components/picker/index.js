import { EventEmitter } from 'utils/event-emitter';
import { userFacingText } from 'utils/user-facing-text';
import { AutocompleteFeed } from 'components/autocomplete-feed';
import { Menu } from 'components/menu';

import {
  select,
  span,
  button,
  input,
  div,
  i,
} from 'utils/selection';

import {
  mergeDefined,
} from 'utils/utils';

userFacingText({
  picker: {
    chooseValue: 'Choose a value...',
    loading: 'Loading...',
    noResults: 'No Results Found',
    otherResults: 'Other Results',
  },
});

const enterKeyCode = 13;

function getValue(value, items) {
  const allItems = items.reduce((acc, curr) => {
    if (curr.children) {
      return [...acc, ...curr.children];
    }
    return [...acc, curr];
  }, []);

  return allItems.find(item => item === value
    || (item.value && item.value === value)
    || (value && value.value && item.value === value.value));
}

class Picker extends EventEmitter {
  constructor(selector, options = {}) {
    super();

    const resolvedOptions = mergeDefined({
      dropdownOptions: {},
      items: [],
      noValueText: userFacingText('picker', 'chooseValue'),
      loadingText: userFacingText('picker', 'loading'),
      noResultsText: userFacingText('picker', 'noResults'),
      otherResultsText: userFacingText('picker', 'otherResults'),
      renderer: undefined,
      value: undefined,
      disabled: false,
      fullWidth: false,
      featureFlags: {
        required: false,
        useUpdatedStructure: false,
        showFilter: false,
      },
    }, options);

    const {
      renderer,
      items,
      value,
      noValueText,
      fullWidth,
      dropdownOptions,
      disabled,
    } = resolvedOptions;

    const {
      useUpdatedStructure,
      required,
      showFilter,
      filter,
      filterOptions,
      matchType,
      showOtherResults,
      trimTrailingSpaces,
      valueLookup,
      useCache,
    } = resolvedOptions.featureFlags;

    this.selection = select(selector)
      .classed('hx-picker', true)
      .api('picker', this)
      .api(this);

    let selectedText;
    if (useUpdatedStructure) {
      selectedText = div('hx-input hx-picker-text')
        .attr('data-placeholder', noValueText);
      this.selection
        .classed('hx-flag-picker', true)
        .classed('hx-picker-full-width', fullWidth)
        .add(selectedText)
        .add(i('hx-icon hx-icon-caret-down'));
    } else {
      selectedText = span('hx-picker-text');
      this.selection
        .classed('hx-btn', true)
        .classed('hx-picker-full-width', fullWidth)
        .add(span('hx-picker-inner').attr('type', 'button')
          .add(selectedText)
          .add(span('hx-picker-icon')
            .add(i('hx-icon hx-icon-caret-down'))));
    }

    const filterInputContainer = showFilter && div('hx-picker-input').add(input('hx-input'));

    const menu = new Menu(selector, {
      dropdownOptions,
      items,
      disabled,
      featureFlags: {
        useUpdatedStructure,
        compact: showFilter,
      },
      extraContent: filterInputContainer,
    });

    if (filterInputContainer) {
      const feedOptions = {
        filter,
        filterOptions,
        matchType,
        showOtherResults,
        trimTrailingSpaces,
        valueLookup,
        useCache,
      };

      const feed = new AutocompleteFeed(feedOptions);

      feed.items(items);

      const filterInput = filterInputContainer.select('input')
        .on('input', (e) => {
          const inputValue = e.target.value;
          feed.filter(inputValue, filteredItems => menu.items(filteredItems));
        })
        .on('keydown', (e) => {
          const inputValue = e.target.value;
          const isEnter = (e.which || e.keyCode) === enterKeyCode;
          if (inputValue.length && isEnter && menu.cursorPos === -1) {
            const topItem = menu.items()[0];
            const itemToUse = topItem.children ? topItem.children[0] : topItem;

            if (itemToUse && !itemToUse.unselectable) {
              this.setValue(itemToUse, 'user');
            }
          }
        });

      menu.dropdown.on('hideend', () => {
        menu.items(this._.items);
      });
      menu.dropdown.on('showend', () => {
        filterInput.value('');
        filterInput.node().focus();
      });
    }

    menu.pipe(this, '', ['highlight']);
    menu.dropdown.pipe(this, 'dropdown');
    menu.on('change', 'hx.picker', (item) => {
      if ((item != null ? item.content : undefined) != null) {
        this.setValue(item.content, 'user');
        menu.hide();
      }
    });

    this._ = {
      menu,
      renderer,
      options: resolvedOptions,
      selectedText,
      current: undefined,
    };

    if (renderer == null) {
      this.renderer(menu.renderer());
    }
    // XXX Breaking: Renderer
    // menu.renderer((item) => @renderer()(item))
    menu.renderer((node, item) => this._.renderer(node, item));

    if (items) {
      this._.items = items;
      this._.menu.items(items);
    }

    if (value === undefined && useUpdatedStructure && required) {
      this.valid(false);
    }

    this.value(value);
  }

  setValue(value, cause = 'api') {
    const newVal = getValue(value, this.items());

    if (newVal != null) {
      // XXX Breaking: Renderer
      // this._.selectedText.set(this._.renderer(newVal))
      this.valid(true);
      this._.renderer(this._.selectedText.node(), newVal);
    } else {
      const { useUpdatedStructure, required } = this._.options.featureFlags;
      this.valid(!(useUpdatedStructure && required));
      if (useUpdatedStructure) {
        this._.selectedText.text('');
      } else {
        this._.selectedText.text(this._.options.noValueText);
      }
    }
    if (this._.current !== newVal) {
      this._.current = newVal;
      this.emit('change', {
        value: newVal,
        cause,
      });
    }
  }

  renderer(f) {
    if (f != null) {
      this._.renderer = f;
      return this;
    }
    return this._.renderer;
  }

  items(items) {
    if (items != null) {
      this._.items = items;
      this._.menu.items(items);
      this.value(this._.current);
      return this;
    }
    return this._.items;
  }

  value(value) {
    if (arguments.length > 0) {
      this.setValue(value);
      return this;
    }
    return this._.current;
  }

  disabled(disable) {
    const menuDisable = this._.menu.disabled(disable);
    // menu.disabled returns the wrong 'this' so we return the correct things below
    if (disable != null) {
      return this;
    }
    return menuDisable;
  }

  valid(isValid) {
    if (arguments.length) {
      this._.selectedText.classed('hx-input-invalid', !isValid);
      return this;
    }
    return this._.selectedText.classed('hx-input-invalid');
  }
}

function picker(options = {}) {
  const selection = options.featureFlags && options.featureFlags.useUpdatedStructure
    ? div(options.class)
    : button(options.class);
  new Picker(selection, options);
  return selection;
}

export {
  Picker,
  picker,
};
