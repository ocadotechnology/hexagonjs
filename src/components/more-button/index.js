import logger from 'utils/logger';
import { merge } from 'utils/utils';
import { button } from 'utils/selection';
import { actionRenderWrapper } from 'utils/dom-utils';
import { MenuBase } from 'components/menu';

const supportedSizes = ['small', 'micro'];
function moreButton(options) {
  const { text, size } = options;

  const forcedOptions = {
    renderer: actionRenderWrapper,
  };

  const opts = merge({
    items: [],
    dropdownOptions: {
      align: 'rbrt',
    },
  }, options, forcedOptions);

  if (!opts.items.length) {
    throw new Error('moreButton: Items are required when creating a more button');
  }

<<<<<<< HEAD
  const validSize = supportedSizes.includes(size);

  if (size && !validSize) {
=======
  const validSize = !size || supportedSizes.includes(size);
  if (!validSize) {
>>>>>>> chore: Fix linting issue
    logger.warn(`moreButton: Called with an invalid size: '${size}'. Supported sizes: ${supportedSizes.join(', ')}`);
  }

  const sel = button('hx-btn hx-more-button hx-flag-button')
    .classed(`hx-btn-${size}`, validSize);

  if (text) {
    sel.text(text);
  }

  new MenuBase(sel, opts);
  return sel;
}

export {
  moreButton,
};
