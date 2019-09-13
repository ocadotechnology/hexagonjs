import { select, div } from 'utils/selection';
import { animate } from 'utils/animate';
import { mergeDefined, defined } from 'utils/utils';
import { EventEmitter } from 'utils/event-emitter';
import {
  VisualizationBarParts, VisualizationBarSizes,
  generateGroup,
} from '../lib';


const moreThan = target => value => (value < target ? target : value);

export class VisualizationBar extends EventEmitter {
  constructor(selector, options) {
    super();
    this.selection = select(selector);
    this.options = mergeDefined({
      valid: true,
      content: '',
      disabled: false,
      withPercent: false,
      withMax: true,
      bars: [],
      size: VisualizationBarSizes.STANDARD,
    }, options);

    this.barsList = [...this.options.bars];
    this.barsPercent = Array(this.barsList.length).fill(0);
    this.oldBardsPercent = [...this.barsPercent];

    this.body = div('hx-visualization-bar-body hx-animate');
    this.fillWrapper = div('hx-visualization-bar-fill-wrapper');

    this.mainElements = this.barsList.map(
      (barObject, index) => generateGroup(index, barObject.color),
    );

    this.selection.add(this.body);

    this.body.add(this.fillWrapper);

    this.initFill();
    this.initLabels();

    this.selection.add(this.contentElement);
    this.selection.api('visualization-bar', this).api(this);

    this.disabled(this.options.disabled);
    this.valid(this.options.valid);
    this.listen();
    this.update();

    this.size(this.options.size);
  }

  /**
    * Get/Set bars
    */
  bars(value) {
    if (defined(value)) {
      if (value.length !== this.barsList.length) {
        throw new Error('Amount of bars should be constant!');
      }
      this.barsList = value.map(bar => Object.assign({}, bar, {
        value: moreThan(0)(bar.value),
        visible: true,
      }));
      this.update();
    }

    return this.barsList;
  }


  /**
    * Get total
    */
  total() {
    return this.barsList.reduce((acc, next) => acc + next.value, 0);
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
      this.emit('valid', value);
    }
    return this.options.valid;
  }

  /**
    * Get/Set of disabled property
    * @param {boolean} value
    */
  disabled(value) {
    if (defined(value)) {
      this.emit('disabled', value);
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
      this.selection.classed(`hx-${VisualizationBarSizes[value]}`, true);
    }

    return this.options.size;
  }

  isSize(size) {
    return this.size() === size;
  }

  listen() {
    this.on('valid', (value) => {
      this.options.valid = Boolean(value);
      this.selection.classed('error', !this.options.valid);
    });

    this.on('disabled', (value) => {
      this.options.disabled = Boolean(value);
      this.selection.classed('disabled', this.options.disabled);
    });

    this.on('visibility', ({ index, value }) => {
      const wrapper = this.mainElements[index].get(VisualizationBarParts.WRAPPER);
      wrapper.classed('hx-hidden', !value);
      this.barsList[index].visible = value;
      this.body.classed(`hx-without-${index}}`, !value);
      this.updateFirstLast();
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

  initFill() {
    this.mainElements.forEach((elGroup) => {
      this.fillWrapper.add(
        elGroup.get(VisualizationBarParts.WRAPPER).add(
          elGroup.get(VisualizationBarParts.FILL)
            .add(elGroup.get(VisualizationBarParts.PROGRESS)),
        ),
      );
    });
  }

  initLabels() {
    this.mainElements.forEach((elGroup) => {
      elGroup.get(VisualizationBarParts.WRAPPER)
        .add(elGroup.get(VisualizationBarParts.LABEL)
          .add(div('hx-visualization-bar-label-text-wrapper').add(elGroup.get(VisualizationBarParts.LABEL_TEXT)))
          .add(elGroup.get(VisualizationBarParts.LABEL_PERCENT)));
    });
    this.checkLabels();
  }

  checkLabels() {
    const showLabels = this.barsList.every(b => !b.label)
            && !this.options.withPercent;
    this.selection.classed('hx-without-label', showLabels);
  }

  update() {
    if (this.disabled()) {
      return;
    }
    this.updatePercents();
    this.updateLabelPercent();
    this.updateFill();
    this.updateLabels();
  }

  updatePercents() {
    const currentMax = this.total();
    this.oldPercents = [...this.percents];
    this.percents = this.barsList.map(({ value }) => Math.round((value * 100) / currentMax));
  }

  updateLabelPercent() {
    if (this.disabled() || this.size() === VisualizationBarSizes.SMALL) {
      this.clear(VisualizationBarParts.LABEL_PERCENT);
      return;
    }

    this.barsList.forEach((bar, index) => {
      if (this.options.withPercent) {
        const percents = this.percents[index];
        this.mainElements[index].get(VisualizationBarParts.LABEL_PERCENT)
          .text(percents ? `(${percents}%)` : '');
      }
    });
  }

  updateLabels() {
    if (this.isSize(VisualizationBarSizes.SMALL)) {
      this.clear(VisualizationBarParts.LABEL_TEXT);
      return;
    }
    this.barsList.forEach((bar, index) => {
      this.mainElements[index].get(VisualizationBarParts.LABEL_TEXT)
        .text(bar.label);
    });
  }

  updateFill() {
    if (this.disabled()) {
      return;
    }

    this.barsList.forEach((bar, index) => {
      const element = this.mainElements[index];
      const percent = this.percents[index];
      const oldPercent = this.oldPercents[index];

      const visible = fncPc => this.emit('visibility', {
        index,
        value: fncPc !== 0,
      });

      if (this.isSize(VisualizationBarSizes.SMALL)) {
        this.clear(VisualizationBarParts.FILL);
      } else {
        element.get(VisualizationBarParts.FILL).text(bar.value);
      }

      visible(oldPercent);
      requestAnimationFrame(() => {
        animate(element.get(VisualizationBarParts.WRAPPER).node())
          .style('width', `${oldPercent}%`, `${percent}% `, 250)
          .on('end', () => {
            visible(percent);
          });
      });
    });
  }

  clear(part) {
    this.mainElements.forEach(el => el.get(part).text(''));
  }

  updateFirstLast() {
    this.mainElements.forEach(el => el.get(VisualizationBarParts.WRAPPER)
      .classed('hx-last-child', false)
      .classed('hx-first-child', false));

    const index = this.barsList.findIndex(el => el.visible);
    const lastIndex = this.barsList.length
            - 1
            - this.barsList.reverse().findIndex(el => el.visible);

    if (index > -1) {
      this.mainElements[index].get(VisualizationBarParts.WRAPPER).classed('hx-first-child', true);
    }

    if (lastIndex > -1) {
      this.mainElements[lastIndex].get(VisualizationBarParts.WRAPPER).classed('hx-last-child', true);
    }
  }
}

export const visualizationBar = (options) => {
  const selection = div();
  new VisualizationBar(selection.node(), options);
  return selection;
};
