import { EventEmitter } from 'utils/event-emitter';
import { select, div } from 'utils/selection';
import { mergeDefined, defined } from 'utils/utils';
import { VisualizationBar } from './visualization-bar';
import { VisualizationBarSizes, VisualizationBarTypes } from '../lib';

export class ProgressVisualizationBar extends EventEmitter {
  constructor(selector, options) {
    super();
    this.options = mergeDefined({
      progress: 0,
      max: undefined,
      buffer: 0,
      valid: true,
      content: '',
      disabled: false,
      withPercent: false,
      progressLabel: '',
      bufferLabel: '',
      balanceLabel: '',
      withMax: true,
      size: VisualizationBarSizes.STANDARD,
    }, options);

    this.barsList = [
      {
        value: this.options.progress,
        color: 'action',
        label: this.options.progressLabel,
      },
      {
        value: this.options.buffer,
        color: 'info',
        label: this.options.bufferLabel,
      },
      {
        value: this.options.max - this.options.progress - this.options.buffer,
        color: 'contrast',
        label: this.options.balanceLabel,
      },
    ];

    this.selection = select(selector)
      .classed('hx-visualization-bar', true)
      .classed('hx-visualization-bar-secondary', this.options.secondary);

    this.header = div('hx-visualization-bar-header');
    this.titleElement = div('hx-header-small');
    this.countElement = div('hx-header-small');
    this.contentElement = div('hx-visualization-bar-content');

    this.selection.add(div('hx-visualization-bar-title').add(this.titleElement));

    this.visualization = new VisualizationBar(
      this.selection.node(),
      mergeDefined({}, this.options, {
        bars: this.barsList,
      }),
    );

    this.selection.add(div('hx-visualization-bar-count').add(this.countElement));
    this.selection.add(this.contentElement);

    this.title(this.options.title);
    this.content(this.options.content);
    this.max(this.options.max);
    this.update();

    this.visualization.disabled(this.options.disabled);
  }

  /**
       * Get/Set of valid
       * @param {boolean} value
       */
  valid(value) {
    return this.visualization.valid(value);
  }

  /**
       * Get/Set progress
       */
  progress(value) {
    if (defined(value)) {
      this.options.progress = value;
      this.updateBar(VisualizationBarTypes.PROGRESS, value);
      this.updateBalance();
      this.update();
    }
    return this.options.progress;
  }

  /**
       * Get/Set buffer
       * @param {number} value
       */
  buffer(value) {
    if (defined(value)) {
      this.options.buffer = value;
      this.updateBar(VisualizationBarTypes.BUFFER, value);
      this.updateBalance();
      this.update();
    }
    return this.options.buffer;
  }

  /**
       * Get/Set of title property
       * @param {string} value
       */
  title(value) {
    if (defined(value)) {
      this.titleElement.text(this.options.title = value);
    }
    return this.options.title;
  }

  /**
        * Get/Set of content property
        * @param {string} value
        */
  content(value) {
    if (defined(value)) {
      this.contentElement.text(value);
      return value;
    }
    return this.options.content;
  }

  /**
       * Get total
       */
  total() {
    return this.options.buffer + this.options.progress;
  }

  /**
       * Get/Set bars
       * @param {Array<any>} value
       */
  bars(value) {
    if (defined(value)) {
      this.barsList = [...value];
      this.update();
    }
    return this.barsList;
  }

  /**
        * Get/Set max
        * @param {number} value
        */
  max(value) {
    if (defined(value)) {
      this.options.max = value;
      this.update();
    }
    return this.options.max ? this.options.max : this.total();
  }

  disable() {
    this.visualization.disable();
  }

  error() {
    this.visualization.error();
  }

  setLabel(type, content) {
    this.updateBar(type, Object.assign({}, this.barsList, {
      label: content,
    }));
  }

  updateBar(index, value) {
    this.barsList = this.barsList.slice();
    this.barsList[index] = Object.assign({}, this.barsList[index], { value });
  }

  updateBalance() {
    const balanceValue = this.max() - this.options.buffer - this.options.progress;
    const balanceBar = Object.assign({}, this.barsList[VisualizationBarTypes.BALANCE]);
    balanceBar.value = Math.max(balanceValue, 0);
    this.barsList = this.barsList.slice(0, 2);
    this.barsList.push(balanceBar);
  }

  update() {
    this.updateCount();
    this.visualization.bars(this.barsList);
  }

  updateCount() {
    const { withMax, max } = this.options;
    this.countElement.text(withMax ? `${this.total()} / ${max || '-'}` : this.total());
  }
}

export const progressVisualizationBar = (options) => {
  const selection = div();
  new ProgressVisualizationBar(selection.node(), options);
  return selection;
};
