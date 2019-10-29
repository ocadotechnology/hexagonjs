import { div, select } from 'utils/selection';
import logger from 'utils/logger';
import { mergeDefined } from 'utils/utils';

class Stepper {
  constructor(selector, titles, options) {
    this.selection = select(selector).classed('hx-stepper', true);

    const self = this;
    const view = this.selection.view('.hx-stepper-step')
      .enter(function stepperEnter() {
        const stepNode = div('hx-stepper-step')
          .add(div('hx-stepper-progress-row')
            .add(div('hx-stepper-progress-before'))
            .add(div('hx-stepper-number'))
            .add(div('hx-stepper-progress-after')))
          .add(div('hx-stepper-title'));
        return this.append(stepNode).node();
      })
      .update((step, node) => {
        const stepNode = hx.select(node);
        const numSteps = self.titles().length;
        const selectedStep = self.selectedStep();
        const showError = self.showError();
        const showTitles = self.showTitles();

        stepNode.select('.hx-stepper-number')
          .classed('hx-stepper-number-selected', step.number === selectedStep && !showError)
          .classed('hx-stepper-number-error', step.number === selectedStep && showError)
          .classed('hx-stepper-number-complete', step.number < selectedStep)
          .text((step.number < selectedStep) ? 'X' : step.number);

        stepNode.select('.hx-stepper-progress-before')
          .classed('hx-stepper-progress-incomplete', step.number > 1 && step.number > selectedStep)
          .classed('hx-stepper-progress-complete', step.number > 1 && step.number <= selectedStep);

        stepNode.select('.hx-stepper-progress-after')
          .classed('hx-stepper-progress-incomplete', step.number < numSteps && step.number >= selectedStep)
          .classed('hx-stepper-progress-complete', step.number < numSteps && step.number < selectedStep);

        stepNode.select('.hx-stepper-title')
          .classed('hx-stepper-title-hidden', !showTitles)
          .classed('hx-stepper-title-error', step.number === selectedStep && showTitles && showError)
          .text(step.title);
      });

    this._ = {
      titles: [],
      selectedStep: -1,
      showError: false,
      view,
    };

    this.options = mergeDefined({
      showTitles: true,
    }, options);

    this.titles(titles);
  }

  titles(titles) {
    if (arguments.length) {
      if (titles.length < 2) {
        throw new Error('Stepper: Expected at least two steps to display');
      }
      this._.titles = titles;
      this._.selectedStep = 1;
      this.render();
      return this;
    }
    return this._.titles;
  }

  selectedStep() {
    return this._.selectedStep;
  }

  showTitles(showTitles) {
    if (arguments.length) {
      if (showTitles !== this.showTitles()) {
        this.options.showTitles = showTitles;
        this.render();
      }
      return this;
    }
    return this.options.showTitles;
  }

  prevStep() {
    if (this.selectedStep() > 1) {
      this._.selectedStep -= 1;
      this._.showError = false;
      this.render();
    } else {
      logger.warn('Stepper: There is no previous step');
    }
    return this;
  }

  nextStep() {
    if (this.selectedStep() < this.titles().length) {
      this._.selectedStep += 1;
      this._.showError = false;
      this.render();
    } else {
      logger.warn('Stepper: There is no next step');
    }
    return this;
  }

  showError(showError) {
    if (arguments.length) {
      if (this._.showError !== showError) {
        this._.showError = showError;
        this.render();
      }
      return this;
    }
    return this._.showError;
  }

  render() {
    this._.view.apply(
      this.titles().map((title, index) => ({
        number: index + 1,
        title,
      })),
    );
  }
}

export {
  Stepper,
};
