import { div } from 'utils/selection';

import { ProgressBar as ProgressBarV1 } from './progress-bar.coffee';
import { ProgressBar as ProgressBarV2 } from './progress-bar';


function ProgressBar(selector, options = {}) {
  if (options.featureFlags && options.featureFlags.useUpdatedClass) {
    return new ProgressBarV2(selector, options);
  }
  return new ProgressBarV1(selector, options);
}

function progressBar(options = {}) {
  const sel = div();
  if (options.featureFlags && options.featureFlags.useUpdatedClass) {
    new ProgressBarV2(sel, options);
  } else {
    new ProgressBarV1(sel, options);
  }
  return sel;
}

export {
  progressBar,
  ProgressBar,
};
