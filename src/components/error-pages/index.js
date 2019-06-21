import { div, detached, button } from 'utils/selection';
import { toMultilineSelection } from 'utils/user-facing-text';
import logger from 'utils/logger';

const validTypes = ['primary', 'secondary'];

function makeAction(btn) {
  const {
    text,
    url,
    onClick,
    buttonType,
  } = btn;

  const validButtonType = buttonType && validTypes.includes(buttonType);

  if (buttonType && !validButtonType) {
    logger.warn(`errorPage: Invalid button type selected '${buttonType}'. Available types: [${validTypes.join(', ')}]`);
  }

  const cls = `hx-btn${validButtonType ? ` hx-${buttonType}` : ''}`;

  if (onClick) {
    return button(cls)
      .text(text)
      .on('click', onClick);
  }

  if (!url) {
    throw new Error(`errorPage: Button created with no 'onClick' or 'url': ${JSON.stringify(btn)}`);
  }

  return detached('a')
    .class(cls)
    .text(text)
    .attr('href', url);
}

function errorPage(options = {}) {
  const {
    title,
    message,
    buttons,
  } = options;

  if (!title) {
    throw new Error('errorPage: Cannot create an error page with no title.');
  }

  const buttonSel = (buttons || []).map(makeAction);

  return div('hx-error-message hx-flag-button hx-flag-typography')
    .add(div('hx-error-message-heading').text(title))
    .add(div('hx-error-message-body')
      .add(toMultilineSelection(message || '', 'p', true)))
    .add(div('hx-error-message-buttons')
      .add(buttonSel));
}

export {
  errorPage,
  makeAction,
};
