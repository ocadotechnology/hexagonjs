import { palette } from 'utils/palette';
import { span } from 'utils/selection';

// XXX: 2.0.0 moved modules (from fluid) - document this change

function label(options = {}) {
  const { context } = options;
  return palette.context(span('hx-label'), context);
}

export {
  label,
};
