import { palette } from 'utils/palette';
import { span } from 'utils/selection';
import logger from 'utils/logger';

// XXX: 2.0.0 moved modules (from fluid) - document this change
function label(options = {}) {
  logger.deprecated('label', 'The label module has been replaced by the badge module');
  const { context } = options;
  return palette.context(span('hx-label'), context);
}

export {
  label,
};
