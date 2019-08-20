import logger from 'utils/logger';
import { merge } from 'utils/utils';
import { actionRenderWrapper } from 'utils/dom-utils';
import { button } from 'utils/selection';
import { MenuBase } from 'components/menu';

const supportedTypes = ['primary', 'secondary'];
const supportedSizes = ['small', 'micro'];

function dropdownButton(options) {
  const { text, type, size } = options;

  const forcedOptions = {
    renderer: actionRenderWrapper,
  };

  const opts = merge({
    items: [],
  }, options, forcedOptions);

  if (!opts.items.length) {
    throw new Error('dropdownButton: Items are required when creating a dropdown button');
  }

  const validType = supportedTypes.includes(type);
  const validSize = supportedSizes.includes(size);

  if (type && !validType) {
    logger.warn(`dropdownButton: Called with an invalid type: '${type}'. Supported types: ${supportedTypes.join(', ')}`);
  }
  if (size && !validSize) {
    logger.warn(`dropdownButton: Called with an invalid size: '${size}'. Supported sizes: ${supportedSizes.join(', ')}`);
  }

  const sel = button('hx-btn hx-dropdown-button hx-flag-button')
    .classed(`hx-${type}`, validType)
    .classed(`hx-btn-${size}`, validSize);

  if (text) {
    sel.text(text);
  }

  new MenuBase(sel, opts);
  return sel;
}

export {
  dropdownButton,
};
