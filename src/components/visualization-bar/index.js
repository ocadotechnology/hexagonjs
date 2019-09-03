import { select, div, span } from 'utils/selection';
import { mergeDefined, defined } from 'utils/utils';

const wrapper = 'wrapper';
const fill = 'fill';
const label = 'label';
const progress = 'progress';
const labelText = 'label-text';
const labelPc = 'label-percents';

const elementsGroup = title => new Map([
  [wrapper, div(`hx-visualization-bar-${title} hx-visualization-bar-p-wrapper`)],
  [fill, div(`hx-visualization-bar-fill hx-visualization-bar-${title}-fill`)],
  [progress, span(`hx-visualization-bar-${title}-info hx-visualization-bar-${title}-progress-info`)],
  [label, div(`hx-visualization-bar-label hx-visualization-bar-${title}-label`)],
  [labelPc, span('hx-visualization-bar-label-percent')],
  [labelText, span('hx-visualization-bar-label-text')],

]);

/**
 *
 */
export class VisualizationBar {
  constructor(selector, options) {
    this.progressPercent = 0;
    this.bufferPercent = 0;
    this.balance = 100;

    this.options = mergeDefined({
      value: 0,
      max: undefined,
      buffer: 0,
      valid: true,
      content: '',
      disabled: false,
      withPercent: false,
    }, options);

    this.selection = select(selector).classed('hx-visualization-bar', true);
    this.header = div('hx-visualization-bar-header');
    this.titleElement = div('hx-header-small');
    this.countElement = div('hx-header-small');

    this.body = div('hx-visualization-bar-body hx-animate');
    this.fillWrapper = div('hx-visualization-bar-fill-wrapper');
    this.labelWrapper = div('hx-visualization-bar-label-wrapper');
    this.progressElementsMap = elementsGroup('progress');
    this.bufferElementsMap = elementsGroup('buffer');
    this.balanceElementsMap = elementsGroup('balance');

    this.contentElement = div('hx-visualization-bar-content');

    this.selection.add(this.header);
    this.header.add(div('hx-visualization-bar-title').add(this.titleElement));
    this.header.add(div('hx-visualization-bar-count').add(this.countElement));
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
  }

  /**
     * Setter of title property
     * @param {string} value
     */
  title(value) {
    this.titleElement.text(value);
  }

  /**
     * Setter of progress property
     * @param {number} value
     */
  progress(value) {
    this.options.value = value;
    this.progressElementsMap.get(progress).text(value || '');
    this.checkBuffer(value);
    this.update();
  }

  /**
     * Setter of buffer property
     * @param {number} value
     */
  buffer(value) {
    this.options.buffer = value;
    this.bufferElementsMap.get(progress).text(value || '');
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
    } else {
      throw new Error('You should pass value to set property!');
    }
  }

  /**
     * Setter of invalid property
     * @param {boolean} value
     */
  invalid(value) {
    if (defined(value)) {
      this.valid(!value);
    } else {
      throw new Error('You should pass value to set property!');
    }
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

  disable() {
    this.disabled(true);
  }

  enable() {
    this.disabled(false);
  }

  error() {
    this.invalid(true);
  }

  initFill() {
    this.fillWrapper.add(
      this.progressElementsMap.get(wrapper).add(
        this.progressElementsMap.get(fill).add(this.progressElementsMap.get(progress)),
      ),
    );
    this.fillWrapper.add(
      this.bufferElementsMap.get(wrapper).add(
        this.bufferElementsMap.get(fill).add(this.bufferElementsMap.get(progress)),
      ),
    );
    this.fillWrapper.add(
      this.balanceElementsMap.get(wrapper).add(
        this.balanceElementsMap.get(fill).add(this.balanceElementsMap.get(progress)),
      ),
    );
  }

  initLabels() {
    this.labelWrapper.add(
      this.progressElementsMap.get(label)
        .add(this.progressElementsMap.get(labelPc).add(this.progressElementsMap.get(labelText))),
    ).add(
      this.bufferElementsMap.get(label)
        .add(this.bufferElementsMap.get(labelPc).add(this.bufferElementsMap.get(labelText))),
    ).add(
      this.balanceElementsMap.get(label)
        .add(this.balanceElementsMap.get(labelPc).add(this.balanceElementsMap.get(labelText))),
    );
  }

  checkBuffer() {
    const { buffer, value, max = this.options.value + this.options.buffer } = this.options;
    const sum = buffer + value;
    if (max && (sum > max)) {
      this.buffer(max - value);
    }
  }

  update() {
    const { value, buffer, max } = this.options;
    this.progressPercent = Math.round((value * 100) / this.max());
    this.bufferPercent = Math.round((buffer * 100) / this.max());
    this.balance = max ? Math.round(100 - this.bufferPercent - this.progressPercent) : 0;
    this.updateProgressFill();
    this.updateBufferFill();
    this.updateBalanceFill();
    this.updateProgressLabel();
    this.updateBufferLabel();
    this.updateBalanceLabel();
    this.updateCount();
  }

  updateProgressFill() {
    this.progressElementsMap.get(wrapper).style('width', `${this.progressPercent}%`);
    this.progressElementsMap.get(label).style('width', `${this.progressPercent}%`);
    this.body.classed('hx-without-progress', this.progressPercent === 0);
  }

  updateBufferFill() {
    this.bufferElementsMap.get(wrapper).style('width', `${this.bufferPercent}%`);
    this.bufferElementsMap.get(label).style('width', `${this.bufferPercent}%`);
    this.body.classed('hx-without-buffer', this.bufferPercent === 0);
  }

  updateBalanceFill() {
    const { value, buffer, max } = this.options;
    this.balanceElementsMap.get(wrapper).style('width', `${this.balance ? this.balance : 0}%`);
    this.balanceElementsMap.get(progress).text((this.balance ? max - value - buffer : '') || '');
    this.balanceElementsMap.get(label).style('width', `${this.balance}%`);
    this.balanceElementsMap.get(fill).classed('inversed-text-color', true);
    this.body.classed('hx-without-balance', this.balance === 0);
  }

  updateProgressLabel() {
    if (this.options.withPercent) {
      this.progressElementsMap.get(labelPc).text(this.progressPercent ? `(${this.progressPercent}%)` : '');
    }
  }

  updateBufferLabel() {
    if (this.options.withPercent) {
      this.bufferElementsMap.get(labelPc).text(this.bufferPercent ? `(${this.bufferPercent}%)` : '');
    }
  }

  updateBalanceLabel() {
    if (this.options.withPercent) {
      this.balanceElementsMap.get(labelPc).text(this.balance ? `(${this.balance}%)` : '');
    }
  }

  updateCount() {
    this.countElement.text(`${this.options.value}/${this.options.max || '-'}`);
  }
}


export const visualizationBar = (options) => {
  const selection = div();
  new VisualizationBar(selection.node(), options);
  return selection;
};
