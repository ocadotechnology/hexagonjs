import { div, detached, button } from 'utils/selection';
import { isString } from 'utils/utils';
import { toMultilineSelection } from 'utils/user-facing-text';

function makeAction({ text, action, buttonType }) {
  const cls = buttonType === 'back'
    ? 'hx-page-header-back-button'
    : `hx-btn ${buttonType ? `hx-${buttonType}` : ''}`;
  if (isString(action)) {
    return detached('a')
      .class(cls)
      .text(text)
      .attr('href', action);
  }
  return button(cls)
    .text(text)
    .on('click', action);
}

function errorPage(options = {}) {
  const buttons = (options.buttons || []).map(makeAction);
  return div('hx-error-message hx-flag-button hx-flag-typography')
    .add(div('hx-error-message-heading').text(options.title))
    .add(div('hx-error-message-body')
      .add(toMultilineSelection(options.message, 'p', true)))
    .add(div('hx-error-message-buttons')
      .add(buttons));
}

export {
  errorPage,
};
