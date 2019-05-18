import { span } from 'utils/selection';
import logger from 'utils/logger';

const supportedTypes = ['success', 'danger', 'warning'];

function badge(options = {}) {
  const { type, inverse } = options;
  const validType = !type || supportedTypes.includes(type);
  if (!validType) {
    logger.warn(`badge: Badge was called with an invalid type: '${type}'. Supported types: ${supportedTypes.join(', ')}`);
  }
  return span('hx-badge')
    .classed('hx-badge-inverse', inverse)
    .classed(`hx-${type}`, type && validType);
}

export {
  badge,
};
