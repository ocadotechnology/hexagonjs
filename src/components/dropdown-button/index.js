import logger from 'utils/logger';
import { merge } from 'utils/utils';
import { actionRenderWrapper } from 'utils/dom-utils';
import { button } from 'utils/selection';
import { MenuBase } from 'components/menu';

const supportedTypes = ['primary', 'secondary'];
const supportedSizes = ['small', 'micro'];

function dropdownButton(options) {
  const sel = button('hx-btn hx-dropdown-button hx-flag-button');
  const { text, type, size } = options;

  const forcedOptions = {
    renderer: actionRenderWrapper,
  };

  const opts = merge({}, options, forcedOptions);

  if (text) {
    sel.text(text);
  }

  const validType = !type || supportedTypes.includes(type);
  const validSize = !size || supportedSizes.includes(size);
  if (!validType) {
    logger.warn(`dropdownButton: Called with an invalid type: '${type}'. Supported types: ${supportedTypes.join(', ')}`);
  }
  if (!validSize) {
    logger.warn(`dropdownButton: Called with an invalid size: '${size}'. Supported sizes: ${supportedSizes.join(', ')}`);
  }
  sel
    .classed(`hx-${type}`, type && validType)
    .classed(`hx-btn-${size}`, size && validSize);

  new MenuBase(sel, opts);
  return sel;
}

export {
  dropdownButton,
};
