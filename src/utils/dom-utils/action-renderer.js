import { isString } from 'utils/utils';
import { detached, div, select } from 'utils/selection';

function actionRenderer({ text, onClick, disabled }) {
  if (!onClick) {
    throw new Error('Action items require an onClick function or url');
  }
  if (isString(onClick)) {
    const link = detached('a')
      .text(text);
    if (!disabled) {
      link.attr('href', onClick);
    }
    return link;
  }
  const sel = div()
    .text(text);

  if (!disabled) {
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
  return retSel;
}

export {
  actionRenderer,
  actionRenderWrapper,
};
