import { isString } from 'utils/utils';
import { detached, div, select } from 'utils/selection';

function actionRenderer({ text, onClick, disabled }) {
  if (isString(onClick)) {
    const link = detached('a')
      .text(text);
    if (!disabled && onClick) {
      link.attr('href', onClick);
    }
    return link;
  }
  const sel = div()
    .text(text);

  if (!disabled && onClick) {
    sel.on('click', onClick);
  }
  return sel;
}

function actionRenderWrapper(elem, item) {
  const sel = select(elem);
  const cls = sel.class();
  const retSel = actionRenderer(item);
  retSel.classed(cls, true);
  sel.insertBefore(retSel);
  sel.remove();
}

export {
  actionRenderer,
  actionRenderWrapper,
};
