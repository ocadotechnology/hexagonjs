import { select, div } from 'utils/selection';
import { animate } from 'utils/animate';
import { mergeDefined, defined } from 'utils/utils';
import { EventEmitter } from 'utils/event-emitter';
import {
  VisualizationBarTypes, VisualizationBarParts, VisualizationBarSizes,
  generateGroup, VisualizationBarSizesList, VisualizationBarTypesList,
} from './lib';

export class VisualizationBar {
  constructor(selector, options) {
    this.eventBus = new EventEmitter();

    this.percents = {
      [VisualizationBarTypes.PROGRESS]: 0,
      [VisualizationBarTypes.BUFFER]: 0,
      [VisualizationBarTypes.BALANCE]: 100,
    };

    this.pixels = {
      [VisualizationBarTypes.PROGRESS]: 0,
      [VisualizationBarTypes.BUFFER]: 0,
      [VisualizationBarTypes.BALANCE]: 100,
    };

    this.options = mergeDefined({
      value: 0,
      secondary: false,
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

    this.selection = select(selector)
      .classed('hx-visualization-bar', true)
      .classed('hx-visualization-bar-secondary', this.options.secondary);

    this.header = div('hx-visualization-bar-header');
    this.titleElement = div('hx-header-small');
    this.countElement = div('hx-header-small');

    this.body = div('hx-visualization-bar-body hx-animate');
    this.fillWrapper = div('hx-visualization-bar-fill-wrapper');
    this.labelWrapper = div('hx-visualization-bar-label-wrapper');
    this.mainElements = {
      [VisualizationBarTypes.PROGRESS]:
        generateGroup(VisualizationBarTypes[VisualizationBarTypes.PROGRESS]),
      [VisualizationBarTypes.BUFFER]:
        generateGroup(VisualizationBarTypes[VisualizationBarTypes.BUFFER]),
      [VisualizationBarTypes.BALANCE]:
        generateGroup(VisualizationBarTypes[VisualizationBarTypes.BALANCE]),
    };

    this.progressElementsMap = this.mainElements[VisualizationBarTypes.PROGRESS];
    this.bufferElementsMap = this.mainElements[VisualizationBarTypes.BUFFER];
    this.balanceElementsMap = this.mainElements[VisualizationBarTypes.BALANCE];

    this.contentElement = div('hx-visualization-bar-content');

    this.selection.add(div('hx-visualization-bar-title').add(this.titleElement));
    this.selection.add(div('hx-visualization-bar-count').add(this.countElement));
    this.selection.add(this.body);
    this.body.add(this.fillWrapper).add(this.labelWrapper);

    this.initFill();
    this.initLabels();

    this.selection.add(this.contentElement);
    this.selection.api('visualization-bar', this).api(this);

    this.title(this.options.title);
    this.progress(this.options.value);
    this.buffer(this.options.buffer);
    this.content(this.options.content);
    this.disabled(this.options.disabled);
    this.valid(this.options.valid);
    this.listen();

    this.updateLabel(VisualizationBarTypes.PROGRESS, this.options.progressLabel);
    this.updateLabel(VisualizationBarTypes.BUFFER, this.options.bufferLabel);
    this.updateLabel(VisualizationBarTypes.BALANCE, this.options.balanceLabel);

    this.update();

    this.size(this.options.size);
  }

  /**
    * Setter of title property
    * @param {string} value
    */
  title(value) {
    this.titleElement.text(this.options.title = value);
    return this.options.title;
  }

  /**
    * Setter of progress property
    * @param {number} value
    */
  progress(value) {
    if (defined(value)) {
      this.options.value = value;
      if (this.size() !== VisualizationBarSizes.SMALL) {
        this.progressElementsMap.get(VisualizationBarParts.PROGRESS).text(value || '');
      }
      this.checkBuffer(value);
      this.update();
    }
    return this.options.value;
  }

  /**
    * Setter of buffer property
    * @param {number} value
    */
  buffer(value) {
    this.options.buffer = value;
    if (!this.isSize(VisualizationBarSizes.SMALL)) {
      this.bufferElementsMap.get(VisualizationBarParts.PROGRESS).text(value || '');
    }
    this.update();
  }

  /**
    * Get/Set max
    * @param {number} value
    */
  max(value) {
    if (defined(value)) {
      this.options.max = value;
      this.progress(this.options.value);
      this.buffer(this.options.buffer);
    }
    return this.options.max ? this.options.max : this.options.value + this.options.buffer;
  }

  /**
    * Setter of content property
    * @param {string} value
    */
  content(value) {
    if (defined(value)) {
      this.contentElement.text(value);
      return value;
    }
    throw new Error('You should pass value to set property!');
  }

  /**
    * Setter of invalid property
    * @param {boolean} value
    */
  invalid(value) {
    if (defined(value)) {
      return this.valid(!value);
    }
    throw new Error('You should pass value to set property!');
  }

  /**
    * Get/Set of valid property
    * @param {boolean} value
    */
  valid(value) {
    if (defined(value)) {
      this.options.valid = Boolean(value);
      this.selection.classed('error', !this.options.valid);
    }
    return this.options.valid;
  }

  /**
    * Get/Set of disabled property
    * @param {boolean} value
    */
  disabled(value) {
    if (defined(value)) {
      this.options.disabled = Boolean(value);
      this.selection.classed('disabled', this.options.disabled);
    }
    return this.options.disabled;
  }


  /**
    * Get/Set of size property
    * @param {VisualizationBarSizes} value
    */
  size(value) {
    if (defined(value)) {
      if (!defined(VisualizationBarSizes[value])) {
        throw new Error('You should choose one of types from VisualizationBarSizes enum');
      }
      this.options.size = value;
      VisualizationBarSizesList.forEach(type => this.selection.classed(`hx-${VisualizationBarSizes[type]}`, false));
      this.selection.classed(`hx-${VisualizationBarSizes[value]}`, true);
    }

    return this.options.size;
  }

  isSize(size) {
    return this.size() === size;
  }

  listen() {
    this.eventBus.on('visibility', ({ type, value }) => {
      this.mainElements[type].get(VisualizationBarParts.WRAPPER).classed('hx-hidden', !value);
      this.body.classed(`hx-without-${VisualizationBarTypes[type]}`, !value);
    });

    this.eventBus.on('label-visibility', ({ type, value }) => {
      this.mainElements[type].get(VisualizationBarParts.LABEL).classed('hx-hidden', !value);
    });
  }

  disable() {
    this.disabled(true);
  }

  enable() {
    this.disabled(false);
    this.update();
  }

  error() {
    this.invalid(true);
  }

  updateLabel(type, value) {
    if (this.disabled() || this.isSize(VisualizationBarSizes.SMALL)) {
      return;
    }
    if (!defined(VisualizationBarTypes[type])) {
      throw new Error('You should choose one of types from VisualizationBarTypes enum');
    }

    this.mainElements[type].get(VisualizationBarParts.LABEL_TEXT).classed('hx-hidden', !defined(value));
    this.mainElements[type].get(VisualizationBarParts.LABEL_TEXT).text(this.percents[type] ? value : '');
  }

  initFill() {
    this.fillWrapper.add(
      this.progressElementsMap.get(VisualizationBarParts.WRAPPER).add(
        this.progressElementsMap.get(VisualizationBarParts.FILL)
          .add(this.progressElementsMap.get(VisualizationBarParts.PROGRESS)),
      ),
    ).add(
      this.bufferElementsMap.get(VisualizationBarParts.WRAPPER).add(
        this.bufferElementsMap.get(VisualizationBarParts.FILL)
          .add(this.bufferElementsMap.get(VisualizationBarParts.PROGRESS)),
      ),
    ).add(
      this.balanceElementsMap.get(VisualizationBarParts.WRAPPER).add(
        this.balanceElementsMap.get(VisualizationBarParts.FILL).classed('inversed-text-color', true)
          .add(this.balanceElementsMap.get(VisualizationBarParts.PROGRESS)),
      ),
    );
  }

  initLabels() {
    this.labelWrapper.add(
      this.progressElementsMap.get(VisualizationBarParts.LABEL)
        .add(this.progressElementsMap.get(VisualizationBarParts.LABEL_TEXT))
        .add(this.progressElementsMap.get(VisualizationBarParts.LABEL_PERCENT)),
    ).add(
      this.bufferElementsMap.get(VisualizationBarParts.LABEL)
        .add(this.bufferElementsMap.get(VisualizationBarParts.LABEL_TEXT))
        .add(this.bufferElementsMap.get(VisualizationBarParts.LABEL_PERCENT)),
    ).add(
      this.balanceElementsMap.get(VisualizationBarParts.LABEL)
        .add(this.balanceElementsMap.get(VisualizationBarParts.LABEL_TEXT))
        .add(this.balanceElementsMap.get(VisualizationBarParts.LABEL_PERCENT)),
    );

    this.checkLabels();
  }

  checkLabels() {
    const showLabels = !this.options.progressLabel
      && !this.options.bufferLabel
      && !this.options.balanceLabel
      && !this.options.withPercent;
    this.selection.classed('hx-without-label', showLabels);
  }

  isLabelsExist() {
    return this.options.progressLabel
      || this.options.bufferLabel
      || this.options.balanceLabel
      || this.options.withPercent;
  }

  checkBuffer() {
    const { buffer, value, max = this.options.value + this.options.buffer } = this.options;
    const sum = buffer + value;
    if (max && (sum > max)) {
      this.buffer(max - value);
    }
  }

  update() {
    if (this.disabled()) {
      return;
    }
    const { value, buffer } = this.options;
    const currentMax = this.max();
    this.updatePercents(currentMax);
    this.updatePixels();

    this.mainElements[VisualizationBarTypes.BALANCE].get(VisualizationBarParts.PROGRESS);

    if (!this.isSize(VisualizationBarSizes.SMALL)) {
      this.mainElements[VisualizationBarTypes.BALANCE].get(VisualizationBarParts.PROGRESS)
        .text(currentMax
          ? currentMax - value - buffer
          : Math.max(value, buffer) - Math.min(value, buffer));
    }

    this.updateFill(VisualizationBarTypesList);
    this.updateLabelPercent(VisualizationBarTypesList);
    this.updateCount();
  }

  updatePercents(currentMax) {
    const { max, value, buffer } = this.options;
    this.percents[VisualizationBarTypes.PROGRESS] = Math.round((value * 100) / currentMax);
    this.percents[VisualizationBarTypes.BUFFER] = Math.round((buffer * 100) / currentMax);
    this.percents[VisualizationBarTypes.BALANCE] = max ? Math.round(
      100
      - this.percents[VisualizationBarTypes.BUFFER]
      - this.percents[VisualizationBarTypes.PROGRESS],
    )
      : 0;
  }

  updatePixels() {
    const width = this.body.width();
    this.pixels[VisualizationBarTypes.PROGRESS] = width * this.percents[VisualizationBarTypes.PROGRESS] / 100;
    this.pixels[VisualizationBarTypes.BUFFER] = width * this.percents[VisualizationBarTypes.BUFFER] / 100;
    this.pixels[VisualizationBarTypes.BALANCE] = width * this.percents[VisualizationBarTypes.BALANCE] / 100;
  }

  updateLabelPercent(labelTypes) {
    if (this.disabled() || this.size() === VisualizationBarSizes.SMALL) {
      return;
    }
    labelTypes.forEach((type) => {
      if (!defined(VisualizationBarTypes[type])) {
        throw new Error('You should choose one of types from VisualizationBarTypes enum');
      }

      if (this.options.withPercent) {
        this.mainElements[type].get(VisualizationBarParts.LABEL_PERCENT)
          .text(this.percents[type] ? `(${this.percents[type]}%)` : '');
      }
    });
  }

  updateFill(labelTypes, ms) {
    if (this.disabled()) {
      return;
    }
    labelTypes.forEach((type) => {
      if (!defined(VisualizationBarTypes[type])) {
        throw new Error('You should choose one of types from VisualizationBarTypes enum');
      }
      const element = this.mainElements[type];
      const pixels = this.pixels[type];

      const visibility = (v) => this.eventBus.emit('visibility', {
        type,
        value: v || pixels !== 0,
      });

      const labelVisibility = () => this.eventBus.emit('label-visibility', {
        type,
        value: pixels !== 0,
      });

      visibility(true);
      animate(element.get(VisualizationBarParts.WRAPPER).node())
        .style('width', `${pixels}px`, 250)
        .on('end', () => visibility());

      labelVisibility()
      animate(element.get(VisualizationBarParts.LABEL).node())
        .style('width', `${pixels}px`, 250);
    });
  }

  updateCount() {
    const { withMax, value, max } = this.options;
    this.countElement.text(withMax ? `${value}/${max || '-'}` : value);
  }
}

export const visualizationBar = (options) => {
  const selection = div();
  new VisualizationBar(selection.node(), options);
  return selection;
};


export { VisualizationBarTypes, VisualizationBarParts, VisualizationBarSizes };
