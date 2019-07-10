import logger from 'utils/logger';
import { merge } from 'utils/utils';
import { button } from 'utils/selection';
import { actionRenderWrapper } from 'utils/dom-utils';
import { MenuBase } from 'components/menu';

const supportedSizes = ['small', 'micro'];
function moreButton(options) {
  const sel = button('hx-btn hx-more-button hx-flag-button');
  const { text, size } = options;

  const forcedOptions = {
    renderer: actionRenderWrapper,
  };

  const opts = merge({
    dropdownOptions: {
      align: 'rbrt',
    },
  }, options, forcedOptions);

  if (text) {
    sel.text(text);
  }

  const validSize = !size || supportedSizes.includes(size);
  if (!validSize) {
    logger.warn(`moreButton: Called with an invalid size: '${size}'. Supported sizes: ${supportedSizes.join(', ')}`);
  }
  sel
    .classed(`hx-btn-${size}`, size && validSize);

  new MenuBase(sel, opts);
  return sel;
}

export {
  moreButton,
};
