import { div, select } from 'utils/selection';
import { mergeDefined } from 'utils/utils';
import { StatusBar, optionSetterGetter } from 'components/status-bar';

class VisualizationBar {
  constructor(selector, options) {
    this.options = mergeDefined({
      title: undefined,
      breakdown: undefined,
      segments: [],
    }, options);

    this.selection = select(selector)
      .classed('hx-visualization-bar', true)
      .api('visualization-bar', this)
      .api(this);

    this._ = {};

    if (!this.options.segments.length) {
      throw new Error('VisualizationBar: Expected at least one segment to display');
    }

    this._.bar = new StatusBar(this.selection, {
      title: this.options.title,
      breakdown: this.options.breakdown,
      segments: this.options.segments,
    });

    this.title = optionSetterGetter('title', undefined, this._.bar).bind(this);
    this.breakdown = optionSetterGetter('breakdown', undefined, this._.bar).bind(this);
    this.segments = optionSetterGetter('segments', undefined, this._.bar).bind(this);
  }
}

function visualizationBar(options) {
  const sel = div();
  new VisualizationBar(sel, options);
  return sel;
}

export {
  visualizationBar,
  VisualizationBar,
};
